<template>
    <div ref="content" data-popper-content="" :role="role">
        <slot />
    </div>
</template>

<script setup>
import { useTemplateRef } from 'vue';

defineProps({
    role: {
        type: String,
        default: null,
        required: false
    }
});

const content = useTemplateRef('content');

defineExpose({
    content
});
</script>

<style scoped>
[data-popper-content] {
    padding: 8px;
    border: 1px solid #222;
    background: #fff;
}
</style>
