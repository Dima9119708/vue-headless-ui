<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import LoadMore from '../../components/LoadMore/LoadMore.vue';
import {
    Table,
    TableBody,
    TableCellCheckbox,
    TableCellResize,
    TableColumnsDraggable,
    TableHead,
    TableHeadCell,
    TableSkeleton
} from '../../components/Table/index.js';
import GroupByDate from './body/GroupByDate.vue';
import GroupPosition from './body/GroupPosition.vue';
import RenderRows from './body/RenderRows.vue';
import TableControl from './TableControl.vue';
import HeadMenuPopperContent from './head/HeadMenuPopperContent.vue';
import PinIndicator from './head/PinIndicator.vue';
import ResetSortAction from './head/ResetSortAction.vue';
import SortAscAction from './head/SortAscAction.vue';
import SortDescAction from './head/SortDescAction.vue';
import SortIndicator from './head/SortIndicator.vue';
import VisibilityToggle from './head/VisibilityToggle.vue';
import { createDemoColumns, useTableDemoData } from './useTableDemoData.js';

const columns = ref(createDemoColumns());
const sortState = ref({
    field: 'project',
    direction: 'asc'
});
const selectedIds = ref([]);
const visibleColumns = computed(() =>
    columns.value.filter((column) => column.visible !== false)
);
const projectColumn = computed(
    () => visibleColumns.value.find((column) => column.field === 'project') ?? null
);
const draggableColumns = computed(() =>
    visibleColumns.value.filter((column) => column.field !== 'project')
);

const {
    activeRows,
    completeRows,
    hasNextData,
    isLoading,
    isLoadingMore,
    loadMore,
    visibleRows
} = useTableDemoData(sortState);

const tableSettings = ref({
    horizontalRowLines: true,
    verticalColumnLines: true,
    stickyLeftColumns: 2,
    stickyRightColumns: 0,
    stickyHeaders: true,
    fontSize: 'medium',
    zebraStriping: false,
    isCompactBodyRow: false,
    groupByDate: false
});

const stickyEligibleCount = computed(() => visibleColumns.value.length + 1);

const normalizeTableSettings = (nextSettings) => {
    const total = stickyEligibleCount.value;
    const normalizedLeft = Math.max(
        0,
        Math.min(Number(nextSettings.stickyLeftColumns) || 0, total)
    );
    const normalizedRight = Math.max(
        0,
        Math.min(Number(nextSettings.stickyRightColumns) || 0, total - normalizedLeft)
    );

    return {
        ...nextSettings,
        stickyLeftColumns: normalizedLeft,
        stickyRightColumns: normalizedRight
    };
};

const updateTableSetting = (key, value) => {
    const nextSettings = normalizeTableSettings({
        ...tableSettings.value,
        [key]: value
    });

    if (key === 'stickyRightColumns') {
        nextSettings.stickyLeftColumns = Math.min(
            nextSettings.stickyLeftColumns,
            stickyEligibleCount.value - nextSettings.stickyRightColumns
        );
    }

    tableSettings.value = nextSettings;
};

watch(stickyEligibleCount, () => {
    tableSettings.value = normalizeTableSettings(tableSettings.value);
});

const maxStickyLeft = computed(
    () => stickyEligibleCount.value - tableSettings.value.stickyRightColumns
);

const maxStickyRight = computed(
    () => stickyEligibleCount.value - tableSettings.value.stickyLeftColumns
);

const stickyPinnedFields = computed(() => {
    const fields = visibleColumns.value.map((column) => column.field);
    const leftPinnedFields = fields.slice(
        0,
        Math.max(0, tableSettings.value.stickyLeftColumns - 1)
    );
    const rightPinnedFields =
        tableSettings.value.stickyRightColumns > 0
            ? fields.slice(-tableSettings.value.stickyRightColumns)
            : [];

    return new Set([...leftPinnedFields, ...rightPinnedFields]);
});

const allSelected = computed(
    () => visibleRows.value.length > 0 && selectedIds.value.length === visibleRows.value.length
);

