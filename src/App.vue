<template>
    <div class="container">
        <create-table></create-table>
        <div class="mb-5" v-for="(dataTable,keyTable) in arDataTables">
            <vue-table v-bind="dataTable" v-bind:key-table="keyTable"></vue-table>
        </div>
        <preloader v-if="isLoading"></preloader>
    </div>
</template>

<script>
    import CreateTable from './components/CreateTable.vue'
    import VueTable from './components/VueTable.vue'
    import Preloader from './components/preloader.vue'


    export default {
        name: 'app',
        components: {
            CreateTable,
            VueTable,
            Preloader
        },
        computed: {
            arDataTables() {
                return this.$store.getters.getArDataTables;
            },
            isLoading() {
                return this.$store.getters.getLoading;
            }
        }
    }
</script>