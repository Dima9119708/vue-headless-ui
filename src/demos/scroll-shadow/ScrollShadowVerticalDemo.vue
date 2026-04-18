<script setup>
import ScrollShadow from '../../components/ScrollShadow/ScrollShadow.vue';
</script>

<template>
    <section class="scroll-shadow-demo">
        <div class="scroll-shadow-demo__copy">
            <span class="scroll-shadow-demo__eyebrow">Vertical</span>
            <h2 class="scroll-shadow-demo__title">Long content list</h2>
            <p class="scroll-shadow-demo__text">
                Shadow appears on top and bottom while the panel has overflow.
            </p>
        </div>

        <div class="scroll-shadow-demo__surface">
            <ScrollShadow #default="scrollShadowProps" :size="56">
                <div v-bind="scrollShadowProps" class="scroll-shadow-demo__viewport scroll-shadow-demo__viewport--vertical">
                    <article
                        v-for="item in 10"
                        :key="item"
                        class="scroll-shadow-demo__card"
                    >
                        <span class="scroll-shadow-demo__card-index">0{{ item }}</span>
                        <h3 class="scroll-shadow-demo__card-title">Release note {{ item }}</h3>
                        <p class="scroll-shadow-demo__card-text">
                            Refined spacing, cleaned interactions, and updated edge states to make scrolling feel more explicit.
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
    color: #8b5cf6;
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
    border: 1px solid #e5e7eb;
    border-radius: 28px;
    background:
        radial-gradient(circle at top left, rgba(139, 92, 246, 0.14), transparent 35%),
        linear-gradient(180deg, #ffffff, #f8fafc);
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
}

.scroll-shadow-demo__viewport {
    overscroll-behavior: contain;
}

.scroll-shadow-demo__viewport--vertical {
    display: grid;
    gap: 14px;
    max-height: 320px;
    padding-right: 8px;
}

.scroll-shadow-demo__card {
    display: grid;
    gap: 8px;
    padding: 18px 20px;
    border: 1px solid rgba(99, 102, 241, 0.12);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.88);
}

.scroll-shadow-demo__card-index {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7c3aed;
}

.scroll-shadow-demo__card-title {
    margin: 0;
    font-size: 18px;
    color: #111827;
}

.scroll-shadow-demo__card-text {
    margin: 0;
    line-height: 1.6;
    color: #4b5563;
}
</style>
