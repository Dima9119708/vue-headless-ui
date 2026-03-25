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
    title: {
        type: String,
        required: true
    }
});

const { applySticky, hasCheckboxColumn } = useTableContext();

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
                class="group-by-date__trigger"
                v-bind="applySticky('project')"
                :style="{ gridColumn: triggerGridColumn }"
            >
                <span class="group-by-date__title">{{ title }}</span>
            </TableAccordionTrigger>

            <TableAccordionTail :style="{ gridColumn: tailGridColumn }" />
        </TableAccordionSummary>

        <TableAccordionContent>
            <slot />
        </TableAccordionContent>
    </TableAccordionRoot>
</template>

<style scoped>
.group-by-date__trigger {
    background: #fbfcfe;
    padding-left: 0;
    padding-right: 0;
}

.group-by-date__title {
    font-weight: 600;
    color: #4d607a;
}
</style>
