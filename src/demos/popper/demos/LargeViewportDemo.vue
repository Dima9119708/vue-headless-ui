<template>
    <DemoSection
        label="Constrained container"
        title="Large content inside a custom viewport"
        description="Popper телепортируется и ограничивается внутри этого бокса. Контент специально длинный, чтобы было видно скролл и ограничение по высоте."
    >
        <div :id="viewportId" class="viewport-box">
            <div class="viewport-box__hint">viewport box</div>

            <Popper
                v-model="isOpen"
                to="body"
                :constrain-boundary="`#${viewportId}`"
                constrain-to-viewport
                :offset="{ mainAxis: 10 }"
            >
                <template #default="{ ref }">
                    <button
                        :ref="ref"
                        class="trigger trigger--inside"
                        @click="isOpen = !isOpen"
                    >
                        {{ isOpen ? 'Close' : 'Open' }} large demo
                    </button>
                </template>

                <template #content>
                    <PopperContent class="demo-popper demo-popper--scroll">
                        <p>
                            Long content inside a constrained viewport. Resize
                            the box and watch the popper switch from growing to
                            scrolling.
                        </p>
                        <DemoOptionList :options="demoOptionSets.large" />
                    </PopperContent>
                </template>
            </Popper>
        </div>
    </DemoSection>
</template>

<script setup>
import { ref, useId } from 'vue';
import { Popper, PopperContent } from '../../../components/Popper/index.js';
import { demoOptionSets } from '../demoData.js';
import DemoOptionList from '../components/DemoOptionList.vue';
import DemoSection from '../components/DemoSection.vue';

const isOpen = ref(false);
const viewportId = `large-viewport-${useId()}`;
</script>
