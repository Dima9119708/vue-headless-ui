<script setup>
import MenuAction from './MenuAction.vue';

defineProps({
    active: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['select']);
</script>

<template>
    <MenuAction :active="active" @select="emit('select')">
        Reset sort
    </MenuAction>
</template>
