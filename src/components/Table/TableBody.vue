<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { useTableContext } from './context.js';

const { tableEl, isScrollLocked, rowHeightClass } = useTableContext();

const isDragging = ref(false);
const dragState = {
    startX: 0,
    scrollLeft: 0
};

const dragSpeed = computed(() => 1.15);

const removeListeners = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event) => {
    if (!isDragging.value || isScrollLocked.value) {
        onMouseUp();
        return;
    }

    const element = tableEl.value;

    if (!element) return;

    event.preventDefault();
    const deltaX = (event.clientX - dragState.startX) * dragSpeed.value;
    element.scrollLeft = dragState.scrollLeft - deltaX;
};

const onMouseUp = () => {
    if (!isDragging.value) return;

    isDragging.value = false;
    removeListeners();
};

const onMouseDown = (event) => {
    if (event.button !== 0 || isScrollLocked.value) return;

    if (
        event.target.closest(
            'button, a, input, textarea, select, [data-drag-scroll-ignore="true"]'
        )
    ) {
        return;
    }

    const element = tableEl.value;

    if (!element) return;

    isDragging.value = true;
    dragState.startX = event.clientX;
    dragState.scrollLeft = element.scrollLeft;

    document.addEventListener('mousemove', onMouseMove, { passive: false });
    document.addEventListener('mouseup', onMouseUp);
};

onBeforeUnmount(removeListeners);
</script>

<template>
    <div
        class="table-body"
        :class="[rowHeightClass, { 'table-body--dragging': isDragging }]"
        @mousedown="onMouseDown"
    >
        <slot />
    </div>
</template>

<style scoped>
.table-body {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
}

.table-body--regular-small {
    grid-auto-rows: 36px;
}

.table-body--regular-medium {
    grid-auto-rows: 40px;
}

.table-body--regular-large {
    grid-auto-rows: 48px;
}

.table-body--compact-small {
    grid-auto-rows: 30px;
}

.table-body--compact-medium {
    grid-auto-rows: 32px;
}

.table-body--compact-large {
    grid-auto-rows: 36px;
}

.table-body--dragging {
    cursor: grabbing;
    user-select: none;
}
</style>
