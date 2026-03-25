<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { useTableContext, useTableHeadCellContext } from './context.js';

const props = defineProps({
    minWidth: {
        type: Number,
        default: null
    }
});

const emit = defineEmits(['resize']);

const { cellRef } = useTableHeadCellContext();
const { tableEl } = useTableContext();

const isResizing = ref(false);
const offsetX = ref(0);
const startX = ref(0);
const startWidth = ref(0);
const guideHeight = ref('100%');
const COLUMN_ATTR_SELECTOR = '[data-resizable-column]';

const clampWidth = computed(() => (width) => {
    if (props.minWidth == null) {
        return width;
    }

    return Math.max(width, props.minWidth);
});

const onMouseMove = (event) => {
    if (!isResizing.value) return;

    const nextWidth = clampWidth.value(
        startWidth.value + (event.pageX - startX.value)
    );

    offsetX.value = nextWidth - startWidth.value;
};

const clearSelection = () => {
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
};

const setColumnZIndex = (zIndex) => {
    const columnEl = cellRef.value?.closest(COLUMN_ATTR_SELECTOR);

    if (columnEl) {
        columnEl.style.zIndex = zIndex;
    }
};

const removeListeners = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
};

const onMouseUp = () => {
    if (!isResizing.value) return;

    emit('resize', clampWidth.value(startWidth.value + offsetX.value));
    isResizing.value = false;
    offsetX.value = 0;
    guideHeight.value = '100%';
    setColumnZIndex('');
    clearSelection();
    removeListeners();
};

const onMouseDown = (event) => {
    const element = cellRef.value;

    if (!element) return;

    isResizing.value = true;
    startX.value = event.pageX;
    startWidth.value = element.offsetWidth;
    guideHeight.value = `${tableEl.value?.clientHeight ?? 0}px`;
    setColumnZIndex('5');

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

onBeforeUnmount(() => {
    clearSelection();
    removeListeners();
});
</script>

<template>
    <div
        class="table-head-resize"
        :class="{ 'table-head-resize--active': isResizing }"
        :style="{
            transform: `translateX(${offsetX}px)`,
            opacity: isResizing ? 1 : undefined
        }"
        @mousedown.stop.prevent="onMouseDown"
        @click.stop
    >
        <span class="table-head-resize__guide" :style="{ height: guideHeight }" />
    </div>
</template>

<style scoped>
.table-head-resize {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 3px;
    z-index: 999;
    opacity: 0;
    background: #1267d6;
    cursor: col-resize;
}

.table-head-resize:hover {
    opacity: 1;
}

.table-head-resize--active {
    opacity: 0;
}

.table-head-resize__guide {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1.5px;
    background: #1267d6;
    opacity: 0;
    transform: translateX(-50%);
}

.table-head-resize--active .table-head-resize__guide {
    opacity: 0.7;
}
</style>
