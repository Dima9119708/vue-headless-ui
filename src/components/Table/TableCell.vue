<script setup>
import { useTemplateRef } from 'vue';
import { useTableContext } from './context.js';

const props = defineProps({
    align: {
        type: String,
        default: 'start'
    }
});

const { verticalColumnLines, horizontalRowLines, fontSize } = useTableContext();

const cellRef = useTemplateRef('cellRef');

defineExpose({
    cellRef
});
</script>

<template>
    <div
        ref="cellRef"
        class="table-cell"
        :class="[
            `table-cell--${align}`,
            `table-cell--${fontSize}`,
            {
                'table-cell--border-right': verticalColumnLines,
                'table-cell--border-bottom': horizontalRowLines
            }
        ]"
    >
        <slot />
    </div>
</template>

<style scoped>
.table-cell {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    height: 100%;
    padding: 0 14px;
    background: #ffffff;
    color: #172033;
    font-variant-numeric: tabular-nums;
}

.table-cell--start {
    justify-content: flex-start;
    text-align: left;
}

.table-cell--center {
    justify-content: center;
    text-align: center;
}

.table-cell--end {
    justify-content: flex-end;
    text-align: right;
}

.table-cell--small {
    font-size: 12px;
}

.table-cell--medium {
    font-size: 14px;
}

.table-cell--large {
    font-size: 16px;
}

.table-cell--border-right {
    box-shadow: inset -1px 0 0 #dde2ea;
}

.table-cell--border-bottom {
    box-shadow: inset 0 -1px 0 #dde2ea;
}

.table-cell--border-right.table-cell--border-bottom {
    box-shadow: inset -1px 0 0 #dde2ea, inset 0 -1px 0 #dde2ea;
}

.table-cell--border-right.table-sticky-right-first {
    box-shadow: inset 1px 0 0 #dde2ea, inset -1px 0 0 #dde2ea;
}

.table-cell--border-right.table-cell--border-bottom.table-sticky-right-first {
    box-shadow:
        inset 1px 0 0 #dde2ea,
        inset -1px 0 0 #dde2ea,
        inset 0 -1px 0 #dde2ea;
}
</style>
