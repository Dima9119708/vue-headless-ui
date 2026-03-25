<script setup>
import { computed } from 'vue';
import { TableCell } from '../../../../components/Table/index.js';

const props = defineProps({
    row: {
        type: Object,
        required: true
    }
});

const formattedDate = computed(() =>
    new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(props.row.startDate)
);
</script>

<template>
    <TableCell>
        <div class="date-cell">
            <span class="date-cell__value">{{ formattedDate }}</span>
            <span class="date-cell__meta">{{ row.startDateLabel }}</span>
        </div>
    </TableCell>
</template>

<style scoped>
.date-cell {
    display: grid;
    gap: 2px;
}

.date-cell__value {
    font-weight: 600;
}

.date-cell__meta {
    color: #71839c;
    font-size: 12px;
}
</style>
