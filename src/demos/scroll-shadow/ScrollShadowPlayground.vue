<script setup>
import ScrollShadowHorizontalDemo from './ScrollShadowHorizontalDemo.vue';
import ScrollShadowVerticalDemo from './ScrollShadowVerticalDemo.vue';
</script>

<template>
    <main class="scroll-shadow-playground">
        <header class="scroll-shadow-playground__hero">
            <span class="scroll-shadow-playground__eyebrow">ScrollShadow</span>
            <h1 class="scroll-shadow-playground__title">Overflow demos for both directions</h1>
            <p class="scroll-shadow-playground__text">
                Two focused examples that show the component on vertical and horizontal containers.
            </p>
        </header>

        <div class="scroll-shadow-playground__grid">
            <ScrollShadowVerticalDemo />
            <ScrollShadowHorizontalDemo />
        </div>
    </main>
</template>

<style scoped>
.scroll-shadow-playground {
    min-height: 100vh;
    padding: 48px;
    background:
        radial-gradient(circle at top center, rgba(99, 102, 241, 0.08), transparent 28%),
        linear-gradient(180deg, #f8fafc, #eef2ff 55%, #ecfeff);
}

.scroll-shadow-playground__hero {
    display: grid;
    gap: 12px;
    max-width: 720px;
    margin-bottom: 32px;
}

.scroll-shadow-playground__eyebrow {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4f46e5;
}

.scroll-shadow-playground__title {
    margin: 0;
    font-size: clamp(36px, 4vw, 56px);
    line-height: 0.98;
    color: #0f172a;
}

.scroll-shadow-playground__text {
    margin: 0;
    max-width: 620px;
    font-size: 17px;
    line-height: 1.7;
    color: #475569;
}

.scroll-shadow-playground__grid {
    display: grid;
    gap: 32px;
   max-width: 600px;
}

@media (max-width: 768px) {
    .scroll-shadow-playground {
        padding: 24px;
    }
}
</style>