const gridTemplateColumns = computed(() => {
    const parts = ['[checkbox] 48px'];

    if (projectColumn.value) {
        parts.push(
            `[${projectColumn.value.field}] ${projectColumn.value.width}px`
        );
    }

    draggableColumns.value.forEach((column) => {
        parts.push(`[${column.field}] ${column.width}px`);
    });

    parts.push('[spacer] 1fr');
    return parts.join(' ');
});

const setColumnWidth = (column, nextWidth) => {
    columns.value = columns.value.map((item) =>
        item.id === column.id
            ? {
                  ...item,
                  width: nextWidth
              }
            : item
    );
};

const reorderColumns = (nextColumns) => {
    const reorderedVisible = nextColumns.slice();

    columns.value = columns.value.map((column) =>
        column.visible === false || column.field === 'project'
            ? column
            : reorderedVisible.shift()
    );
};

const setSort = (field, direction) => {
    sortState.value = {
        field,
        direction
    };
};

const isSelectedSort = (field, direction) =>
    sortState.value.field === field && sortState.value.direction === direction;

const toggleColumnVisibility = (field, visible) => {
    const visibleCount = columns.value.filter(
        (column) => column.visible !== false
    ).length;

    columns.value = columns.value.map((column) => {
        if (column.field !== field) {
            return column;
        }

        if (column.field === 'project') {
            return column;
        }

        if (!visible && visibleCount === 1) {
            return column;
        }

        return {
            ...column,
            visible
        };
    });
};

const hideOrShowColumnFromMenu = async (field, visible, closePopper) => {
    closePopper();
    await nextTick();
    toggleColumnVisibility(field, visible);
};

const toggleAllRows = (checked) => {
    selectedIds.value = checked ? visibleRows.value.map((row) => row.id) : [];
};

const toggleRow = (rowId, checked) => {
    selectedIds.value = checked
        ? [...new Set([...selectedIds.value, rowId])]
        : selectedIds.value.filter((id) => id !== rowId);
};

const isVisibilityDisabled = (column) =>
    column.field === 'project' ||
    (column.visible !== false && visibleColumns.value.length === 1);

const isPinnedColumn = (field) => stickyPinnedFields.value.has(field);

const dateGroupFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

const groupRowsByDate = (rows) => {
    const groups = new Map();

    rows.forEach((row) => {
        const dateKey = new Date(row.startDate);
        dateKey.setHours(0, 0, 0, 0);

        const key = dateKey.getTime();

        if (!groups.has(key)) {
            groups.set(key, {
                key,
                title: dateGroupFormatter.format(key),
                rows: []
            });
        }

        groups.get(key).rows.push(row);
    });

    return Array.from(groups.values()).sort((left, right) => right.key - left.key);
};

const activeDateGroups = computed(() => groupRowsByDate(activeRows.value));
const completeDateGroups = computed(() => groupRowsByDate(completeRows.value));
</script>

