<script setup>
defineProps({
    direction: {
        type: String,
        default: 'none'
    }
});
</script>

<template>
    <span class="sort-indicator" :data-state="direction">
        <template v-if="direction === 'asc'">↑</template>
        <template v-else-if="direction === 'desc'">↓</template>
        <template v-else>↕</template>
    </span>
</template>

<style scoped>
.sort-indicator {
    flex-shrink: 0;
    font-size: 12px;
    line-height: 1;
    color: #6f819a;
}

.sort-indicator[data-state='asc'],
.sort-indicator[data-state='desc'] {
    color: #1267d6;
}
</style>
