<template>
    <tr :class="addExtraClassRow(keyRow)">
        <th scope="row">{{ keyRow + 1 }}</th>
        <td v-for="fieldName in fieldsName"
            v-if="fieldName in fieldsValue"
            @dblclick="changeCell(keyRow, fieldName, fieldsValue[fieldName])"
        >
            <input class="form-control" type="text" v-if="isChangeCell(keyRow, fieldName)"
                   v-model="valueCell"
                   @keyup.esc="resetChangeCell"
                   @blur="saveValueCell"
                   @keyup.enter="saveValueCell"
            />
            <div v-else>{{fieldsValue[fieldName]}}</div>
        </td>
        <td v-else> No data</td>
        <td class="d-flex justify-content-center">
            <button type="button" class="btn">
                <span :title="this.titleForAddRowOnBottom" aria-hidden="true" @click="addRowByKey(keyRow + 1)">&#8744;</span>
            </button>
            <button type="button" class="btn">
                <span :title="this.titleForAddRowOnTop" aria-hidden="true" @click="addRowByKey(keyRow)">&#8743;</span>
            </button>
            <button type="button" class="close">
                <span  :title="this.titleForDeleteRow" aria-hidden="true" @click="deleteRow">&times;</span>
            </button>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "RowTable",
        props: {
            'fieldsValue': {
                'type': Object,
                'default': {},
                'required': true,
            },
            'fieldsName': {
                'type': Array,
                'default': {},
                'required': true,
            },
            'keyRow': {
                'type': Number,
                'default': 0,
                'required': true,
                'validator': function (value) {
                    return value >= 0
                }
            },
            'evenClassName': {
                'type': String,
                'default': '',
            },
            'oddClassName': {
                'type': String,
                'default': '',
            }
        },
        data: function() {
            return {
                nameChangeField: '',
                valueCell: '',
                defaultValueForNewRows: 'default',
                titleForAddRowOnTop: 'Добавить строку сверху',
                titleForAddRowOnBottom: 'Добавить строку снизу',
                titleForDeleteRow: 'Удалить строку'
            }
        },
        methods: {
            deleteRow() {
                this.$emit('deleteRow', this.keyRow)
            },
            isChangeCell(keyRow, fieldName) {
                return fieldName === this.nameChangeField;
            },
            saveValueCell() {
                this.fieldsValue[this.nameChangeField] = this.valueCell;
                this.resetChangeCell()
            },
            resetChangeCell() {
                this.nameChangeField = '';
                this.valueCell = '';
            },
            addRowByKey(key) {
                this.$emit('addRowByKey', {
                    keyRow: key,
                    defaultValueForNewRows: this.defaultValueForNewRows

                })
            },
            addExtraClassRow(keyRow) {
                if (keyRow % 2 === 0 && this.evenClassName) {
                    return this.evenClassName
                } else if (keyRow % 2 !== 0 && this.oddClassName) {
                    return this.oddClassName
                }
            },
            changeCell(keyRow, fieldName, valueCell) {
                this.nameChangeField = fieldName;
                this.valueCell = valueCell;
            },
        }
    }
</script>

<style scoped>

</style>