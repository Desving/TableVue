<template>
    <table class="table mt-3">
        <thead>
        <tr>
            <th>#</th>
            <th v-for="(cellHeadName, keyHeadCell) in fields">{{ cellHeadName }}</th>
            <th>actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, keyRow) in getViewChunkRows">
            <th scope="row">{{ keyRow + 1 }}</th>
            <td v-for="field in fields" v-if="field in row">
                {{row[field]}}
            </td>
            <td v-else> No data </td>
            <td>
                <button type="button" class="close">
                    <span aria-hidden="true" @click="deleteRows(keyRow)">&times;</span>
                </button>
            </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td>
                <button class="btn btn-light" @click="cleanTable">Очистка таблицы</button>
            </td>
            <td>
                <button class="btn btn-light" @click="deleteTable">Удаление таблицы</button>
            </td>
            <td>
                <button class="btn btn-light" @click="copyTable">Копирование данных</button>
            </td>
            <td colspan="4">
                <ul class="pagination d-flex justify-content-center">
                    <li class="page-item" v-for="pageNumber in getCountPages" v-if="getCountPages > 1">
                        <button class="page-link" @click="changeCurrentPage(pageNumber)">{{ pageNumber }}</button>
                    </li>
                </ul>
            </td>
        </tr>
        </tfoot>
    </table>
</template>

<script>
    export default {
        name: 'VueTable',
        props: {
            'fields': {
                'type': Array,
                'default': [],
                'required': true,
            },
            'rows': {
                'type': Array,
                'default': [],
                'required': true,
            },
            'meta': {
                'type': Object,
                'default': 0,
                'required': true
            },
            'keyTable': {
                'type': Number,
                'default': 0,
                'required': true,
                'validator': function (value) {
                    return value >= 0
                }
            }
        },
        data: function () {
            return {
                countPerPage: 10,
                currentPage: 1,
            }
        },
        methods: {
            cleanTable() {
                this.$store.dispatch('cleanTableByKey', this.keyTable);
            },
            deleteTable() {
                this.$store.dispatch('deleteTableByKey', this.keyTable);
            },
            deleteRows(keyRows) {
                this.rows.splice(keyRows, 1)
            },
            changeCurrentPage(pageNumber) {
                this.currentPage = pageNumber;
            },
            async copyTable() {
                let objToCopy = {
                    'fields': this.fields,
                    'rows': this.rows,
                    'meta': this.meta,
                };
                await navigator.clipboard.writeText(JSON.stringify(objToCopy))
                .then(() => {
                    console.log('gg');
                })
                .catch(err => {
                    console.log('Something went wrong', err);
                });
            }
        },
        computed: {
            getCountPages() {
                if (this.rows) {
                    return Math.ceil(this.rows.length / this.countPerPage)
                }
            },
            getViewChunkRows() {
                let start = this.countPerPage * (this.currentPage - 1);
                let end = this.countPerPage * this.currentPage;
                return this.rows.filter((element, index) => {
                    return index >= start && index < end
                })
            }
        }
    }
</script>

<style>

</style>
