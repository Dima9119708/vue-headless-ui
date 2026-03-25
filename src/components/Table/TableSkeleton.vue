<script setup>
const props = defineProps({
    showHeader: {
        type: Boolean,
        default: true
    },
    countColumns: {
        type: Number,
        default: 8
    },
    countRows: {
        type: Number,
        default: 10
    }
});
</script>

<template>
    <div
        class="table-skeleton"
        :style="{ gridTemplateColumns: `repeat(${props.countColumns}, minmax(120px, 1fr))` }"
    >
        <template v-if="showHeader">
            <div
                v-for="columnIndex in props.countColumns"
                :key="`header-${columnIndex}`"
                class="table-skeleton__cell table-skeleton__cell--header"
            >
                <span class="table-skeleton__line table-skeleton__line--short" />
            </div>
        </template>

        <div
            v-for="rowIndex in props.countColumns * props.countRows"
            :key="`cell-${rowIndex}`"
            class="table-skeleton__cell"
        >
            <span class="table-skeleton__line" />
        </div>
    </div>
</template>

<style scoped>
.table-skeleton {
    display: grid;
    height: 100%;
    overflow: hidden;
    border: 1px solid #d9dce3;
    background: #ffffff;
}

.table-skeleton__cell {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 14px;
    border-right: 1px solid #e0e5ed;
    border-bottom: 1px solid #e0e5ed;
}

.table-skeleton__cell--header {
    background:
        linear-gradient(180deg, #fbfcfe 0%, #eef3fa 100%);
}

.table-skeleton__line {
    display: block;
    width: 100%;
    height: 12px;
    border-radius: 999px;
    background:
        linear-gradient(90deg, #e8edf4 25%, #f6f9fc 37%, #e8edf4 63%);
    background-size: 400% 100%;
    animation: table-skeleton-shimmer 1.4s linear infinite;
}

.table-skeleton__line--short {
    width: 58%;
}

@keyframes table-skeleton-shimmer {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: -100% 0;
    }
}
</style>
