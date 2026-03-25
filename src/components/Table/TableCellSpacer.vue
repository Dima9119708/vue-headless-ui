<script setup>
import TableCell from './TableCell.vue';
</script>

<template>
    <TableCell class="table-cell-spacer" aria-hidden="true" />
</template>

<style scoped>
.table-cell-spacer {
    padding: 0;
    background: #ffffff;
}

.table-cell-spacer.table-cell--border-right {
    box-shadow: inset 0 -1px 0 #dde2ea;
}

.table-cell-spacer.table-cell--border-right:not(.table-cell--border-bottom) {
    box-shadow: none;
}
</style>
