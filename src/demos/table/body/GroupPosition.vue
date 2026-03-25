<script setup>
import { computed } from 'vue';
import {
    TableAccordionContent,
    TableAccordionOffset,
    TableAccordionRoot,
    TableAccordionSummary,
    TableAccordionTail,
    TableAccordionTrigger
} from '../../../components/Table/index.js';
import { useTableContext } from '../../../components/Table/context.js';

const props = defineProps({
    rows: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const { applySticky, hasCheckboxColumn } = useTableContext();

const totalBudget = computed(() =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(
        props.rows.reduce((sum, row) => {
            return sum + row.budget;
        }, 0)
    )
);

const triggerGridColumn = computed(() =>
    hasCheckboxColumn.value ? '2 / span 3' : '1 / span 3'
);

const tailGridColumn = computed(() =>
    hasCheckboxColumn.value ? '5 / -1' : '4 / -1'
);
</script>

<template>
    <TableAccordionRoot :default-open="true">
        <TableAccordionSummary>
            <TableAccordionOffset
                v-if="hasCheckboxColumn"
                v-bind="applySticky('checkbox')"
            />

            <TableAccordionTrigger
                class="group-position__trigger"
                v-bind="applySticky('project')"
                :style="{ gridColumn: triggerGridColumn }"
            >
                <span class="group-position__title">{{ title }}</span>
                <span class="group-position__meta">{{ rows.length }} rows</span>
                <span class="group-position__meta">Budget {{ totalBudget }}</span>
            </TableAccordionTrigger>

            <TableAccordionTail :style="{ gridColumn: tailGridColumn }" />
        </TableAccordionSummary>

        <TableAccordionContent>
            <slot />
        </TableAccordionContent>
    </TableAccordionRoot>
</template>

<style scoped>
.group-position__title {
    font-weight: 700;
    color: #20324e;
}

.group-position__trigger {
    background: #f7fafc;
    padding-left: 0;
    padding-right: 0;
}

.group-position__meta {
    margin-left: 14px;
    color: #667a96;
    font-size: 12px;
}
</style>
