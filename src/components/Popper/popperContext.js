import { computed, inject, provide } from 'vue';
import {
    closeTopPopperInScope,
    isPopperScopeActive
} from './popperState.js';

const POPPER_SCOPE_KEY = 'POPPER-SCOPE';
const POPPER_PARENT_ID_KEY = 'POPPER-PARENT-ID';

export const usePopperParentId = () => inject(POPPER_PARENT_ID_KEY, null);
export const usePopperScopeId = () => inject(POPPER_SCOPE_KEY, null);

export const providePopperParentId = (id) => {
    provide(POPPER_PARENT_ID_KEY, id);
};

export const usePopperScope = (scopeId) => {
    provide(POPPER_SCOPE_KEY, scopeId);

    const isActivePopper = computed(() => isPopperScopeActive(scopeId));

    const closeActivePopper = () => {
        closeTopPopperInScope(scopeId);
    };

    return {
        isActivePopper,
        closeActivePopper
    };
};
