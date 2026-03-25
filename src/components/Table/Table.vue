<script setup>
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    provide,
    readonly,
    shallowRef,
    useId,
    watch
} from 'vue';
import { tableContextKey } from './context.js';

const props = defineProps({
    gridTemplateColumns: {
        type: String,
        required: true
    },
    tableSettings: {
        type: Object,
        required: true
    }
});

const tableId = useId();
const tableWrapEl = shallowRef(null);
const tableEl = shallowRef(null);
const tableHeadEl = shallowRef(null);
const leftStickyColumns = shallowRef({});
const rightStickyColumns = shallowRef({});
const isScrollLocked = shallowRef(false);

const rowHeight = computed(() => {
    const size = props.tableSettings.fontSize || 'medium';
    const compact = Boolean(props.tableSettings.isCompactBodyRow);

    const maps = compact
        ? { small: 30, medium: 32, large: 36 }
        : { small: 36, medium: 40, large: 48 };

    return maps[size] ?? maps.medium;
});

const rowHeightClass = computed(() => {
    const size = props.tableSettings.fontSize || 'medium';
    const mode = props.tableSettings.isCompactBodyRow ? 'compact' : 'regular';
    return `table-body--${mode}-${size}`;
});

const hasCheckboxColumn = computed(() =>
    props.gridTemplateColumns.includes('[checkbox]')
);

const applySticky = (id) => {
    if (!id) return {};

    return {
        'data-sticky-id': id,
        class: [
            leftStickyColumns.value[id] && 'table-sticky-left',
            rightStickyColumns.value[id] && 'table-sticky-right',
            rightStickyColumns.value[id]?.isFirst && 'table-sticky-right-first'
        ],
        style: {
            left: leftStickyColumns.value[id]
                ? `${leftStickyColumns.value[id].offset}px`
                : undefined,
            right: rightStickyColumns.value[id]
                ? `${rightStickyColumns.value[id].offset}px`
                : undefined
        }
    };
};

const collectCells = () => {
    const tableHead = tableHeadEl.value;

    if (!tableHead) {
        return [];
    }

    return Array.from(tableHead.querySelectorAll('*')).filter((cell) =>
        cell.hasAttribute('data-sticky-id')
    );
};

const calculateLeftSticky = () => {
    const cells = collectCells();
    const registry = {};
    let offset = 0;

    cells.slice(0, props.tableSettings.stickyLeftColumns || 0).forEach((cell) => {
            const stickyId = cell.getAttribute('data-sticky-id');
            registry[stickyId] = {
                width: cell.offsetWidth,
                offset
            };
            offset += cell.offsetWidth;
        });

    leftStickyColumns.value = registry;
};

const calculateRightSticky = () => {
    const cells = collectCells().reverse();
    const registry = {};
    let offset = 0;
    const stickyCount = props.tableSettings.stickyRightColumns || 0;

    cells.slice(0, stickyCount).forEach(
        (cell, index) => {
            const stickyId = cell.getAttribute('data-sticky-id');
            registry[stickyId] = {
                width: cell.offsetWidth,
                offset,
                isFirst: index === stickyCount - 1
            };
            offset += cell.offsetWidth;
        }
    );

    rightStickyColumns.value = registry;
};

const syncStickyOffsets = () => {
    calculateLeftSticky();
    calculateRightSticky();
};

const scheduleStickySync = async () => {
    await nextTick();
    syncStickyOffsets();
};

const setTableHeadEl = async (element) => {
    tableHeadEl.value = element;
    await scheduleStickySync();
};

const onWindowResize = () => {
    syncStickyOffsets();
};

onMounted(() => {
    window.addEventListener('resize', onWindowResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize);
});

watch(
    () => [
        props.gridTemplateColumns,
        props.tableSettings.stickyLeftColumns,
        props.tableSettings.stickyRightColumns
    ],
    scheduleStickySync,
    {
        immediate: true
    }
);

provide(tableContextKey, {
    tableId,
    tableEl,
    tableWrapEl,
    setTableHeadEl,
    applySticky,
    syncStickyOffsets,
    hasCheckboxColumn,
    isScrollLocked: readonly(isScrollLocked),
    setScrollLocked: (value) => {
        isScrollLocked.value = value;
    },
    rowHeight,
    rowHeightClass,
    leftStickyColumns,
    rightStickyColumns,
    verticalColumnLines: computed(() =>
        Boolean(props.tableSettings.verticalColumnLines)
    ),
    horizontalRowLines: computed(() =>
        Boolean(props.tableSettings.horizontalRowLines)
    ),
    zebraStriping: computed(() => Boolean(props.tableSettings.zebraStriping)),
    stickyHeaders: computed(() => Boolean(props.tableSettings.stickyHeaders)),
    fontSize: computed(() => props.tableSettings.fontSize || 'medium')
});

defineExpose({
    tableEl,
    tableWrapEl,
    syncStickyOffsets
});
</script>

<template>
    <div ref="tableWrapEl" class="table-wrap">
        <div
            ref="tableEl"
            class="table-scroll"
            :class="{ 'table-scroll--locked': isScrollLocked }"
            tabindex="0"
        >
            <div class="table-root" :style="{ gridTemplateColumns }">
                <slot
                    :apply-sticky="applySticky"
                    :has-checkbox-column="hasCheckboxColumn"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.table-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    border: 1px solid #d9dce3;
    background:
        linear-gradient(180deg, #ffffff 0%, #fbfbfd 100%);
    box-shadow:
        0 18px 50px rgba(22, 28, 45, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.85);
    overflow: hidden;
}

.table-scroll {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f6f8fb;
    scrollbar-color: #aeb7c4 transparent;
}

.table-root {
    position: relative;
    display: grid;
    grid-template-rows: min-content;
    width: max-content;
    min-width: 100%;
    min-height: 100%;
}

.table-scroll--locked {
    pointer-events: none;
}

:global(.table-sticky-left),
:global(.table-sticky-right) {
    position: sticky !important;
    z-index: 4;
}

:global(.table-sticky-right-first) {
    position: sticky !important;
}
</style>
