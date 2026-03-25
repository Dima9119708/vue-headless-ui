<script setup>
import VisibilityToggle from './VisibilityToggle.vue';

defineProps({
    columns: {
        type: Array,
        required: true
    },
    isVisibilityDisabled: {
        type: Function,
        required: true
    }
});

const emit = defineEmits(['toggle-visibility']);
</script>

<template>
    <div class="menu-content__title">Visible in table</div>

    <VisibilityToggle
        v-for="entry in columns"
        :key="entry.id"
        :checked="entry.visible !== false"
        :disabled="isVisibilityDisabled(entry)"
        :label="entry.label"
        @change="emit('toggle-visibility', entry.field, $event)"
    />
</template>
