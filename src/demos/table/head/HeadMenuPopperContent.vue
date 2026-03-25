<template>
    <PopperContent class="head-menu-popper-content" role="menu">
        <div class="menu-content">
            <slot />
        </div>
    </PopperContent>
</template>

<script setup>
import PopperContent from '../../../components/Popper/PopperContent.vue';
</script>

<style scoped>
.head-menu-popper-content {
    box-sizing: border-box;
    width: 100%;
    max-height: var(--popper-max-height, 360px);
    padding: 6px;
    border: 1px solid #c8d3df;
    background: #f8fbfe;
    box-shadow:
        0 14px 28px rgba(20, 34, 58, 0.12),
        0 1px 0 rgba(255, 255, 255, 0.72) inset;
    overflow: auto;
    overscroll-behavior: contain;
}

.menu-content {
    display: grid;
    min-width: 0;
    gap: 2px;
}

.menu-content :deep(.menu-content__divider) {
    height: 1px;
    margin: 5px 2px;
    background: linear-gradient(90deg, #e7edf5 0%, #d7e0ec 100%);
}

.menu-content :deep(.menu-content__title) {
    padding: 5px 8px 7px;
    color: #6d7f96;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}
</style>
