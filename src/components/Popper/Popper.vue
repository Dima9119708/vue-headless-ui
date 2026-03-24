<template>
    <slot :ref="setReference" :placement="placement" />

    <Teleport v-if="modelOpen" :to="to">
        <div
            ref="floating"
            :id="id"
            :data-popper-open="modelOpen ? '' : null"
            :data-popper-placement="placement"
            :style="floatingInlineStyles"
        >
            <slot name="content" :placement="placement" />
        </div>
    </Teleport>
</template>

<script setup>
import { computed, shallowRef, useTemplateRef } from 'vue';
import { resolveDomElement } from '../../utils/resolveDomElement.js';
import { usePopperCore } from './usePopperCore.js';

const modelOpen = defineModel({ default: false });

const props = defineProps({
    to: {
        type: [String, Object],
        default: null,
        required: false
    },
    offset: {
        type: [Number, Object],
        default: 0,
        required: false
    },
    flip: {
        type: Object,
        default: () => ({}),
        required: false
    },
    options: {
        type: Object,
        default: () => ({}),
        required: false
    },
    fullWidth: {
        type: Boolean,
        default: false,
        required: false
    },
    placement: {
        type: String,
        default: 'bottom-start',
        required: false
    },
    constrainToViewport: {
        type: Boolean,
        default: false,
        required: false
    },
    constrainBoundary: {
        type: [String, Object],
        default: null,
        required: false
    },
    constrainPadding: {
        type: [Number, Object],
        default: 12,
        required: false
    },
    constrainDirection: {
        type: String,
        default: 'both',
        required: false
    },
    useBlockers: {
        type: Boolean,
        default: true,
        required: false
    },
    blockerNames: {
        type: Array,
        default: null,
        required: false
    },
    animationFrame: {
        type: Boolean,
        default: false,
        required: false
    },
    hide: {
        type: [Boolean, Object],
        default: true,
        required: false
    },
    disableOutsideClose: {
        type: Boolean,
        default: false,
        required: false
    },
    zIndex: {
        type: Number,
        default: 8,
        required: false
    }
});

const floating = useTemplateRef('floating');
const reference = shallowRef(null);

const setReference = (ref) =>
    resolveDomElement(ref, {
        label: 'Popper reference',
        onResolved: (element) => {
            reference.value = element;
        }
    });

const {
    id,
    floatingStyles,
    middlewareData,
    placement,
    to,
    update,
    closeSelf
} = usePopperCore({
    open: modelOpen,
    referenceRef: reference,
    floatingRef: floating,
    to: computed(() => props.to),
    placement: computed(() => props.placement),
    offset: computed(() => props.offset),
    flip: computed(() => props.flip),
    options: computed(() => props.options),
    fullWidth: computed(() => props.fullWidth),
    constrainToViewport: computed(() => props.constrainToViewport),
    constrainBoundary: computed(() => props.constrainBoundary),
    constrainPadding: computed(() => props.constrainPadding),
    constrainDirection: computed(() => props.constrainDirection),
    disableOutsideClose: computed(() => props.disableOutsideClose),
    useBlockers: computed(() => props.useBlockers),
    blockerNames: computed(() => props.blockerNames),
    animationFrame: computed(() => props.animationFrame),
    hide: computed(() => props.hide)
});

const floatingInlineStyles = computed(() => [
    floatingStyles.value,
    {
        display:
            props.hide !== false && middlewareData.value.hide?.referenceHidden
                ? 'none'
                : 'block',
        zIndex: props.zIndex
    },
    ...(props.fullWidth ? [] : [{ width: 'max-content' }])
]);

defineExpose({
    update,
    closeSelf
});
</script>
