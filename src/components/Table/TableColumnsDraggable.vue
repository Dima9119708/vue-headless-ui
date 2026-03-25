<script setup>
import { computed, nextTick, ref, unref } from 'vue';
import draggable from 'vuedraggable';
import { useTableContext } from './context.js';

const props = defineProps({
    columns: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['reorder']);
const { applySticky, isScrollLocked, tableEl, verticalColumnLines } =
    useTableContext();

const dragIndicatorLeft = ref(null);
const dragTargetIndex = ref(null);
const dragSourceIndex = ref(null);
const isDragging = ref(false);

const showIndicator = computed(
    () =>
        isDragging.value &&
        dragIndicatorLeft.value !== null &&
        props.columns.length > 1
);

const indicatorHeight = computed(() => getTableEl()?.clientHeight ?? 0);

const reset = () => {
    isDragging.value = false;
    dragIndicatorLeft.value = null;
    dragTargetIndex.value = null;
    dragSourceIndex.value = null;
};

const getTableEl = () => {
    const raw = unref(tableEl);
    return raw?.value ?? raw ?? null;
};

const onStart = (event) => {
    isDragging.value = true;
    dragSourceIndex.value =
        event?.item?.__draggable_context?.index ?? event?.oldIndex ?? null;
};

const onMove = (event) => {
    const related = event?.related;
    const tableRoot = getTableEl();

    if (!related || !tableRoot) return true;

    const relatedIndex =
        event?.relatedContext?.index ?? related?.__draggable_context?.index;

    if (typeof relatedIndex !== 'number') {
        dragIndicatorLeft.value = null;
        dragTargetIndex.value = null;
        return false;
    }

    const futureIndex = event?.draggedContext?.futureIndex;
    const isAfter =
        typeof futureIndex === 'number' ? futureIndex > relatedIndex : false;

    const relatedRect = related.getBoundingClientRect();
    const tableRect = tableRoot.getBoundingClientRect();
    const edgeLeft = isAfter ? relatedRect.right : relatedRect.left;

    dragIndicatorLeft.value = Math.max(
        0,
        edgeLeft - tableRect.left + tableRoot.scrollLeft
    );
    dragTargetIndex.value =
        typeof futureIndex === 'number'
            ? futureIndex
            : relatedIndex + (isAfter ? 1 : 0);

    return false;
};

const onEnd = async () => {
    const from = dragSourceIndex.value;
    const to = dragTargetIndex.value;

    if (from == null || to == null || from === to) {
        reset();
        return;
    }

    const nextColumns = props.columns.slice();
    const [moved] = nextColumns.splice(from, 1);
    nextColumns.splice(to, 0, moved);

    reset();
    await nextTick();
    emit('reorder', nextColumns);
};
</script>

<template>
    <draggable
        :model-value="columns"
        item-key="id"
        tag="div"
        class="table-columns-draggable"
        handle=".table-head-cell__label"
        :move="onMove"
        :disabled="columns.length <= 1 || isScrollLocked"
        :animation="150"
        @start="onStart"
        @end="onEnd"
    >
        <template #item="{ element, index }">
            <div
                class="table-columns-draggable__item"
                :class="{
                    'table-columns-draggable__item--with-divider':
                        verticalColumnLines
                }"
                v-bind="applySticky(element.field)"
                data-resizable-column
                data-draggable
            >
                <slot :element="element" :index="index" />
            </div>
        </template>
    </draggable>

    <div
        v-if="showIndicator"
        class="table-columns-draggable__indicator"
        :style="{
            transform: `translateX(${dragIndicatorLeft}px)`,
            height: `${indicatorHeight}px`
        }"
    />
</template>

<style scoped>
.table-columns-draggable {
    display: contents;
}

.table-columns-draggable__item {
    min-width: 0;
    height: 100%;
}

.table-columns-draggable__item--with-divider.table-sticky-right-first {
    box-shadow: inset 1px 0 0 #d8dee8;
}

.table-columns-draggable__indicator {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #1267d6;
    z-index: 12;
    pointer-events: none;
}
</style>
