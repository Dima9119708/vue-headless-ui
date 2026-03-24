<template>
    <DemoSection
        label="Full Width"
        title="Full-width popper inside a constrained viewport"
        description="Здесь ширина popper привязана к trigger. Этот режим легко ломает cross-axis поведение, поэтому его полезно держать отдельно."
    >
        <div :id="viewportId" class="viewport-box viewport-box--compact">
            <div class="viewport-box__hint">fullWidth + constrained container</div>

            <Popper
                v-model="isOpen"
                to="body"
                full-width
                :constrain-boundary="`#${viewportId}`"
                constrain-to-viewport
                :offset="{ mainAxis: 10 }"
            >
                <template #default="{ ref }">
                    <button
                        :ref="ref"
                        class="trigger trigger--wide trigger--inside"
                        @click="isOpen = !isOpen"
                    >
                        {{ isOpen ? 'Close' : 'Open' }} full-width demo
                    </button>
                </template>

                <template #content>
                    <PopperContent
                        class="demo-popper demo-popper--scroll demo-popper--full-width"
                    >
                        <p>
                            Full-width content matches the trigger width. The
                            textarea grows by content first, then the popper
                            itself becomes scrollable when constrained.
                        </p>
                        <label class="field-demo">
                            <span class="field-demo__label">
                                Auto-growing textarea with full-width popper
                            </span>
                            <textarea
                                v-model="draft"
                                autofocus
                                class="field-demo__textarea"
                                rows="2"
                                placeholder="Type a lot of text and keep going..."
                            ></textarea>
                        </label>
                        <p class="field-demo__hint">
                            The textarea grows by content; once the popper hits
                            its viewport constraint, the popper scroll takes
                            over.
                        </p>
                        <DemoOptionList :options="demoOptionSets.fullWidth" />
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
const draft = ref(
    'Start typing here. The textarea should grow with content until the popper itself runs into its constrained max-height and starts scrolling.'
);
const viewportId = `full-width-viewport-${useId()}`;
</script>
