import { detectOverflow } from '@floating-ui/vue';

export const constrainToViewport = ({
    referenceDom,
    to,
    parentId,
    constrainPadding = 12,
    useBlockers = true,
    blockerNames = null,
    constrainBoundary = to,
    constrainDirection = 'both',
    detectOverflowPadding = null
} = {}) => {
    const resolveConstrainPadding = () => {
        const resolvedPadding = constrainPadding;

        if (typeof resolvedPadding === 'number') {
            return {
                top: resolvedPadding,
                bottom: resolvedPadding,
                left: resolvedPadding,
                right: resolvedPadding
            };
        }

        return {
            top: resolvedPadding?.top ?? 0,
            bottom: resolvedPadding?.bottom ?? 0,
            left: resolvedPadding?.left ?? 0,
            right: resolvedPadding?.right ?? 0
        };
    };

    const resolveToElement = () => {
        const resolvedTo = to;

        if (resolvedTo === 'reference') {
            return referenceDom ?? null;
        }

        if (resolvedTo instanceof Element) {
            return resolvedTo;
        }

        if (typeof resolvedTo === 'string' && resolvedTo !== 'body') {
            return document.querySelector(resolvedTo);
        }

        if (!resolvedTo || resolvedTo === 'body') {
            return document.body;
        }

        const resolvedParentId = parentId;
        if (resolvedParentId) {
            return document.querySelector(`#${resolvedParentId}`);
        }

        return null;
    };

    const resolveBoundaryElement = () => {
        const resolvedBoundary = constrainBoundary;

        if (!resolvedBoundary) {
            return resolveToElement();
        }

        if (resolvedBoundary === 'viewport') return 'viewport';

        if (resolvedBoundary === 'clippingAncestors') {
            return 'clippingAncestors';
        }

        if (resolvedBoundary === 'reference') {
            return referenceDom ?? null;
        }

        if (resolvedBoundary instanceof Element) return resolvedBoundary;

        if (typeof resolvedBoundary === 'string') {
            if (resolvedBoundary === 'body') return document.body;
            return document.querySelector(resolvedBoundary);
        }

        return resolveToElement();
    };

    const resolveBlockerPadding = (boundaryRect, floatingRectArg) => {
        if (!useBlockers) {
            return { top: 0, bottom: 0, left: 0, right: 0 };
        }

        let elements = Array.from(
            document.querySelectorAll('[data-popper-blocker]')
        );

        if (blockerNames?.length) {
            elements = elements.filter((element) =>
                blockerNames.includes(
                    element.getAttribute('data-popper-blocker')
                )
            );
        }

        if (!elements.length) return { top: 0, bottom: 0, left: 0, right: 0 };

        const boundaryBox = boundaryRect ?? {
            top: 0,
            bottom: window.innerHeight,
            left: 0,
            right: window.innerWidth,
            height: window.innerHeight
        };

        const topEdge = boundaryBox.top;
        const bottomEdge = boundaryBox.bottom;
        const midEdge = (topEdge + bottomEdge) / 2;

        const floatingRect = floatingRectArg;

        if (!floatingRect) return { top: 0, bottom: 0, left: 0, right: 0 };

        const floatLeft = floatingRect.left;
        const floatRight = floatingRect.right;

        let top = 0;
        let bottom = 0;

        elements.forEach((element) => {
            const rect = element.getBoundingClientRect();

            const intersectsVertical =
                rect.bottom > topEdge && rect.top < bottomEdge;
            if (!intersectsVertical) return;

            const intersectsHorizontal =
                rect.left < floatRight && rect.right > floatLeft;
            if (!intersectsHorizontal) return;

            const isTopBar = rect.bottom <= midEdge;
            const isBottomBar = rect.top >= midEdge;

            if (isTopBar) {
                top = Math.max(top, rect.bottom - topEdge);
            }

            if (isBottomBar) {
                bottom = Math.max(bottom, bottomEdge - rect.top);
            }
        });

        return { top, bottom, left: 0, right: 0 };
    };

    const resolveBoundaryOptions = () => {
        const boundary = resolveBoundaryElement();

        return {
            boundary: boundary ?? document.body,
            rootBoundary: 'viewport'
        };
    };

    return {
        name: 'constrainToViewport',
        async fn(state) {
            const padding = resolveConstrainPadding();
            const boundaryOptions = resolveBoundaryOptions();

            const floatingRect =
                state.elements?.floating?.getBoundingClientRect?.();
            const referenceRect =
                state.elements?.reference?.getBoundingClientRect?.();

            const boundaryRect =
                boundaryOptions.boundary instanceof Element
                    ? boundaryOptions.boundary.getBoundingClientRect()
                    : {
                          top: 0,
                          bottom: window.innerHeight,
                          height: window.innerHeight
                      };

            const blockerPadding = await resolveBlockerPadding(
                boundaryRect,
                floatingRect
            );

            const basePadding = {
                top: padding.top + blockerPadding.top,
                bottom: padding.bottom + blockerPadding.bottom,
                left: padding.left + blockerPadding.left,
                right: padding.right + blockerPadding.right
            };

            const overflowPadding = {
                ...basePadding,
                ...(detectOverflowPadding?.({
                    basePadding,
                    padding,
                    blockerPadding,
                    state
                }) ?? {})
            };

            const overflow = await detectOverflow(state, {
                ...boundaryOptions,
                padding: overflowPadding
            });

            let y = state.y;
            let x = state.x;
            if (overflow.right > 0) {
                x -= overflow.right;
            }

            if (overflow.left > 0) {
                x += overflow.left;
            }

            const direction = constrainDirection;
            if (overflow.bottom > 0 && direction !== 'bottom') {
                y -= overflow.bottom;
            }

            if (overflow.top > 0 && direction !== 'bottom') {
                y += overflow.top;
            }

            let maxHeight = Math.max(
                0,
                boundaryRect.height -
                    padding.top -
                    padding.bottom -
                    blockerPadding.top -
                    blockerPadding.bottom
            );

            if (constrainDirection === 'bottom') {
                const startY = floatingRect?.top ?? referenceRect?.bottom;

                if (startY != null) {
                    maxHeight = Math.max(
                        0,
                        boundaryRect.bottom -
                            padding.bottom -
                            blockerPadding.bottom -
                            startY
                    );
                }
            }

            if (state.elements?.floating) {
                state.elements.floating.style.maxHeight = `${maxHeight}px`;
                state.elements.floating.style.setProperty(
                    '--popper-max-height',
                    `${maxHeight}px`
                );
            }

            return { x, y };
        }
    };
};
