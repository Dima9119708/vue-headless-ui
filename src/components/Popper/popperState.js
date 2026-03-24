import { ref } from 'vue';

export const popperStack = ref([]);

export const isPopperTopOfStack = (id) => popperStack.value[0]?.id === id;

export const isPopperScopeActive = (scopeId) =>
    popperStack.value.some((entry) => entry.scopeId === scopeId);

const getPopperById = (id) => popperStack.value.find((item) => item.id === id);

const isLockedByDisabledPopper = (id) => {
    const stack = popperStack.value;
    if (!stack.length) return false;

    const byId = new Map(stack.map((item) => [item.id, item]));

    return stack.some((item) => {
        if (!item.disableOutsideClose) return false;

        let current = item;

        while (current) {
            if (current.id === id) return true;
            if (!current.parentId) return false;
            current = byId.get(current.parentId) ?? null;
        }

        return false;
    });
};

export const registerPopper = ({
    id,
    parentId,
    scopeId,
    close,
    disableOutsideClose = false
}) => {
    const stack = popperStack.value;
    const index = stack.findIndex((item) => item.id === id);
    if (index !== -1) {
        stack.splice(index, 1);
    }
    stack.unshift({ id, parentId, scopeId, close, disableOutsideClose });
};

export const updatePopper = (id, patch = {}) => {
    const popper = getPopperById(id);
    if (!popper) return;

    Object.assign(popper, patch);
};

export const unregisterPopper = (id) => {
    const stack = popperStack.value;
    const index = stack.findIndex((item) => item.id === id);
    if (index !== -1) {
        stack.splice(index, 1);
    }
};

export const closePopperStackForOpen = ({
    parentId = null,
    currentId = null
} = {}) => {
    const stack = popperStack.value
        .slice()
        .filter((item) => item.id !== currentId);

    if (!stack.length) return;

    if (!parentId) {
        stack.forEach((item) => item.close?.());
        return;
    }

    const parentIndex = stack.findIndex((item) => item.id === parentId);

    if (parentIndex === -1) {
        stack.forEach((item) => item.close?.());
        return;
    }

    for (let i = 0; i < parentIndex; i += 1) {
        stack[i]?.close?.();
    }
};

export const closeTopPopperInScope = (scopeId) => {
    const item = popperStack.value.find((entry) => entry.scopeId === scopeId);
    item?.close?.();
};

export const canCloseByOutside = (id) => !isLockedByDisabledPopper(id);
