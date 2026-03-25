<template>
    <span class="pin-indicator" aria-hidden="true">
        <span class="pin-indicator__head" />
        <span class="pin-indicator__needle" />
    </span>
</template>

<style scoped>
.pin-indicator {
    position: relative;
    display: inline-flex;
    width: 12px;
    height: 12px;
    color: #1267d6;
    transform: rotate(-28deg);
}

.pin-indicator__head {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 8px;
    height: 6px;
    border-radius: 6px 6px 3px 3px;
    background: currentColor;
}

.pin-indicator__head::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 2px;
    width: 4px;
    height: 3px;
    border-radius: 50%;
    background: #f8fbfe;
}

.pin-indicator__needle {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 1.5px;
    height: 7px;
    border-radius: 999px;
    background: currentColor;
}

.pin-indicator__needle::after {
    content: '';
    position: absolute;
    left: -0.75px;
    bottom: -0.5px;
    width: 3px;
    height: 3px;
    background: currentColor;
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
</style>
