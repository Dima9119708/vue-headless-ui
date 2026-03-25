<template>
    <div class="skeleton-core" :style="{ width, height }" />
</template>

<script setup>
defineProps({
    width: String,
    height: String,
    animationDuration: {
        type: String,
        default: '2s'
    }
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/_main.scss';

.skeleton-core {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    background: $card-neutral-background;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -150%;
        width: 200%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.9),
            transparent
        );
        animation: shimmer v-bind(animationDuration) infinite;
    }
}

@keyframes shimmer {
    0% {
        left: -200%;
    }
    100% {
        left: 100%;
    }
}

body[theme='dark'] .skeleton-core {
    background: $card-neutral-background;

    &::after {
        background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 0, 0, 0.9),
            transparent
        );
    }
}
</style>
