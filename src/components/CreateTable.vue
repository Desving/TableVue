<template>
    <div class="col-3 mt-5">
        <button class="btn btn-primary" @click="setModalCreateTable">Создание таблицы</button>
        <div class="modal fade" v-bind:class="{ show: isModalCreateTable }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Введите данные таблицы</h4>
                        <button type="button" class="close" @click="setModalCreateTable">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="fields">Fields</label>
                            <input type="text" v-model="fields" class="form-control" id="fields" required/>
                        </div>
                        <div class="form-group">
                            <label for="rowsCount">Rows</label>
                            <input type="number" v-model="rowsCount" id="rowsCount" class="form-control"
                                   placeholder="Enter count rows" required>
                        </div>
                        <div class="form-group">
                            <label>Meta</label>
                            <div class="form-group">
                                <input type="text" v-model="metaHeader" class="form-control"
                                       placeholder="Enter header cell class">
                            </div>
                            <div class="form-group">
                                <input type="text" v-model="metaEven" class="form-control"
                                       placeholder="Enter even rows class">
                            </div>
                            <div class="form-group">
                                <input type="text" v-model="metaOdd" class="form-control"
                                       placeholder="Enter odd rows class">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="setModalCreateTable">Отмена</button>
                        <button type="submit" class="btn btn-primary" @click="addTable">Добавить</button>
                    </div>
                </div><!-- /.модальное окно-Содержание -->
            </div><!-- /.модальное окно-диалог -->
        </div><!-- /.модальное окно -->
    </div>
</template>

<script>
    export default {
        name: 'CreateTable',
        data: function () {
            return {
                fields: 'id, firstName, lastName, email, adress, phone',
                rowsCount: '10',
                metaOdd: '',
                metaEven: '',
                metaHeader: '',
            }
        },
        computed: {
            isModalCreateTable() {
                return this.$store.getters.getOpenModalCreateTable;
            },
        },
        methods: {
            setModalCreateTable() {
                this.$store.dispatch('setModalCreateTable');
            },
            addTable() {
                this.$store.dispatch('addDataTables', {
                    'fields': this.fields.split(', '),
                    'rowsCount': Number.parseInt(this.rowsCount, 10),
                    'meta': {
                        'odd': this.metaOdd,
                        'even': this.metaEven,
                        'header': this.metaHeader,
                    }
                });
            },
        }
    }
</script>

<style>
    .show {
        display: block !important;
        background: rgba(0, 0, 0, 0.5);;
    }

    .close:focus,
    .close *:focus {
        outline: none;
    }
</style>
