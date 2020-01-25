<template>
    <table class="table mt-3">
        <header-table
             :fields-name="fields"
        />
        <tbody>
            <row-table :key="keyRow" v-for="(row, keyRow) in getViewChunkRows"
                       :fields-value="row"
                       :fields-name="fields"
                       :key-row="keyRow"
                       :even-class-name="meta.even"
                       :odd-class-name="meta.odd"
                       @deleteRow='onDeleteRow'
                       @addRowByKey='onAddRowByKey'
            />
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
                <pagination-table
                        :countPages="getCountPages"
                        :currentPage="currentPage"
                        @changeCurrentPage="onChangeCurrentPage"
                />
            </td>
        </tr>
        </tfoot>
    </table>
</template>

<script>
    import RowTable from "./RowTable";
    import HeaderTable from "./HeaderTable";
    import PaginationTable from "./PaginationTable";

    export default {
        name: 'VueTable',
        components: {
            RowTable,
            HeaderTable,
            PaginationTable
        },
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
                'default': {},
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
                textForCopySuccesed: 'Таблица успешно добавленна в буфер обмена'
            }
        },
        methods: {
            onDeleteRow(keyRow) {
                this.rows.splice(keyRow, 1)
            },
            onAddRowByKey(data) {
                let keyRow = data.keyRow * this.currentPage;
                let newRows = {};
                this.fields.forEach((element) => {
                    newRows[element] = data.defaultValueForNewRows;
                });
                this.rows.splice(keyRow, 0, newRows);
            },
            cleanTable() {
                this.$store.dispatch('cleanTableByKey', this.keyTable);
            },
            deleteTable() {
                this.$store.dispatch('deleteTableByKey', this.keyTable);
            },
            onChangeCurrentPage(pageNumber) {
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
                        alert(this.textForCopySuccesed);
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
                return 0;
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
