<script setup>
import { useElementVisibility } from '@vueuse/core';
import { useTemplateRef, watch } from 'vue';

const props = defineProps({
    hasNextData: {
        type: Boolean,
        default: false
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    isLoadingMore: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['loadMore']);

const target = useTemplateRef('target');
const targetIsVisible = useElementVisibility(target);

watch(
    [
        targetIsVisible,
        () => props.hasNextData,
        () => props.isLoading,
        () => props.isLoadingMore
    ],
    ([isVisible, hasNextData, isLoading, isLoadingMore]) => {
        if (!isVisible || !hasNextData || isLoading || isLoadingMore) {
            return;
        }

        emit('loadMore');
    }
);
</script>

<template>
    <div ref="target" class="load-more-sentinel" />
</template>

<style scoped>
.load-more-sentinel {
    display: block;
    width: 100%;
    height: 2px;
}
</style>
