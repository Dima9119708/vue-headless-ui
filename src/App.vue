<script setup>
import PopperPlayground from './demos/popper/PopperPlayground.vue';
import ScrollShadowPlayground from './demos/scroll-shadow/ScrollShadowPlayground.vue';
import TablePlayground from './demos/table/TablePlayground.vue';
</script>

<template>
    <div class="app-shell">
        <ScrollShadowPlayground />
        <PopperPlayground />
        <TablePlayground />
    </div>
</template>

<style scoped>
.app-shell {
    display: grid;
}
</style>
