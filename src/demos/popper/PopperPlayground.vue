<template>
    <main class="playground">
        <LargeViewportDemo />
        <MovingObstaclesDemo />
        <FullWidthDemo />
        <DragBlockersDemo />
        <SidebarLayoutDemo />
    </main>
</template>

<script setup>
import './playground.css';
import DragBlockersDemo from './demos/DragBlockersDemo.vue';
import FullWidthDemo from './demos/FullWidthDemo.vue';
import LargeViewportDemo from './demos/LargeViewportDemo.vue';
import MovingObstaclesDemo from './demos/MovingObstaclesDemo.vue';
import SidebarLayoutDemo from './demos/SidebarLayoutDemo.vue';
</script>
