<template>
    <div class="container">
        <create-table></create-table>
        <div v-for="dataTable in arDataTables">
            <vue-table v-bind="dataTable"></vue-table>
        </div>
    </div>
</template>

<script>
    import CreateTable from './components/CreateTable.vue'
    import VueTable from './components/VueTable.vue'


    export default {
        name: 'app',
        components: {
            CreateTable,
            VueTable
        },
        computed: {
            arDataTables() {
                return this.$store.getters.getArDataTables;
            }
        }
    }
</script>