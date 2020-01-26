<template>
    <thead>
    <tr :class="addExtraClassHeader">
        <th>#</th>
        <th :key="keyHeadCell"
            v-for="(cellHeadName, keyHeadCell) in fieldsName"
            @click="sort(cellHeadName)"
            :class="cellHeadName === sortColumn?sortValue:''"
            class="sort"
        >
            {{ cellHeadName }}
        </th>
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
        },
        data: function () {
            return {
                sortColumn: '',
                sortValue: '',
            }
        },
        methods: {
            sort(cellHeadName) {
                if (cellHeadName === this.sortColumn) {
                    switch (this.sortValue) {
                        case '':
                            this.sortValue = 'asc';
                            break;
                        case 'asc':
                            this.sortValue = 'desc';
                            break;
                        default:
                            this.sortValue = '';
                    }
                } else {
                    this.sortColumn = cellHeadName;
                    this.sortValue = 'asc';
                }

                this.$emit('sortRows', this.sortColumn, this.sortValue)
            }
        }
    }
</script>

<style>
    .asc:after,
    .desc:after {
        content: '';
        margin-left: 5px;
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
    }
    .asc:after{
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
    }
    .desc:after {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);

    }
</style>