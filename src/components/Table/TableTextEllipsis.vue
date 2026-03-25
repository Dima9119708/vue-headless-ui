<template>
    <div class="table-text-ellipsis">
        <slot />
    </div>
</template>

<style scoped>
.table-text-ellipsis {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
