import { faker } from '@faker-js/faker';
import { computed, onBeforeUnmount, ref } from 'vue';

const ACTIVE_GROUP = 'active';
const COMPLETE_GROUP = 'complete';

const REGIONS = ['North Hub', 'Central Line', 'West Yard', 'South Dock'];
const PRIORITIES = ['Critical', 'High', 'Normal', 'Backlog'];
const CHANNELS = ['Direct', 'Partner', 'Marketplace', 'Internal'];
const PHASES = ['Discovery', 'Pilot', 'Rollout', 'Stabilizing'];
const RISKS = ['Low', 'Moderate', 'Elevated', 'Severe'];
const STATUS_OPTIONS = [
    { label: 'On track', tone: 'good' },
    { label: 'Watching', tone: 'warn' },
    { label: 'Blocked', tone: 'bad' },
    { label: 'Review', tone: 'info' }
];

const ACTIVE_DATE_BUCKETS = [
    '2026-02-18T00:00:00.000Z',
    '2026-01-27T00:00:00.000Z',
    '2026-01-12T00:00:00.000Z',
    '2025-12-09T00:00:00.000Z',
    '2025-11-21T00:00:00.000Z'
];

const COMPLETE_DATE_BUCKETS = [
    '2025-10-14T00:00:00.000Z',
    '2025-09-26T00:00:00.000Z',
    '2025-08-11T00:00:00.000Z',
    '2025-07-03T00:00:00.000Z'
];

const createBucketDate = (group, index) => {
    const buckets =
        group === ACTIVE_GROUP ? ACTIVE_DATE_BUCKETS : COMPLETE_DATE_BUCKETS;
    const bucketIndex = index % buckets.length;
    const baseDate = new Date(buckets[bucketIndex]);
    const nextDate = new Date(baseDate);

    nextDate.setUTCHours(
        faker.number.int({ min: 8, max: 17 }),
        faker.helpers.arrayElement([0, 15, 30, 45]),
        0,
        0
    );

    return nextDate;
};

const createRow = (index, group) => {
    const status = faker.helpers.arrayElement(STATUS_OPTIONS);
    const startsAt = createBucketDate(group, index);
    const health = faker.number.int({ min: 35, max: 98 });
    const budget = faker.number.int({ min: 18000, max: 450000 });
    const spend = faker.number.int({ min: 5000, max: budget });
    const project = `${faker.company.buzzNoun()} ${faker.company.buzzVerb()}`;
    const owner = faker.person.fullName();
    const updatedAt = faker.date.recent({ days: 14 });

    return {
        id: `${group}-${index}`,
        index,
        group,
        project,
        projectCode: faker.string.alphanumeric({ length: 6 }).toUpperCase(),
        owner,
        ownerInitials: owner
            .split(' ')
            .slice(0, 2)
            .map((part) => part[0])
            .join(''),
        status: status.label,
        statusTone: status.tone,
        startDate: startsAt.getTime(),
        startDateLabel: faker.date.weekday({ abbreviated: true }),
        health,
        budget,
        spend,
        region: faker.helpers.arrayElement(REGIONS),
        priority: faker.helpers.arrayElement(PRIORITIES),
        phase: faker.helpers.arrayElement(PHASES),
        risk: faker.helpers.arrayElement(RISKS),
        channel: faker.helpers.arrayElement(CHANNELS),
        teamSize: faker.number.int({ min: 3, max: 26 }),
        throughput: faker.number.int({ min: 18, max: 160 }),
        updatedAt: updatedAt.getTime(),
        summary: faker.company.catchPhrase()
    };
};

const compareValues = (left, right) => {
    if (typeof left === 'number' && typeof right === 'number') {
        return left - right;
    }

    return String(left).localeCompare(String(right));
};

