<script setup>
import PopperPlayground from './demos/popper/PopperPlayground.vue';
import TablePlayground from './demos/table/TablePlayground.vue';
</script>

<template>
    <div class="app-shell">
        <PopperPlayground />
        <TablePlayground />
    </div>
</template>

<style scoped>
.app-shell {
    display: grid;
}
</style>
