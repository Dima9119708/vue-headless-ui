<template>
    <div class="table-accordion-summary">
        <slot />
    </div>
</template>

<style scoped>
.table-accordion-summary {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
}
</style>