export const createDemoColumns = () => [
    {
        id: 'project',
        field: 'project',
        label: 'Project',
        width: 260,
        minWidth: 220,
        sortable: true,
        cell: 'project'
    },
    {
        id: 'owner',
        field: 'owner',
        label: 'Owner',
        width: 190,
        minWidth: 180,
        sortable: true,
        cell: 'owner'
    },
    {
        id: 'status',
        field: 'status',
        label: 'Status',
        width: 140,
        minWidth: 130,
        sortable: true,
        cell: 'status'
    },
    {
        id: 'startDate',
        field: 'startDate',
        label: 'Start',
        width: 160,
        minWidth: 150,
        sortable: true,
        cell: 'date'
    },
    {
        id: 'health',
        field: 'health',
        label: 'Health',
        width: 150,
        minWidth: 140,
        sortable: true,
        cell: 'health'
    },
    {
        id: 'budget',
        field: 'budget',
        label: 'Budget',
        width: 140,
        minWidth: 130,
        sortable: true,
        cell: 'default',
        align: 'end',
        formatter: (value) =>
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(value)
    },
    {
        id: 'spend',
        field: 'spend',
        label: 'Spend',
        width: 150,
        minWidth: 140,
        sortable: true,
        cell: 'default',
        align: 'end',
        formatter: (value) =>
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(value)
    },
    {
        id: 'region',
        field: 'region',
        label: 'Region',
        width: 160,
        minWidth: 140,
        sortable: true,
        cell: 'default'
    },
    {
        id: 'phase',
        field: 'phase',
        label: 'Phase',
        width: 150,
        minWidth: 130,
        sortable: true,
        cell: 'default'
    },
    {
        id: 'priority',
        field: 'priority',
        label: 'Priority',
        width: 130,
        minWidth: 120,
        sortable: true,
        cell: 'default'
    },
    {
        id: 'risk',
        field: 'risk',
        label: 'Risk',
        width: 140,
        minWidth: 120,
        sortable: true,
        cell: 'default'
    },
    {
        id: 'channel',
        field: 'channel',
        label: 'Channel',
        width: 150,
        minWidth: 130,
        sortable: true,
        cell: 'default'
    },
    {
        id: 'teamSize',
        field: 'teamSize',
        label: 'Team',
        width: 110,
        minWidth: 96,
        sortable: true,
        cell: 'default',
        align: 'end'
    },
    {
        id: 'throughput',
        field: 'throughput',
        label: 'Throughput',
        width: 140,
        minWidth: 120,
        sortable: true,
        cell: 'default',
        align: 'end',
        formatter: (value) => `${value}/wk`
    },
    {
        id: 'updatedAt',
        field: 'updatedAt',
        label: 'Updated',
        width: 160,
        minWidth: 145,
        sortable: true,
        cell: 'default',
        formatter: (value) =>
            new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric'
            }).format(value)
    },
    {
        id: 'summary',
        field: 'summary',
        label: 'Summary',
        width: 360,
        minWidth: 280,
        sortable: false,
        cell: 'default'
    }
];

export const useTableDemoData = (sortState) => {
    const allRows = ref([]);
    const visibleCount = ref(14);
    const isLoading = ref(true);
    const isLoadingMore = ref(false);
    const timers = [];

    const sortedRows = computed(() => {
        const rows = allRows.value.slice();

        if (!sortState.value.field || sortState.value.direction === 'none') {
            return rows.sort((left, right) => left.index - right.index);
        }

        const factor = sortState.value.direction === 'asc' ? 1 : -1;
        return rows.sort(
            (left, right) =>
                compareValues(
                    left[sortState.value.field],
                    right[sortState.value.field]
                ) * factor
        );
    });

    const visibleRows = computed(() =>
        sortedRows.value.slice(0, visibleCount.value)
    );

    const activeRows = computed(() =>
        visibleRows.value.filter((row) => row.group === ACTIVE_GROUP)
    );
    const completeRows = computed(() =>
        visibleRows.value.filter((row) => row.group === COMPLETE_GROUP)
    );

    const hasNextData = computed(
        () => visibleCount.value < sortedRows.value.length
    );

    const loadInitialData = () => {
        const timer = window.setTimeout(() => {
            const active = Array.from({ length: 24 }, (_, index) =>
                createRow(index, ACTIVE_GROUP)
            );
            const complete = Array.from({ length: 18 }, (_, index) =>
                createRow(index + active.length, COMPLETE_GROUP)
            );

            allRows.value = [...active, ...complete];
            isLoading.value = false;
        }, 850);

        timers.push(timer);
    };

    const loadMore = () => {
        if (isLoading.value || isLoadingMore.value || !hasNextData.value) {
            return;
        }

        isLoadingMore.value = true;

        const timer = window.setTimeout(() => {
            visibleCount.value = Math.min(
                visibleCount.value + 8,
                allRows.value.length
            );
            isLoadingMore.value = false;
        }, 550);

        timers.push(timer);
    };

    loadInitialData();

    onBeforeUnmount(() => {
        timers.forEach((timer) => {
            window.clearTimeout(timer);
        });
    });

    return {
        activeRows,
        completeRows,
        hasNextData,
        isLoading,
        isLoadingMore,
        loadMore,
        visibleRows
    };
};
