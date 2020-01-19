<template>
    <table class="table mt-3">
        <thead>
        <tr v-bind:class="addExtraClassHeader">
            <th>#</th>
            <th v-bind:key="keyHeadCell" v-for="(cellHeadName, keyHeadCell) in fields">{{ cellHeadName }}</th>
            <th>actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-bind:key="keyRow" v-for="(row, keyRow) in getViewChunkRows" v-bind:class="addExtraClassRow(keyRow)">
            <th scope="row">{{ keyRow + 1 }}</th>
            <td v-for="fieldName in fields"
                v-if="fieldName in row"
                @dblclick="changeCell(keyRow, fieldName, row[fieldName])"
            >
                <input class="form-control" type="text" v-if="isChangeCell(keyRow, fieldName)"
                       v-model="valueCell"
                       @keyup.esc="resetChangeCell"
                       @blur="saveValueCell"
                       @keyup.enter="saveValueCell"
                />
                <div v-else>{{row[fieldName]}}</div>
            </td>
            <td v-else> No data</td>
            <td class="d-flex justify-content-center">
                <button type="button" class="btn">
                    <span aria-hidden="true" @click="addRowByKey(keyRow + 1)">&#8744;</span>
                </button>
                <button type="button" class="btn">
                    <span aria-hidden="true" @click="addRowByKey(keyRow)">&#8743;</span>
                </button>
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
                    <li class="page-item" v-for="pageNumber in getCountPages"
                        v-if="getCountPages > 1"
                        v-bind:class="currentPage==pageNumber?'active':''">
                        <button class="page-link" @click="changeCurrentPage(pageNumber)">
                            {{ pageNumber }}
                        </button>
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
                keyChangeRow: 0,
                nameChangeField: '',
                valueCell: '',
                defaultValueForNewRows: 'default'
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
            changeCell(keyRow, fieldName, valueCell) {
                this.keyChangeRow = keyRow;
                this.nameChangeField = fieldName;
                this.valueCell = valueCell;
            },
            isChangeCell(keyRow, fieldName) {
                return fieldName === this.nameChangeField && keyRow === this.keyChangeRow;
            },
            saveValueCell() {
                this.rows[this.keyChangeRow][this.nameChangeField] = this.valueCell;
                this.resetChangeCell()
            },
            resetChangeCell() {
                this.keyChangeRow = 0;
                this.nameChangeField = '';
                this.valueCell = '';
            },
            addRowByKey(key) {
                let keyRow = key * this.currentPage;
                let newRows = {};
                this.fields.forEach((element) => {
                    newRows[element] = this.defaultValueForNewRows;
                });
                this.rows.splice(keyRow, 0, newRows);
            },
            addExtraClassRow(keyRow) {
                if (keyRow % 2 === 0 && this.meta.even) {
                    return this.meta.even
                } else if (keyRow % 2 !== 0 && this.meta.odd) {
                    return this.meta.odd
                }
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
            },
            addExtraClassHeader() {
                return this.meta.header ? this.meta.header : '';
            }
        }
    }
</script>

<style>

</style>
