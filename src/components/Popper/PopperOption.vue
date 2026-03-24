<template>
    <div
        ref="popper-option"
        class="popper-option"
        :class="{
            selected,
            disabled,
            danger: variant === 'danger',
            primary: variant === 'primary'
        }"
    >
        <slot name="start" />
        <div class="popper-option-text">
            <slot />
        </div>
        <slot name="end" />
    </div>
</template>

<script setup>
import { useTemplateRef } from 'vue';

defineProps({
    selected: {
        type: Boolean,
        required: false,
        default: false
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    variant: {
        type: String,
        required: false,
        default: 'default'
    }
});

const popperOptionRef = useTemplateRef('popper-option');

defineExpose({
    popperOptionRef
});
</script>

<style scoped>
.popper-option {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 36px;
    padding: 6px 8px;
    margin: 2px 0;
    border: 1px solid transparent;
    color: #111;
    background: #fff;
}

.popper-option-text {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
}

.popper-option.selected {
    border-color: #111;
    background: #f3f4f6;
}

.popper-option.primary {
    color: #1d4ed8;
    background: #eff6ff;
}

.popper-option.primary.selected {
    border-color: #1d4ed8;
    background: #dbeafe;
}

.popper-option.danger {
    color: #b91c1c;
    background: #fef2f2;
}

.popper-option.danger.selected {
    border-color: #b91c1c;
    background: #fee2e2;
}

.popper-option.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
