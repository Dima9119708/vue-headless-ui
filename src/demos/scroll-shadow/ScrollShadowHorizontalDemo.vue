<script setup>
import ScrollShadow from '../../components/ScrollShadow/ScrollShadow.vue';

const items = [
    'Analytics',
    'Payments',
    'Security',
    'Growth',
    'Pricing',
    'Support',
    'Integrations',
    'Retention'
];
</script>

<template>
    <section class="scroll-shadow-demo">
        <div class="scroll-shadow-demo__copy">
            <span class="scroll-shadow-demo__eyebrow">Horizontal</span>
            <h2 class="scroll-shadow-demo__title">Wide row of feature panels</h2>
            <p class="scroll-shadow-demo__text">
                The mask follows left and right overflow without changing the card layout.
            </p>
        </div>

        <div class="scroll-shadow-demo__surface">
            <ScrollShadow #default="scrollShadowProps" orientation="horizontal" :size="72">
                <div v-bind="scrollShadowProps" class="scroll-shadow-demo__viewport scroll-shadow-demo__viewport--horizontal">
                    <article
                        v-for="item in items"
                        :key="item"
                        class="scroll-shadow-demo__panel"
                    >
                        <span class="scroll-shadow-demo__panel-kicker">Module</span>
                        <h3 class="scroll-shadow-demo__panel-title">{{ item }}</h3>
                        <p class="scroll-shadow-demo__panel-text">
                            Designed for dense dashboards where content should overflow sideways instead of wrapping into noise.
                        </p>
                    </article>
                </div>
            </ScrollShadow>
        </div>
    </section>
</template>

<style scoped>
.scroll-shadow-demo {
    display: grid;
    gap: 20px;
}

.scroll-shadow-demo__copy {
    display: grid;
    gap: 8px;
    max-width: 560px;
}

.scroll-shadow-demo__eyebrow {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #0f766e;
}

.scroll-shadow-demo__title {
    margin: 0;
    font-size: 28px;
    line-height: 1.1;
    color: #111827;
}

.scroll-shadow-demo__text {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: #4b5563;
}

.scroll-shadow-demo__surface {
    padding: 20px;
    border: 1px solid #d1fae5;
    border-radius: 28px;
    background:
        radial-gradient(circle at top left, rgba(20, 184, 166, 0.18), transparent 32%),
        linear-gradient(180deg, #f0fdfa, #ecfeff);
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
}

.scroll-shadow-demo__viewport {
    overscroll-behavior: contain;
}

.scroll-shadow-demo__viewport--horizontal {
    display: flex;
    gap: 16px;
    max-width: 100%;
    padding-bottom: 8px;
}

.scroll-shadow-demo__panel {
    flex: 0 0 280px;
    display: grid;
    gap: 10px;
    min-height: 210px;
    padding: 24px;
    border: 1px solid rgba(15, 118, 110, 0.12);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.92);
}

.scroll-shadow-demo__panel-kicker {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #0f766e;
}

.scroll-shadow-demo__panel-title {
    margin: 0;
    font-size: 22px;
    color: #0f172a;
}

.scroll-shadow-demo__panel-text {
    margin: 0;
    line-height: 1.7;
    color: #475569;
}
</style>
