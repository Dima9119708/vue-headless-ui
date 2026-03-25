<script setup>
import { provide, readonly, ref } from 'vue';
import { tableAccordionContextKey } from '../context.js';

const props = defineProps({
    defaultOpen: {
        type: Boolean,
        default: true
    }
});

const isOpen = ref(props.defaultOpen);

provide(tableAccordionContextKey, {
    isOpen: readonly(isOpen),
    toggle: () => {
        isOpen.value = !isOpen.value;
    }
});
</script>

<template>
    <div class="table-accordion-root">
        <slot />
    </div>
</template>

<style scoped>
.table-accordion-root {
    display: contents;
}
</style>
