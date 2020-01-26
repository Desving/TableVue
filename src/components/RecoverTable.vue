<template>
    <div class="col-6 mt-5">
        <button class="btn btn-primary" @click="setModalRecoverTable">Восстановление таблицы из json</button>
        <div class="modal fade" v-bind:class="{ show: isModalRecoverTable }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Введите данные таблицы</h4>
                        <button type="button" class="close" @click="setModalRecoverTable">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="fields">Введите json таблицы</label>
                            <textarea type="text" v-model="jsonTable" class="form-control" id="fields" required/>
                        </div>
                        <div class="alert alert-danger"
                             role="alert"
                             v-if="arError.length > 0"
                        >
                            <div v-for="(error, key) in arError"
                                 :key="key"
                            >
                                {{error}}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="setModalRecoverTable">Отмена</button>
                        <button type="submit" class="btn btn-primary" @click="recoverTable">Добавить</button>
                    </div>
                </div><!-- /.модальное окно-Содержание -->
            </div><!-- /.модальное окно-диалог -->
        </div><!-- /.модальное окно -->
    </div>
</template>

<script>
    export default {
        name: "RecoverTable",
        data: function () {
            return {
                jsonTable: '',
                arError: []
            }
        },
        computed: {
            isModalRecoverTable() {
                return this.$store.getters.getOpenModalRecoverTable;
            },
        },
        methods: {
            setModalRecoverTable() {
                this.$store.dispatch('setModalRecoverTable');
            },
            recoverTable() {
                this.arError = [];
                try {
                    let objTable = JSON.parse(this.jsonTable);
                    if (typeof objTable === 'object') {
                        if (objTable.fields && objTable.rows) {
                            this.$store.dispatch('recoveryDataTable', objTable)
                        }
                    }
                    throw new Error("Неверно введен json");
                } catch (e) {
                    this.arError.push('Ошибка json');
                }
            }
        }
    }
</script>

<style scoped>

</style>