import { inject } from 'vue';

export const tableContextKey = Symbol('table-context');
export const tableHeadCellContextKey = Symbol('table-head-cell-context');
export const tableAccordionContextKey = Symbol('table-accordion-context');
export const tableRowContextKey = Symbol('table-row-context');

export const useTableContext = () => {
    const context = inject(tableContextKey, null);

    if (!context) {
        throw new Error('Table components must be used inside Table.vue.');
    }

    return context;
};

export const useTableHeadCellContext = () => {
    const context = inject(tableHeadCellContextKey, null);

    if (!context) {
        throw new Error(
            'TableCellResize must be used inside TableHeadCell.vue.'
        );
    }

    return context;
};

export const useTableAccordionContext = () => {
    const context = inject(tableAccordionContextKey, null);

    if (!context) {
        throw new Error(
            'TableAccordion components must be used inside TableAccordionRoot.vue.'
        );
    }

    return context;
};

export const useTableRowContext = () => {
    const context = inject(tableRowContextKey, null);

    if (!context) {
        throw new Error('Table row context is not available.');
    }

    return context;
};
