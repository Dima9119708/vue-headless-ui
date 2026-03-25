<script setup>
defineOptions({
    inheritAttrs: false
});

import { computed, provide, ref, shallowRef, useAttrs, useSlots } from 'vue';
import Popper from '../Popper/Popper.vue';
import { tableHeadCellContextKey, useTableContext } from './context.js';

const cellRef = shallowRef(null);
const attrs = useAttrs();
const slots = useSlots();
const { verticalColumnLines } = useTableContext();
const openPopper = ref(false);
const canOpenPopper = computed(() => Boolean(slots['popper-content']));
const closePopper = () => {
    openPopper.value = false;
};

provide(tableHeadCellContextKey, {
    cellRef
});

const setCellRef = (element) => {
    cellRef.value = element ?? null;
};

const handleClick = () => {
    if (!canOpenPopper.value) {
        return;
    }

    openPopper.value = !openPopper.value;
};
</script>

<template>
    <Popper
        v-model="openPopper"
        full-width
        constrain-to-viewport
        constrain-direction="bottom"
        constrainBoundary="viewport"
        :z-index="24"
        :flip="{ fallbackPlacements: ['bottom-start'] }"
        placement="bottom-start"
    >
        <template #default="{ ref: setReference }">
            <div
                :ref="
                    (element) => {
                        setCellRef(element);
                        setReference(element);
                    }
                "
                class="table-head-cell"
                :class="{
                    'table-head-cell--border-right': verticalColumnLines
                }"
                v-bind="attrs"
            >
                <button
                    type="button"
                    class="table-head-cell__button"
                    :class="{
                        'table-head-cell__button--interactive': canOpenPopper
                    }"
                    data-drag-scroll-ignore="true"
                    @click="handleClick"
                >
                    <span class="table-head-cell__label">
                        <slot />
                    </span>

                    <span
                        v-if="$slots.interactive"
                        class="table-head-cell__interactive"
                    >
                        <slot name="interactive" />
                    </span>
                </button>

                <slot name="resize" />
            </div>
        </template>

        <template #content>
            <slot
                v-if="canOpenPopper"
                name="popper-content"
                :close-popper="closePopper"
            />
        </template>
    </Popper>
</template>

<style scoped>
.table-head-cell {
    position: relative;
    display: flex;
    min-width: 0;
    min-height: 48px;
    padding: 0 14px;
    border-top: 1px solid #d8dee8;
    border-bottom: 1px solid #d8dee8;
    background:
        linear-gradient(180deg, #fbfcfe 0%, #eef3fa 100%);
    color: #40526b;
}

.table-head-cell--border-right {
    box-shadow: inset -1px 0 0 #d8dee8;
}

.table-head-cell--border-right.table-sticky-right-first {
    box-shadow: inset 1px 0 0 #d8dee8, inset -1px 0 0 #d8dee8;
}

.table-head-cell__button {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    min-width: 0;
    border: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
}

.table-head-cell__button--interactive {
    cursor: pointer;
}

.table-head-cell__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.table-head-cell__interactive {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
}
</style>
