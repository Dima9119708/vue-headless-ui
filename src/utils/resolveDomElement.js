// Normalize refs that can be Vue instances or DOM nodes into a single Element.
// Keeps slot ref wiring consistent and only warns when a non-null value
// can't be resolved to an Element (null during mount/unmount is ignored).
const isElementNode = (value) => Boolean(value && value.nodeType === 1);

export const resolveDomElement = (target, { onResolved, label } = {}) => {
    if (target == null) {
        onResolved?.(null);
        return null;
    }

    const candidate = target?.$el ?? target;

    if (isElementNode(candidate)) {
        onResolved?.(candidate);
        return candidate;
    }

    const prefix = label ? `${label}: ` : '';
    console.error(
        `${prefix}Unable to attach to a DOM element. Wrap content in a single element or expose a DOM element via defineExpose.`,
        candidate
    );

    onResolved?.(null);
    return null;
};
