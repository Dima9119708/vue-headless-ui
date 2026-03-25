<script setup>
import { TableCell } from '../../../../components/Table/index.js';

defineProps({
    row: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <TableCell>
        <span class="status-cell" :data-tone="row.statusTone">
            {{ row.status }}
        </span>
    </TableCell>
</template>

<style scoped>
.status-cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 92px;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
}

.status-cell[data-tone='good'] {
    background: #e5f6ea;
    color: #1c7b40;
}

.status-cell[data-tone='warn'] {
    background: #fff2db;
    color: #b56a00;
}

.status-cell[data-tone='bad'] {
    background: #ffe3e0;
    color: #b53b31;
}

.status-cell[data-tone='info'] {
    background: #e4efff;
    color: #205fb2;
}
</style>
