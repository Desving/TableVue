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
    </table>
</template>

<script>
    export default {
        name: 'VueTable',
        props: ['fields', 'rows', 'meta'],
    }
</script>

<style>

</style>
