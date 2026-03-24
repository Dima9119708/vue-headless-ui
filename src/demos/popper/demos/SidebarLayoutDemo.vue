<template>
    <DemoSection
        label="Sidebar layout"
        title="Global blockers and isolated sidebar contexts"
        description="Здесь одновременно показаны global unnamed blockers для всей страницы и локальные named blockers внутри sidebar. Идея в том, что blockerNames из sidebar не конфликтует с global data-popper-blocker."
    >
        <div :id="viewportId" class="viewport-box viewport-box--sidebar">
            <div class="viewport-box__hint">sidebar viewport</div>

            <div data-popper-blocker class="static-blocker static-blocker--header">
                <span class="static-blocker__label">sheet-header</span>
                <button
                    type="button"
                    class="burger-button burger-button--header"
                    @click="toggleSidebar"
                >
                    {{ isSidebarOpen ? 'Close' : 'Open' }} burger menu
                </button>
            </div>

            <Popper
                v-model="isGlobalPopperOpen"
                to="body"
                :constrain-boundary="`#${viewportId}`"
                constrain-to-viewport
                :z-index="4"
                :offset="{ mainAxis: 10 }"
            >
                <template #default="{ ref }">
                    <button
                        :ref="ref"
                        class="trigger trigger--inside trigger--sidebar-center"
                        @click="isGlobalPopperOpen = !isGlobalPopperOpen"
                    >
                        {{ isGlobalPopperOpen ? 'Close' : 'Open' }} another popper
                    </button>
                </template>

                <template #content>
                    <PopperContent class="demo-popper demo-popper--scroll">
                        <p>
                            Global blockers affect this popper across the whole
                            demo viewport, even before the sidebar opens.
                        </p>
                        <DemoOptionList :options="demoOptionSets.sidebarGlobal" />
                    </PopperContent>
                </template>
            </Popper>

            <div data-popper-blocker class="static-blocker static-blocker--menu">
                <span class="static-blocker__label">menu</span>
                <span class="static-blocker__meta">data-popper-blocker</span>
            </div>

            <aside v-if="isSidebarOpen" :id="shellId" class="sidebar-shell">
                <div class="sidebar-shell__layer"></div>

                <header data-popper-blocker="sidebar-shell" class="sidebar-shell__header">
                    <strong>Sidebar header</strong>
                    <button type="button" @click="closeSidebar">close</button>
                </header>

                <div :id="contentId" class="sidebar-shell__content">
                    <div class="sidebar-shell__stack">
                        <section
                            v-for="section in sidebarScrollSections.slice(0, 3)"
                            :key="`sidebar-top-${section.id}`"
                            class="sidebar-shell__card"
                        >
                            <strong>{{ section.title }}</strong>
                            <p>{{ section.text }}</p>
                        </section>
                    </div>

                    <p class="sidebar-shell__copy">
                        Outer sidebar popper can stretch through the full sidebar
                        height and does not care about global page blockers.
                    </p>

                    <Popper
                        v-model="isOuterPopperOpen"
                        to="body"
                        :constrain-boundary="`#${shellId}`"
                        constrain-to-viewport
                        :use-blockers="false"
                        :z-index="24"
                        :offset="{ mainAxis: 10 }"
                    >
                        <template #default="{ ref }">
                            <button
                                :ref="ref"
                                class="sidebar-shell__button"
                                @click="isOuterPopperOpen = !isOuterPopperOpen"
                            >
                                {{ isOuterPopperOpen ? 'Close' : 'Open' }}
                                sidebar outer popper
                            </button>
                        </template>

                        <template #content>
                            <PopperContent class="demo-popper demo-popper--scroll">
                                <p>
                                    This one ignores local blockers and can use
                                    the full sidebar shell as its constrained
                                    region.
                                </p>
                                <DemoOptionList :options="demoOptionSets.sidebarOuter" />
                            </PopperContent>
                        </template>
                    </Popper>

                    <div class="sidebar-shell__stack">
                        <section
                            v-for="section in sidebarScrollSections.slice(3, 5)"
                            :key="`sidebar-middle-${section.id}`"
                            class="sidebar-shell__card"
                        >
                            <strong>{{ section.title }}</strong>
                            <p>{{ section.text }}</p>
                        </section>
                    </div>

                    <p class="sidebar-shell__copy">
                        Inner sidebar popper uses blockerNames, so it reacts only
                        to sidebar-shell blockers from the header and footer and
                        does not conflict with the global page blockers outside.
                    </p>

                    <Popper
                        v-model="isInnerPopperOpen"
                        to="body"
                        :constrain-boundary="`#${shellId}`"
                        constrain-to-viewport
                        :blocker-names="['sidebar-shell']"
                        :z-index="24"
                        :offset="{ mainAxis: 10 }"
                    >
                        <template #default="{ ref }">
                            <button
                                :ref="ref"
                                class="sidebar-shell__button"
                                @click="isInnerPopperOpen = !isInnerPopperOpen"
                            >
                                {{ isInnerPopperOpen ? 'Close' : 'Open' }} inner popper
                            </button>
                        </template>

                        <template #content>
                            <PopperContent class="demo-popper demo-popper--scroll">
                                <p>
                                    This popper listens only to named sidebar
                                    blockers, so header and footer affect it
                                    without leaking page-level blockers into the
                                    shell.
                                </p>
                                <DemoOptionList :options="demoOptionSets.sidebarInner" />
                            </PopperContent>
                        </template>
                    </Popper>

                    <p class="sidebar-shell__copy">
                        Bottom-only popper stays under the trigger, disables flip,
                        and uses constrainDirection="bottom" so it stays under the
                        trigger while the sidebar content scrolls.
                    </p>

                    <Popper
                        v-model="isBottomPopperOpen"
                        :to="`#${contentId}`"
                        placement="bottom-start"
                        :constrain-boundary="`#${contentId}`"
                        constrain-to-viewport
                        constrain-direction="bottom"
                        :flip="{ mainAxis: false, crossAxis: false, fallbackPlacements: [] }"
                        :blocker-names="['sidebar-shell']"
                        :z-index="4"
                        :offset="{ mainAxis: 10 }"
                    >
                        <template #default="{ ref }">
                            <button
                                :ref="ref"
                                class="sidebar-shell__button"
                                @click="isBottomPopperOpen = !isBottomPopperOpen"
                            >
                                {{ isBottomPopperOpen ? 'Close' : 'Open' }}
                                bottom-only popper
                            </button>
                        </template>

                        <template #content>
                            <PopperContent
                                class="demo-popper demo-popper--scroll demo-popper--sidebar-bottom"
                            >
                                <p>
                                    Bottom-only mode keeps the popper under the
                                    trigger and lets height clamp inside the
                                    sidebar content area instead of flipping
                                    upward.
                                </p>
                                <DemoOptionList :options="demoOptionSets.sidebarBottom" />
                            </PopperContent>
                        </template>
                    </Popper>

                    <div class="sidebar-shell__stack">
                        <section
                            v-for="section in sidebarScrollSections.slice(5)"
                            :key="`sidebar-bottom-${section.id}`"
                            class="sidebar-shell__card"
                        >
                            <strong>{{ section.title }}</strong>
                            <p>{{ section.text }}</p>
                        </section>
                    </div>
                </div>

                <footer data-popper-blocker="sidebar-shell" class="sidebar-shell__footer">
                    Sidebar footer
                </footer>
            </aside>
        </div>
    </DemoSection>
</template>

<script setup>
import { ref, useId } from 'vue';
import { Popper, PopperContent } from '../../../components/Popper/index.js';
import { demoOptionSets, sidebarScrollSections } from '../demoData.js';
import DemoOptionList from '../components/DemoOptionList.vue';
import DemoSection from '../components/DemoSection.vue';

const viewportId = `sidebar-demo-viewport-${useId()}`;
const shellId = `sidebar-shell-${useId()}`;
const contentId = `sidebar-shell-content-${useId()}`;
const isSidebarOpen = ref(false);
const isGlobalPopperOpen = ref(false);
const isOuterPopperOpen = ref(false);
const isInnerPopperOpen = ref(false);
const isBottomPopperOpen = ref(false);

const closeSidebar = () => {
    isSidebarOpen.value = false;
    isGlobalPopperOpen.value = false;
    isOuterPopperOpen.value = false;
    isInnerPopperOpen.value = false;
    isBottomPopperOpen.value = false;
};

const toggleSidebar = () => {
    if (isSidebarOpen.value) {
        closeSidebar();
        return;
    }

    isSidebarOpen.value = true;
};
</script>
