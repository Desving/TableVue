<template>
    <div class="container">
        <create-table></create-table>
    </div>
</template>

<script>
    import CreateTable from './components/CreateTable.vue'

    export default {
        name: 'app',
        components: {
            CreateTable
        }
    }
</script>