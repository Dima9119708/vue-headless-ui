import { computed, isRef, toValue, useId, watch } from 'vue';
import {
    autoUpdate,
    flip,
    hide,
    offset,
    size,
    useFloating
} from '@floating-ui/vue';
import { onClickOutside, useEventListener } from '@vueuse/core';
import {
    canCloseByOutside,
    closePopperStackForOpen,
    isPopperTopOfStack,
    registerPopper,
    unregisterPopper,
    updatePopper
} from './popperState.js';
import {
    providePopperParentId,
    usePopperParentId,
    usePopperScopeId
} from './popperContext.js';
import {
    constrainToViewport as constrainToViewportMiddleware
} from './middleware/constrainToViewport.js';

const shouldClose = (handler, reason, event) => {
    if (!handler) return true;
    return handler(reason, event) !== false;
};

export const usePopperCore = ({
    open,
    referenceRef,
    floatingRef,
    to: toProp = 'body',
    placement: placementProp = 'bottom-start',
    offset: offsetProp = 0,
    flip: flipProp = {},
    options = {},
    fullWidth = false,
    constrainToViewport = false,
    constrainBoundary = toProp,
    constrainPadding = 12,
    useBlockers = true,
    blockerNames = null,
    animationFrame = false,
    hide: hideProp = true,
    constrainDirection = 'both',
    disableOutsideClose = false,
    closeOnOutside = true,
    closeOnEsc = true,
    onOutsideClose = null,
    onEscClose = null,
    onClose = null
} = {}) => {
    const id = useId();
    const parentId = usePopperParentId();
    const scopeId = usePopperScopeId();

    const resolveBleed = () => {
        const resolvedOffset = toValue(offsetProp);
        const offsetValue =
            resolvedOffset && typeof resolvedOffset === 'object'
                ? resolvedOffset
                : {};

        return toValue(fullWidth) && offsetValue.crossAxis
            ? Math.abs(offsetValue.crossAxis)
            : 0;
    };

    const offsetForFloating = computed(() => {
        const resolvedOffset = toValue(offsetProp);

        if (!toValue(fullWidth)) return resolvedOffset;

        if (resolvedOffset && typeof resolvedOffset === 'object') {
            return { ...resolvedOffset, crossAxis: 0 };
        }

        return resolvedOffset;
    });

    const { floatingStyles, middlewareData, placement, update } = useFloating(
        referenceRef,
        floatingRef,
        {
            open: computed(() => toValue(open)),
            middleware: computed(() => [
                offset(toValue(offsetForFloating)),
                ...(toValue(hideProp) !== false
                    ? [
                          hide(
                              typeof toValue(hideProp) === 'object'
                                  ? toValue(hideProp)
                                  : undefined
                          )
                      ]
                    : []),
                flip(toValue(flipProp)),
                ...(toValue(fullWidth)
                    ? [
                          size({
                              apply({ rects, elements }) {
                                  const bleed = resolveBleed();

                                  Object.assign(elements.floating.style, {
                                      width: `${
                                          rects.reference.width + bleed * 2
                                      }px`
                                  });
                              },
                              reset: { rects: true }
                          }),
                          {
                              name: 'fullWidthBleedShift',
                              fn(state) {
                                  const bleed = resolveBleed();
                                  if (!bleed) return {};

                                  const isVertical =
                                      state.placement.startsWith('top') ||
                                      state.placement.startsWith('bottom');

                                  return isVertical
                                      ? { x: state.x - bleed }
                                      : { y: state.y - bleed };
                              }
                          }
                      ]
                    : []),
                ...(toValue(constrainToViewport)
                    ? [
                          constrainToViewportMiddleware({
                              referenceDom: toValue(referenceRef),
                              to: toValue(toProp),
                              parentId: toValue(parentId),
                              constrainPadding: toValue(constrainPadding),
                              useBlockers: toValue(useBlockers),
                              blockerNames: toValue(blockerNames),
                              constrainBoundary: toValue(constrainBoundary),
                              constrainDirection: toValue(constrainDirection),
                              detectOverflowPadding: ({ basePadding }) => {
                                  const bleed = resolveBleed();
                                  if (!bleed) return {};

                                  return {
                                      left: basePadding.left + bleed,
                                      right: basePadding.right + bleed
                                  };
                              }
                          })
                      ]
                    : [])
            ]),
            placement: computed(() => toValue(placementProp)),
            ...(toValue(options) ?? {})
        }
    );

    const to = computed(() => {
        const resolvedTo = toValue(toProp);

        if (resolvedTo === 'reference') {
            return referenceRef?.value;
        }

        if (resolvedTo) {
            return resolvedTo;
        }

        const resolvedParentId = toValue(parentId);
        if (resolvedParentId) {
            return `#${resolvedParentId}`;
        }

        return 'body';
    });

    const closeSelf = () => {
        if (toValue(open) && isRef(open)) {
            open.value = false;
        }
    };

    watch([() => toValue(open), floatingRef], (openValue, _, onCleanup) => {
        let cleanUpAutoUpdate;
        let cleanUpOnClickOutside;
        let cleanUpEventListener;
        let didOpen = false;

        if (openValue && floatingRef?.value) {
            didOpen = true;
            const resolvedParentId = toValue(parentId);
            const resolvedScopeId = toValue(scopeId);

            closePopperStackForOpen({
                parentId: resolvedParentId,
                currentId: id
            });
            registerPopper({
                id,
                parentId: resolvedParentId,
                scopeId: resolvedScopeId,
                close: closeSelf,
                disableOutsideClose: toValue(disableOutsideClose)
            });

            cleanUpAutoUpdate = autoUpdate(
                referenceRef?.value,
                floatingRef.value,
                update,
                {
                    animationFrame: toValue(animationFrame)
                }
            );

            if (toValue(closeOnOutside)) {
                cleanUpOnClickOutside = onClickOutside(
                    floatingRef,
                    (event) => {
                        if (
                            isPopperTopOfStack(id) &&
                            canCloseByOutside(id) &&
                            shouldClose(onOutsideClose, 'outside', event)
                        ) {
                            if (isRef(open)) open.value = false;
                        }
                    },
                    {
                        ignore: [referenceRef]
                    }
                );
            }

            if (toValue(closeOnEsc)) {
                cleanUpEventListener = useEventListener(
                    document,
                    'keydown',
                    (event) => {
                        if (
                            event.key === 'Escape' &&
                            isPopperTopOfStack(id) &&
                            canCloseByOutside(id) &&
                            shouldClose(onEscClose, 'esc', event)
                        ) {
                            if (isRef(open)) open.value = false;
                        }
                    }
                );
            }
        }

        onCleanup(() => {
            cleanUpAutoUpdate?.();
            cleanUpOnClickOutside?.();
            cleanUpEventListener?.();
            unregisterPopper(id);
            if (didOpen) {
                onClose?.();
            }
        });
    });

    watch(
        () => toValue(disableOutsideClose),
        (isDisabled) => {
            if (!toValue(open)) return;
            updatePopper(id, { disableOutsideClose: !!isDisabled });
        }
    );

    watch(
        () => toValue(constrainToViewport),
        (enabled) => {
            if (!enabled && floatingRef?.value) {
                floatingRef.value.style.maxHeight = '';
            }
        }
    );

    providePopperParentId(id);

    return {
        id,
        parentId,
        scopeId,
        floatingStyles,
        middlewareData,
        placement,
        update,
        to,
        closeSelf
    };
};
