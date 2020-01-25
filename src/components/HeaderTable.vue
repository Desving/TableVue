<template>
    <thead>
        <tr :class="addExtraClassHeader">
            <th>#</th>
            <th :key="keyHeadCell" v-for="(cellHeadName, keyHeadCell) in fieldsName">{{ cellHeadName }}</th>
            <th>actions</th>
        </tr>
    </thead>
</template>

<script>
    export default {
        name: "HeaderTable",
        props: {
            'addExtraClassHeader': {
                'type': String,
            },
            'fieldsName': {
                'type': Array,
                'default': {},
                'required': true,
            },
        }
    }
</script>

<style scoped>

</style>