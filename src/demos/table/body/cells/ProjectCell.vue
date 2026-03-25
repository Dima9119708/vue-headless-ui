<script setup>
import { computed } from 'vue';
import {
    TableCell,
    TableTextEllipsis
} from '../../../../components/Table/index.js';
import { useTableRowContext } from '../../../../components/Table/context.js';

const props = defineProps({
    column: {
        type: Object,
        default: null
    },
    row: {
        type: Object,
        required: true
    }
});

const rowContext = useTableRowContext();

const isAccentVisible = computed(
    () =>
        Boolean(rowContext.hovered?.value) || Boolean(rowContext.selected?.value)
);

const accentClass = computed(() => {
    const tones = {
        good: 'project-cell--accent-good',
        warn: 'project-cell--accent-warn',
        bad: 'project-cell--accent-bad',
        info: 'project-cell--accent-info'
    };

    return tones[props.row.statusTone] ?? 'project-cell--accent-info';
});
</script>

<template>
    <TableCell
        :class="[
            'project-cell-cell',
            accentClass,
            { 'project-cell-cell--accent-visible': isAccentVisible }
        ]"
    >
        <div class="project-cell">
            <TableTextEllipsis class="project-cell__title">
                {{ props.row.project }}
            </TableTextEllipsis>

            <div class="project-cell__meta">
                <span class="project-cell__code">{{ props.row.projectCode }}</span>
                <span>{{ props.row.region }}</span>
            </div>
        </div>
    </TableCell>
</template>

<style scoped>
.project-cell-cell {
    position: relative;
}

.project-cell-cell::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    opacity: 0;
    transition: opacity 0.18s ease;
}

.project-cell-cell--accent-visible::before {
    opacity: 1;
}

.project-cell--accent-good::before {
    background: #1a8f4b;
}

.project-cell--accent-warn::before {
    background: #c98300;
}

.project-cell--accent-bad::before {
    background: #c93b3b;
}

.project-cell--accent-info::before {
    background: #1267d6;
}

.project-cell {
    display: grid;
    gap: 2px;
    min-width: 0;
    width: 100%;
    padding-left: 12px;
}

.project-cell__title {
    font-weight: 700;
    color: #16243a;
}

.project-cell__meta {
    display: inline-flex;
    gap: 8px;
    min-width: 0;
    color: #6b7d97;
    font-size: 12px;
}

.project-cell__code {
    color: #1267d6;
    font-weight: 700;
}
</style>
