<script setup>
import { useTemplateRef, watch } from 'vue';
import { useTableContext } from './context.js';

const tableHeadRef = useTemplateRef('tableHeadRef');
const { setTableHeadEl, stickyHeaders } = useTableContext();

watch(
    tableHeadRef,
    (element) => {
        if (element) {
            setTableHeadEl(element);
        }
    },
    {
        immediate: true
    }
);
</script>

<template>
    <div
        ref="tableHeadRef"
        class="table-head"
        :class="{ 'table-head--sticky': stickyHeaders }"
    >
        <slot />
    </div>
</template>

<style scoped>
.table-head {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    min-height: 48px;
    background:
        linear-gradient(180deg, #fbfcfe 0%, #f0f4f9 100%);
}

.table-head--sticky {
    position: sticky;
    top: 0;
    z-index: 10;
}
</style>
