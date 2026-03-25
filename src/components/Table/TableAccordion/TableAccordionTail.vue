<script setup>
import { useTableContext } from '../context.js';

const { horizontalRowLines } = useTableContext();
</script>

<template>
    <div
        aria-hidden="true"
        class="table-accordion-tail"
        :class="{ 'table-accordion-tail--border-bottom': horizontalRowLines }"
    />
</template>

<style scoped>
.table-accordion-tail {
    min-width: 0;
    height: 100%;
    background: #f7fafc;
}

.table-accordion-tail--border-bottom {
    box-shadow: inset 0 -1px 0 #dde2ea;
}
</style>
