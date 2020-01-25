<template>
    <ul class="pagination d-flex justify-content-center"
        v-if="countPages > 1">
        <li class="page-item" v-for="pageNumber in countPages"
            :key="pageNumber"
            :class="currentPage==pageNumber?'active':''">
            <button class="page-link" @click="changeCurrentPage(pageNumber)">
                {{ pageNumber }}
            </button>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "PaginationTable",
        props: {
            'countPages': {
                'type': Number,
            },
            'currentPage': {
                'type': Number,
            },
        },
        methods: {
            changeCurrentPage(pageNumber) {
                this.$emit('changeCurrentPage', pageNumber)
            },
        }
    }
</script>

<style scoped>

</style>