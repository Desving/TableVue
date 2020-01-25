<template>
    <div class="modal fade show">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Уууупс произошла ошибка</h4>
                    <button type="button" class="close" @click="deleteError">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {{this.errorText}}
                </div>
            </div><!-- /.модальное окно-Содержание -->
        </div><!-- /.модальное окно-диалог -->
    </div><!-- /.модальное окно -->
</template>

<script>
    export default {
        name: "ErrorModal",
        props: {
            'errorText': {
                'type': String,
            },
        },
        methods: {
            deleteError() {
                return this.$store.dispatch('deleteError');
            }
        }
    }
</script>

<style scoped>

</style>