<template>
    <section class="table-demo">
        <header class="table-demo__intro">
            <p class="table-demo__eyebrow">Table Demo</p>
            <h2>Operations board with grouped rows, sticky columns, resize and drag</h2>
            <p>
                This demo keeps the current table architecture, but strips out the old
                domain-specific controls and replaces them with mock operational data.
            </p>
        </header>

        <TableControl
            :columns="columns"
            :max-sticky-left="maxStickyLeft"
            :max-sticky-right="maxStickyRight"
            :is-visibility-disabled="isVisibilityDisabled"
            :settings="tableSettings"
            @toggle-visibility="toggleColumnVisibility"
            @update-setting="updateTableSetting"
        />

        <div class="table-demo__box">
            <TableSkeleton
                v-if="isLoading"
                :count-columns="visibleColumns.length + 3"
                :count-rows="10"
            />

            <Table
                v-else
                v-slot="{ applySticky }"
                :grid-template-columns="gridTemplateColumns"
                :table-settings="tableSettings"
            >
                <TableHead>
                    <TableCellCheckbox
                        v-bind="applySticky('checkbox')"
                        header
                        :model-value="allSelected"
                        @update:model-value="toggleAllRows"
                    />

                    <TableHeadCell
                        v-if="projectColumn"
                        v-bind="applySticky(projectColumn.field)"
                        data-resizable-column
                    >
                        {{ projectColumn.label }}

                        <template #interactive>
                            <span class="table-demo__head-interactive">
                                <SortIndicator
                                    v-if="projectColumn.sortable"
                                    :direction="
                                        sortState.field === projectColumn.field
                                            ? sortState.direction
                                            : 'none'
                                    "
                                />
                                <PinIndicator
                                    v-if="isPinnedColumn(projectColumn.field)"
                                />
                            </span>
                        </template>

                        <template #popper-content="{ closePopper }">
                            <HeadMenuPopperContent>
                                <template v-if="projectColumn.sortable">
                                    <SortAscAction
                                        :active="
                                            isSelectedSort(
                                                projectColumn.field,
                                                'asc'
                                            )
                                        "
                                        @select="
                                            () => {
                                                setSort(
                                                    projectColumn.field,
                                                    'asc'
                                                );
                                                closePopper();
                                            }
                                        "
                                    />

                                    <SortDescAction
                                        :active="
                                            isSelectedSort(
                                                projectColumn.field,
                                                'desc'
                                            )
                                        "
                                        @select="
                                            () => {
                                                setSort(
                                                    projectColumn.field,
                                                    'desc'
                                                );
                                                closePopper();
                                            }
                                        "
                                    />

                                    <ResetSortAction
                                        @select="
                                            () => {
                                                setSort(
                                                    projectColumn.field,
                                                    'none'
                                                );
                                                closePopper();
                                            }
                                        "
                                    />

                                    <div class="menu-content__divider" />
                                </template>

                                <VisibilityToggle
                                    :checked="projectColumn.visible !== false"
                                    :disabled="
                                        isVisibilityDisabled(projectColumn)
                                    "
                                    label="Visible in table"
                                    @change="
                                        (visible) =>
                                            hideOrShowColumnFromMenu(
                                                projectColumn.field,
                                                visible,
                                                closePopper
                                            )
                                    "
                                />
                            </HeadMenuPopperContent>
                        </template>

                        <template #resize>
                            <TableCellResize
                                v-if="draggableColumns.length > 0"
                                :min-width="projectColumn.minWidth"
                                @resize="setColumnWidth(projectColumn, $event)"
                            />
                        </template>
                    </TableHeadCell>

                    <TableColumnsDraggable
                        :columns="draggableColumns"
                        @reorder="reorderColumns"
                    >
                        <template #default="{ element, index }">
                            <TableHeadCell>
                                {{ element.label }}

                                <template #interactive>
                                    <span class="table-demo__head-interactive">
                                        <SortIndicator
                                            v-if="element.sortable"
                                            :direction="
                                                sortState.field === element.field
                                                    ? sortState.direction
                                                    : 'none'
                                            "
                                        />
                                        <PinIndicator
                                            v-if="isPinnedColumn(element.field)"
                                        />
                                    </span>
                                </template>

                                <template #popper-content="{ closePopper }">
                                    <HeadMenuPopperContent>
                                        <template v-if="element.sortable">
                                            <SortAscAction
                                                :active="
                                                    isSelectedSort(
                                                        element.field,
                                                        'asc'
                                                    )
                                                "
                                                @select="
                                                    () => {
                                                        setSort(
                                                            element.field,
                                                            'asc'
                                                        );
                                                        closePopper();
                                                    }
                                                "
                                            />

                                            <SortDescAction
                                                :active="
                                                    isSelectedSort(
                                                        element.field,
                                                        'desc'
                                                    )
                                                "
                                                @select="
                                                    () => {
                                                        setSort(
                                                            element.field,
                                                            'desc'
                                                        );
                                                        closePopper();
                                                    }
                                                "
                                            />

                                            <ResetSortAction
                                                @select="
                                                    () => {
                                                        setSort(
                                                            element.field,
                                                            'none'
                                                        );
                                                        closePopper();
                                                    }
                                                "
                                            />

                                            <div class="menu-content__divider" />
                                        </template>

                                        <VisibilityToggle
                                            :checked="element.visible !== false"
                                            :disabled="
                                                isVisibilityDisabled(element)
                                            "
                                            label="Visible in table"
                                            @change="
                                                (visible) =>
                                                    hideOrShowColumnFromMenu(
                                                        element.field,
                                                        visible,
                                                        closePopper
                                                    )
                                            "
                                        />
                                    </HeadMenuPopperContent>
                                </template>

                                <template #resize>
                                    <TableCellResize
                                        v-if="
                                            index !== draggableColumns.length - 1
                                        "
                                        :min-width="element.minWidth"
                                        @resize="setColumnWidth(element, $event)"
                                    />
                                </template>
                            </TableHeadCell>
                        </template>
                    </TableColumnsDraggable>

                </TableHead>

                <TableBody>
                    <GroupPosition
                        v-if="activeRows.length"
                        title="Active rollout"
                        :rows="activeRows"
                    >
                        <template v-if="tableSettings.groupByDate">
                            <GroupByDate
                                v-for="group in activeDateGroups"
                                :key="group.key"
                                :title="group.title"
                            >
                                <RenderRows
                                    :project-column="projectColumn"
                                    :columns="draggableColumns"
                                    :rows="group.rows"
                                    :selected-ids="selectedIds"
                                    @toggle-row="toggleRow"
                                />
                            </GroupByDate>
                        </template>

                        <RenderRows
                            v-else
                            :project-column="projectColumn"
                            :columns="draggableColumns"
                            :rows="activeRows"
                            :selected-ids="selectedIds"
                            @toggle-row="toggleRow"
                        />
                    </GroupPosition>

                    <GroupPosition
                        v-if="completeRows.length"
                        title="Completed rollout"
                        :rows="completeRows"
                    >
                        <template v-if="tableSettings.groupByDate">
                            <GroupByDate
                                v-for="group in completeDateGroups"
                                :key="group.key"
                                :title="group.title"
                            >
                                <RenderRows
                                    :project-column="projectColumn"
                                    :columns="draggableColumns"
                                    :rows="group.rows"
                                    :selected-ids="selectedIds"
                                    @toggle-row="toggleRow"
                                />
                            </GroupByDate>
                        </template>

                        <RenderRows
                            v-else
                            :project-column="projectColumn"
                            :columns="draggableColumns"
                            :rows="completeRows"
                            :selected-ids="selectedIds"
                            @toggle-row="toggleRow"
                        />
                    </GroupPosition>
                </TableBody>

                <LoadMore
                    style="grid-column: 1 / -1"
                    :has-next-data="hasNextData"
                    :is-loading="isLoading"
                    :is-loading-more="isLoadingMore"
                    @loadMore="loadMore"
                />
            </Table>
        </div>
    </section>
</template>

<style scoped>
.table-demo {
    display: grid;
    gap: 24px;
    min-width: 0;
    padding: 32px 28px 48px;
    background:
        radial-gradient(circle at top left, rgba(18, 103, 214, 0.09), transparent 30%),
        linear-gradient(180deg, #f8fafc 0%, #eef3f8 100%);
}

.table-demo__intro {
    display: grid;
    gap: 10px;
    max-width: 880px;
}

.table-demo__intro h2 {
    margin: 0;
    color: #16243a;
    font-size: clamp(28px, 3vw, 42px);
    line-height: 1.05;
}

.table-demo__intro p {
    margin: 0;
    color: #5c6f88;
    font-size: 15px;
    line-height: 1.6;
}

.table-demo__eyebrow {
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 800;
    color: #1267d6;
}

.table-demo__box {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 680px;
    height: min(74vh, 760px);
    overflow: hidden;
}

.table-demo__head-interactive {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

@media (max-width: 900px) {
    .table-demo {
        padding: 24px 16px 36px;
    }

    .table-demo__box {
        height: 70vh;
        min-height: 560px;
    }
}
</style>
