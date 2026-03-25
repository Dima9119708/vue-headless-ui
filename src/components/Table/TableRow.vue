<script setup>
import { provide, ref, toRef } from 'vue';
import { tableRowContextKey, useTableContext } from './context.js';

const props = defineProps({
    selected: {
        type: Boolean,
        default: false
    }
});

const { zebraStriping } = useTableContext();
const hovered = ref(false);
const selected = toRef(props, 'selected');

provide(tableRowContextKey, {
    hovered,
    selected
});
</script>

<template>
    <div
        class="table-row"
        :class="{
            'table-row--selected': selected,
            'table-row--zebra': zebraStriping
        }"
        @pointerenter="hovered = true"
        @pointerleave="hovered = false"
    >
        <slot />
    </div>
</template>

<style scoped>
.table-row {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
}

.table-row--zebra:nth-child(2n) :deep(.table-cell),
.table-row--zebra:nth-child(2n) :deep(.table-accordion-offset),
.table-row--zebra:nth-child(2n) :deep(.table-accordion-tail) {
    background: #f2f6fb;
}

.table-row:hover :deep(.table-cell:not(.table-cell-spacer)) {
    background: #eef4ff;
}

.table-row--selected :deep(.table-cell) {
    background: #e7f0ff;
}
</style>
