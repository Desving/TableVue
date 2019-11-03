<template>
    <table class="table mt-3">
        <thead>
        <tr>
            <th>#</th>
            <th v-for="(cellHeadName, keyHeadCell) in fields">{{ cellHeadName }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, key) in rows">
            <th scope="row">{{ key + 1 }}</th>
            <td v-for="field in fields" v-if="field in row">
                {{row[field]}}
            </td>
            <td v-else> No data </td>
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
            <td colspan="5">

            </td>
        </tr>
        </tfoot>
    </table>
</template>

<script>
    export default {
        name: 'VueTable',
        props: ['fields', 'rows', 'meta', 'keyTable'],
        methods: {
            cleanTable() {
                console.log(this.keyTable,'cleanTable');
                this.$store.dispatch('cleanTableByKey', this.keyTable);
            },
            deleteTable() {
                console.log(this.keyTable, 'deleteTable');
                this.$store.dispatch('deleteTableByKey', this.keyTable);
            }
        }
    }
</script>

<style>

</style>
