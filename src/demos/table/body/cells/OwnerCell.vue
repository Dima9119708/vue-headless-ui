<script setup>
import {
    TableCell,
    TableTextEllipsis
} from '../../../../components/Table/index.js';

defineProps({
    row: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <TableCell>
        <div class="owner-cell__avatar">{{ row.ownerInitials }}</div>

        <div class="owner-cell__content">
            <TableTextEllipsis class="owner-cell__name">
                {{ row.owner }}
            </TableTextEllipsis>
            <span class="owner-cell__caption">Field owner</span>
        </div>
    </TableCell>
</template>

<style scoped>
.owner-cell__avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background:
        linear-gradient(135deg, #dcecff 0%, #bfd8ff 100%);
    color: #1755a6;
    font-size: 11px;
    font-weight: 800;
    flex-shrink: 0;
}

.owner-cell__content {
    display: grid;
    gap: 2px;
    min-width: 0;
}

.owner-cell__name {
    font-weight: 600;
}

.owner-cell__caption {
    color: #71839c;
    font-size: 12px;
}
</style>
