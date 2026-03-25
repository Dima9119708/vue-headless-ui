<script setup>
defineProps({
    checked: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        default: 'menu'
    }
});

const emit = defineEmits(['change']);
</script>

<template>
    <label
        class="visibility-toggle"
        :class="`visibility-toggle--${variant}`"
    >
        <input
            :checked="checked"
            :disabled="disabled"
            type="checkbox"
            @change="emit('change', $event.target.checked)"
        />
        <span>{{ label }}</span>
    </label>
</template>

<style scoped>
.visibility-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 30px;
    padding: 7px 9px;
    color: #20324e;
    font-size: 13px;
    font-weight: 500;
}

.visibility-toggle input {
    accent-color: #1267d6;
    width: 13px;
    height: 13px;
    margin: 0;
}

.visibility-toggle:has(input:disabled) {
    color: #8a98ab;
}

.visibility-toggle--menu {
    transition:
        background-color 0.16s ease,
        color 0.16s ease;
}

.visibility-toggle--menu:hover {
    background: rgba(18, 103, 214, 0.08);
}

.visibility-toggle--menu:has(input:checked) {
    background: rgba(18, 103, 214, 0.1);
    color: #1267d6;
}

.visibility-toggle--plain {
    min-height: 24px;
    padding: 0;
    background: transparent;
}
</style>
