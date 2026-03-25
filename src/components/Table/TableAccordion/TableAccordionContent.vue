<script setup>
import { useTableAccordionContext } from '../context.js';

const { isOpen } = useTableAccordionContext();
</script>

<template>
    <div v-show="isOpen" class="table-accordion-content">
        <slot />
    </div>
</template>

<style scoped>
.table-accordion-content {
    display: contents;
}
</style>
