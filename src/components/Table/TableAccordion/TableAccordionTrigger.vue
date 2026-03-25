<script setup>
import { useTableAccordionContext, useTableContext } from '../context.js';

const { isOpen, toggle } = useTableAccordionContext();
const { horizontalRowLines, fontSize } = useTableContext();
</script>

<template>
    <button
        type="button"
        class="table-accordion-trigger"
        :class="[
            `table-accordion-trigger--${fontSize}`,
            {
                'table-accordion-trigger--border-bottom': horizontalRowLines
            }
        ]"
        :aria-expanded="isOpen"
        data-drag-scroll-ignore="true"
        @click="toggle"
    >
        <span class="table-accordion-trigger__icon" :data-open="isOpen">▾</span>
        <span class="table-accordion-trigger__content">
            <slot />
        </span>
    </button>
</template>

<style scoped>
.table-accordion-trigger {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-width: 0;
    height: 100%;
    border: 0;
    padding: 0 14px;
    background: #f7fafc;
    color: #48607f;
    font: inherit;
    text-align: left;
    cursor: pointer;
}

.table-accordion-trigger--small {
    font-size: 12px;
}

.table-accordion-trigger--medium {
    font-size: 14px;
}

.table-accordion-trigger--large {
    font-size: 16px;
}

.table-accordion-trigger--border-bottom {
    box-shadow: inset 0 -1px 0 #dde2ea;
}

.table-accordion-trigger__icon {
    transition: transform 0.2s ease;
}

.table-accordion-trigger__icon[data-open='true'] {
    transform: rotate(180deg);
}

.table-accordion-trigger__content {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
