<template>
    <section class="playground__demo">
        <div class="demo-copy">
            <p class="scene-label">{{ label }}</p>
            <h2>{{ title }}</h2>
            <p class="description">{{ description }}</p>
        </div>

        <slot />
    </section>
</template>

<script setup>
defineProps({
    label: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
});
</script>
