<script setup>
defineProps({
    active: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['select']);
</script>

<template>
    <button
        type="button"
        class="menu-action"
        :class="{ 'menu-action--active': active }"
        @click="emit('select')"
    >
        <slot />
    </button>
</template>

<style scoped>
.menu-action {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 30px;
    border: 0;
    padding: 7px 9px;
    background: transparent;
    color: #20324e;
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    border-radius: 0;
    transition:
        background-color 0.16s ease,
        color 0.16s ease;
}

.menu-action:hover {
    background: rgba(18, 103, 214, 0.08);
}

.menu-action--active {
    background: rgba(18, 103, 214, 0.1);
    color: #1267d6;
}
</style>
