<template>
    <DemoSection
        label="Drag blockers"
        title="Move blockers with the mouse on the X axis"
        description="Верхний и нижний blockers можно двигать мышью только по оси X. Это хороший кандидат для отдельной story без анимации."
    >
        <div :id="viewportId" ref="viewportRef" class="viewport-box">
            <div class="viewport-box__hint">drag blockers + constrained viewport</div>
            <div
                data-popper-blocker="drag-track"
                class="moving-block moving-block--top moving-block--draggable"
                :style="{ left: `${topLeft}px` }"
                @pointerdown="startDrag('top', $event)"
            >
                data-popper-blocker="drag-track"
            </div>
            <div
                data-popper-blocker="drag-track"
                class="moving-block moving-block--bottom moving-block--draggable"
                :style="{ left: `${bottomLeft}px` }"
                @pointerdown="startDrag('bottom', $event)"
            >
                data-popper-blocker="drag-track"
            </div>

            <Popper
                ref="popperRef"
                v-model="isOpen"
                to="body"
                :constrain-boundary="`#${viewportId}`"
                constrain-to-viewport
                :blocker-names="['drag-track']"
                :offset="{ mainAxis: 10 }"
            >
                <template #default="{ ref }">
                    <button
                        :ref="ref"
                        class="trigger trigger--inside"
                        @click="isOpen = !isOpen"
                    >
                        {{ isOpen ? 'Close' : 'Open' }} drag demo
                    </button>
                </template>

                <template #content>
                    <PopperContent class="demo-popper demo-popper--scroll">
                        <p>
                            Drag the blockers on the X axis and watch the popper
                            continuously adapt to the changing safe region.
                        </p>
                        <DemoOptionList :options="demoOptionSets.drag" />
                    </PopperContent>
                </template>
            </Popper>
        </div>
    </DemoSection>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, useId } from 'vue';
import { Popper, PopperContent } from '../../../components/Popper/index.js';
import { demoOptionSets } from '../demoData.js';
import DemoOptionList from '../components/DemoOptionList.vue';
import DemoSection from '../components/DemoSection.vue';

const isOpen = ref(false);
const viewportId = `drag-viewport-${useId()}`;
const viewportRef = ref(null);
const popperRef = ref(null);
const topLeft = ref(16);
const bottomLeft = ref(16);

let activeDrag = null;

const clampLeft = (left) => {
    const viewportWidth = viewportRef.value?.clientWidth ?? 0;
    const blockWidth = 56;
    const sidePadding = 16;
    const maxLeft = Math.max(sidePadding, viewportWidth - blockWidth - sidePadding);

    return Math.min(maxLeft, Math.max(sidePadding, left));
};

const startDrag = (name, event) => {
    activeDrag = {
        name,
        startX: event.clientX,
        startLeft: name === 'top' ? topLeft.value : bottomLeft.value
    };
};

const handlePointerMove = (event) => {
    if (!activeDrag) {
        return;
    }

    const nextLeft = clampLeft(activeDrag.startLeft + (event.clientX - activeDrag.startX));

    if (activeDrag.name === 'top') {
        topLeft.value = nextLeft;
    } else {
        bottomLeft.value = nextLeft;
    }

    if (isOpen.value) {
        popperRef.value?.update?.();
    }
};

const stopDrag = () => {
    activeDrag = null;
};

onMounted(() => {
    const viewportWidth = viewportRef.value?.clientWidth ?? 0;
    const blockWidth = 56;
    const sidePadding = 16;

    topLeft.value = sidePadding;
    bottomLeft.value = Math.max(sidePadding, viewportWidth - blockWidth - sidePadding);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDrag);
});

onBeforeUnmount(() => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', stopDrag);
});
</script>
