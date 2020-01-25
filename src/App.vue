<template>
    <div class="container">
        <create-table/>
        <div class="mb-5" v-for="(dataTable,keyTable) in arDataTables"
        :key = keyTable>
            <vue-table v-bind="dataTable" v-bind:key-table="keyTable"/>
        </div>
        <preloader v-if="isLoading"/>
        <error-modal
                v-if="errorExist"
                :error-text="getError"
        />

    </div>
</template>

<script>
    import CreateTable from './components/CreateTable.vue'
    import VueTable from './components/VueTable.vue'
    import Preloader from './components/preloader.vue'
    import ErrorModal from './components/ErrorModal.vue'


    export default {
        name: 'app',
        components: {
            CreateTable,
            VueTable,
            Preloader,
            ErrorModal
        },
        computed: {
            arDataTables() {
                return this.$store.getters.getArDataTables;
            },
            isLoading() {
                return this.$store.getters.getLoading;
            },
            getError() {
                return this.$store.getters.getError;
            },
            errorExist() {
                return this.getError.length > 0;
            },
        }
    }
</script>