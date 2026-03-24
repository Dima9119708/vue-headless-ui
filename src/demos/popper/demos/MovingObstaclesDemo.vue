<template>
    <DemoSection
        label="Moving obstacles"
        title="Named blockers inside the same container"
        description="Два препятствия ездят постоянно. Popper учитывает только элементы с data-popper-blocker=&quot;moving-track&quot;."
    >
        <div :id="viewportId" ref="viewportRef" class="viewport-box">
            <div class="viewport-box__hint">
                moving blockers + constrained viewport
            </div>
            <div
                data-popper-blocker="moving-track"
                class="moving-block moving-block--top"
                :style="{ left: `${topLeft}px` }"
            >
                data-popper-blocker="moving-track"
            </div>
            <div
                data-popper-blocker="moving-track"
                class="moving-block moving-block--bottom"
                :style="{ left: `${bottomLeft}px` }"
            >
                data-popper-blocker="moving-track"
            </div>

            <Popper
                ref="popperRef"
                v-model="isOpen"
                to="body"
                :constrain-boundary="`#${viewportId}`"
                constrain-to-viewport
                :blocker-names="['moving-track']"
                :offset="{ mainAxis: 10 }"
            >
                <template #default="{ ref }">
                    <button
                        :ref="ref"
                        class="trigger trigger--inside"
                        @click="isOpen = !isOpen"
                    >
                        {{ isOpen ? 'Close' : 'Open' }} obstacle demo
                    </button>
                </template>

                <template #content>
                    <PopperContent class="demo-popper demo-popper--scroll">
                        <p>
                            Only named blockers affect this popper, so the moving
                            bars inside the same viewport define the safe area.
                        </p>
                        <DemoOptionList :options="demoOptionSets.obstacle" />
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
const viewportId = `obstacle-viewport-${useId()}`;
const viewportRef = ref(null);
const popperRef = ref(null);
const topLeft = ref(16);
const bottomLeft = ref(560);
const topDirection = ref(1);
const bottomDirection = ref(-1);

let animationFrameId = 0;

const animate = () => {
    const viewportWidth = viewportRef.value?.clientWidth ?? 0;
    const blockWidth = 56;
    const sidePadding = 16;
    const maxLeft = Math.max(sidePadding, viewportWidth - blockWidth - sidePadding);
    const step = 2;

    topLeft.value += step * topDirection.value;
    bottomLeft.value += step * bottomDirection.value;

    if (topLeft.value >= maxLeft || topLeft.value <= sidePadding) {
        topDirection.value *= -1;
        topLeft.value = Math.min(maxLeft, Math.max(sidePadding, topLeft.value));
    }

    if (bottomLeft.value >= maxLeft || bottomLeft.value <= sidePadding) {
        bottomDirection.value *= -1;
        bottomLeft.value = Math.min(maxLeft, Math.max(sidePadding, bottomLeft.value));
    }

    if (isOpen.value) {
        popperRef.value?.update?.();
    }

    animationFrameId = window.requestAnimationFrame(animate);
};

onMounted(() => {
    const viewportWidth = viewportRef.value?.clientWidth ?? 0;
    const blockWidth = 56;
    const sidePadding = 16;

    topLeft.value = sidePadding;
    bottomLeft.value = Math.max(sidePadding, viewportWidth - blockWidth - sidePadding);
    animationFrameId = window.requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
    if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }
});
</script>
