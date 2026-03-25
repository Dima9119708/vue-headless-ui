<script setup>
import { computed } from 'vue';
import {
    TableCell,
    TableTextEllipsis
} from '../../../../components/Table/index.js';

const props = defineProps({
    column: {
        type: Object,
        required: true
    },
    row: {
        type: Object,
        required: true
    }
});

const value = computed(() => {
    const rawValue = props.row[props.column.field];

    if (typeof props.column.formatter === 'function') {
        return props.column.formatter(rawValue, props.row);
    }

    return rawValue;
});
</script>

<template>
    <TableCell :align="column.align || 'start'">
        <TableTextEllipsis>{{ value }}</TableTextEllipsis>
    </TableCell>
</template>
