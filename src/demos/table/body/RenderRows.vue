<script setup>
import {
    TableCellCheckbox,
    TableCellSpacer,
    TableRow
} from '../../../components/Table/index.js';
import { useTableContext } from '../../../components/Table/context.js';
import DateCell from './cells/DateCell.vue';
import DefaultCell from './cells/DefaultCell.vue';
import HealthCell from './cells/HealthCell.vue';
import OwnerCell from './cells/OwnerCell.vue';
import ProjectCell from './cells/ProjectCell.vue';
import StatusCell from './cells/StatusCell.vue';

const props = defineProps({
    projectColumn: {
        type: Object,
        default: null
    },
    columns: {
        type: Array,
        required: true
    },
    rows: {
        type: Array,
        required: true
    },
    selectedIds: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['toggleRow']);
const { applySticky } = useTableContext();

const cellComponentMap = {
    project: ProjectCell,
    owner: OwnerCell,
    status: StatusCell,
    date: DateCell,
    health: HealthCell,
    default: DefaultCell
};

const resolveComponent = (column) =>
    cellComponentMap[column.cell] ?? cellComponentMap.default;

const isSelected = (rowId) => props.selectedIds.includes(rowId);
</script>

<template>
    <TableRow
        v-for="row in rows"
        :key="row.id"
        :selected="isSelected(row.id)"
    >
        <TableCellCheckbox
            v-bind="applySticky('checkbox')"
            :model-value="isSelected(row.id)"
            @update:model-value="emit('toggleRow', row.id, $event)"
        />

        <ProjectCell
            v-if="projectColumn"
            v-bind="applySticky(projectColumn.field)"
            :column="projectColumn"
            :row="row"
        />

        <component
            :is="resolveComponent(column)"
            v-for="column in columns"
            :key="`${row.id}-${column.id}`"
            v-bind="applySticky(column.field)"
            :column="column"
            :row="row"
        />
        <TableCellSpacer />
    </TableRow>
</template>
