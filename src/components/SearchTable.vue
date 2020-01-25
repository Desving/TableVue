<template>
    <div class="active-cyan-4 mb-4">
        <input class="form-control" type="text" placeholder="Search" aria-label="Search"
               v-model="model"
        >
    </div>
</template>

<script>
    export default {
        name: "SearchTable",
        model: {
            prop: 'filterValue',
            event: 'change'
        },
        props: {
            filterValue: String
        },
        computed: {
            model: {
                get() {
                    return this.filterValue;
                },
                set(val) {
                    this.$emit('change', val);
                },
            },
        }
    }
</script>

<style scoped>

</style>