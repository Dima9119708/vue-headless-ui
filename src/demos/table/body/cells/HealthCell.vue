<script setup>
import { TableCell } from '../../../../components/Table/index.js';

defineProps({
    row: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <TableCell>
        <div class="health-cell">
            <div class="health-cell__bar">
                <span
                    class="health-cell__fill"
                    :style="{ width: `${row.health}%` }"
                />
            </div>

            <span class="health-cell__value">{{ row.health }}%</span>
        </div>
    </TableCell>
</template>

<style scoped>
.health-cell {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.health-cell__bar {
    position: relative;
    width: 74px;
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: #e3e8ef;
}

.health-cell__fill {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: inherit;
    background:
        linear-gradient(90deg, #1a8f4b 0%, #57c37f 100%);
}

.health-cell__value {
    font-weight: 700;
    color: #26425d;
}
</style>
