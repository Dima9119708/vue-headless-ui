<script setup>
import TableCell from './TableCell.vue';

defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    header: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <TableCell
        :class="{ 'table-checkbox-cell--header': header }"
        align="center"
    >
        <label class="table-checkbox" data-drag-scroll-ignore="true">
            <input
                :checked="modelValue"
                type="checkbox"
                @change="emit('update:modelValue', $event.target.checked)"
            />
        </label>
    </TableCell>
</template>

<style scoped>
.table-checkbox-cell--header {
    border-top: 1px solid #d8dee8;
    border-bottom: 1px solid #d8dee8;
    background:
        linear-gradient(180deg, #fbfcfe 0%, #eef3fa 100%);
}

.table-checkbox-cell--header.table-cell--border-right {
    box-shadow: inset -1px 0 0 #dde2ea;
}

.table-checkbox-cell--header.table-cell--border-bottom {
    box-shadow: none;
}

.table-checkbox-cell--header.table-cell--border-right.table-cell--border-bottom {
    box-shadow: inset -1px 0 0 #dde2ea;
}

.table-checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
}

.table-checkbox input {
    width: 16px;
    height: 16px;
    accent-color: #1267d6;
}
</style>
