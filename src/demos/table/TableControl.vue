<script setup>
import VisibilityToggle from './head/VisibilityToggle.vue';

const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    isVisibilityDisabled: {
        type: Function,
        required: true
    },
    maxStickyLeft: {
        type: Number,
        required: true
    },
    maxStickyRight: {
        type: Number,
        required: true
    },
    settings: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['toggle-visibility', 'update-setting']);

const updateBoolean = (key, event) => {
    emit('update-setting', key, event.target.checked);
};

const updateNumber = (key, event) => {
    emit('update-setting', key, Number(event.target.value));
};

const updateText = (key, event) => {
    emit('update-setting', key, event.target.value);
};
</script>

<template>
    <section class="table-control">
        <div class="table-control__row">
            <label class="table-control__field">
                <span class="table-control__label">Font size</span>
                <select
                    :value="settings.fontSize"
                    @change="updateText('fontSize', $event)"
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </label>

            <label class="table-control__field">
                <span class="table-control__label">Sticky left</span>
                <input
                    :max="maxStickyLeft"
                    :value="settings.stickyLeftColumns"
                    min="0"
                    type="range"
                    @input="updateNumber('stickyLeftColumns', $event)"
                />
                <span class="table-control__value">
                    {{ settings.stickyLeftColumns }}
                </span>
            </label>

            <label class="table-control__field">
                <span class="table-control__label">Sticky right</span>
                <input
                    :max="maxStickyRight"
                    :value="settings.stickyRightColumns"
                    min="0"
                    type="range"
                    @input="updateNumber('stickyRightColumns', $event)"
                />
                <span class="table-control__value">
                    {{ settings.stickyRightColumns }}
                </span>
            </label>
        </div>

        <div class="table-control__row table-control__row--toggles">
            <label class="table-control__toggle">
                <input
                    :checked="settings.stickyHeaders"
                    type="checkbox"
                    @change="updateBoolean('stickyHeaders', $event)"
                />
                <span>Sticky headers</span>
            </label>

            <label class="table-control__toggle">
                <input
                    :checked="settings.verticalColumnLines"
                    type="checkbox"
                    @change="updateBoolean('verticalColumnLines', $event)"
                />
                <span>Column lines</span>
            </label>

            <label class="table-control__toggle">
                <input
                    :checked="settings.horizontalRowLines"
                    type="checkbox"
                    @change="updateBoolean('horizontalRowLines', $event)"
                />
                <span>Row lines</span>
            </label>

            <label class="table-control__toggle">
                <input
                    :checked="settings.zebraStriping"
                    type="checkbox"
                    @change="updateBoolean('zebraStriping', $event)"
                />
                <span>Zebra</span>
            </label>

            <label class="table-control__toggle">
                <input
                    :checked="settings.isCompactBodyRow"
                    type="checkbox"
                    @change="updateBoolean('isCompactBodyRow', $event)"
                />
                <span>Compact rows</span>
            </label>

            <label class="table-control__toggle">
                <input
                    :checked="settings.groupByDate"
                    type="checkbox"
                    @change="updateBoolean('groupByDate', $event)"
                />
                <span>Group by date</span>
            </label>
        </div>

        <div class="table-control__columns">
            <div class="table-control__label">Visible columns</div>

            <div class="table-control__columns-grid">
                <VisibilityToggle
                    v-for="entry in columns"
                    :key="entry.id"
                    :checked="entry.visible !== false"
                    :disabled="isVisibilityDisabled(entry)"
                    :label="entry.label"
                    variant="plain"
                    @change="emit('toggle-visibility', entry.field, $event)"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
.table-control {
    display: grid;
    gap: 8px;
    padding: 10px 12px;
    border: 1px solid #d9dce3;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(10px);
}

.table-control__row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: end;
}

.table-control__row--toggles {
    align-items: center;
}

.table-control__field {
    display: grid;
    gap: 4px;
    min-width: 0;
    width: fit-content;
}

.table-control__label {
    color: #64748b;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.table-control__field select,
.table-control__field input[type='range'] {
    margin: 0;
    width: 140px;
    max-width: 140px;
}

.table-control__value {
    color: #172033;
    font-size: 11px;
    font-weight: 700;
}

.table-control__toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    padding: 0 8px;
    border: 1px solid #d9dce3;
    background: #fff;
    color: #172033;
    font-size: 12px;
}

.table-control__toggle input {
    accent-color: #1267d6;
}

.table-control__columns {
    display: grid;
    gap: 6px;
}

.table-control__columns-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 8px;
}

.table-control__columns-grid :deep(.visibility-toggle) {
    width: fit-content;
    min-width: 0;
    min-height: 28px;
    padding: 2px 6px;
    gap: 8px;
    font-size: 12px;
}
</style>
