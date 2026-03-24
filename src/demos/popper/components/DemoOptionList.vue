<template>
    <div class="option-list">
        <PopperOption
            v-for="option in options"
            :key="option.id"
            :variant="option.variant"
            :selected="option.selected"
            :disabled="option.disabled"
        >
            <template v-if="option.start" #start>
                <span class="demo-icon" v-html="option.start"></span>
            </template>

            <span class="option-copy">
                <strong>{{ option.label }}</strong>
                <span>{{ option.hint }}</span>
            </span>

            <template v-if="option.end" #end>
                <span class="demo-icon" v-html="option.end"></span>
            </template>
        </PopperOption>
    </div>
</template>

<script setup>
import { PopperOption } from '../../../components/Popper/index.js';

defineProps({
    options: {
        type: Array,
        default: () => []
    }
});
</script>
