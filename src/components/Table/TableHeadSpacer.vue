<script setup>
import TableHeadCell from './TableHeadCell.vue';
</script>

<template>
    <TableHeadCell
        aria-hidden="true"
        class="table-head-spacer"
        style="padding: 0"
    />
</template>

<style scoped>
.table-head-spacer {
    pointer-events: none;
}
</style>
