<script setup>

import { shallowRef, toRef, watchEffect } from "vue";

const props = defineProps({
  size: {
    type: Number,
    default: 40
  },
  offset: {
    type: Number,
    default: 0
  },
  hideScrollbar: {
    type: Boolean,
    default: false
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  visibility: {
    type: String,
    validator: (value) => ["auto", "both", "top", "bottom", "left", "right", "none"].includes(value),
    default: 'auto'
  },
  orientation: {
    type: String,
    default: 'vertical'
  }
})

const emit = defineEmits(['visibilityChange']);

const internalRef = shallowRef(null);

const visibility = toRef(() => props.visibility);
const orientation = toRef(() => props.orientation);
const offset = toRef(() => props.offset);
const isEnabled = toRef(() => props.isEnabled);
const hideScrollBar = toRef(() => props.hideScrollbar);

// Cache previous state to avoid unnecessary DOM updates
let prevStateRef = null
// Track pending RAF to avoid multiple scheduled updates
let rafIdRef = null;

const checkOverflow = () => {

  const el = internalRef.value;

  if (!el) return;

  const isVertical = orientation.value === "vertical";
  const scrollStart = isVertical ? el.scrollTop : el.scrollLeft;
  const scrollSize = isVertical ? el.scrollHeight : el.scrollWidth;
  const clientSize = isVertical ? el.clientHeight : el.clientWidth;

  const hasScrollBefore = scrollStart > offset.value;
  const hasScrollAfter = Math.ceil(scrollStart + clientSize) + offset.value < scrollSize;

  // Skip DOM updates if state hasn't changed
  const prevState = prevStateRef;

  if (
      prevState &&
      prevState.hasScrollBefore === hasScrollBefore &&
      prevState.hasScrollAfter === hasScrollAfter
  ) {
    return;
  }

  // Update state cache
  prevStateRef = { hasScrollBefore, hasScrollAfter };

  // Cancel previous pending update
  if (rafIdRef !== null) {
    cancelAnimationFrame(rafIdRef);
  }

  // Batch DOM updates with RAF for better performance
  rafIdRef = requestAnimationFrame(() => {
    rafIdRef = null;

    if (isVertical) {
      if (hasScrollBefore && hasScrollAfter) {
        el.dataset["topBottomScroll"] = "true";
        delete el.dataset["topScroll"];
        delete el.dataset["bottomScroll"];

        emit('visibilityChange', 'both');
      } else {
        el.dataset["topScroll"] = String(hasScrollBefore);
        el.dataset["bottomScroll"] = String(hasScrollAfter);
        delete el.dataset["topBottomScroll"];

        if (hasScrollBefore) {
          emit('visibilityChange', 'top')
        } else if (hasScrollAfter) {
          emit('visibilityChange', 'bottom')
        } else {
          emit('visibilityChange', 'none')
        }
      }
    } else {
      if (hasScrollBefore && hasScrollAfter) {
        el.dataset["leftRightScroll"] = "true";
        delete el.dataset["leftScroll"];
        delete el.dataset["rightScroll"];

        emit('visibilityChange', 'both');
      } else {
        el.dataset["leftScroll"] = String(hasScrollBefore);
        el.dataset["rightScroll"] = String(hasScrollAfter);
        delete el.dataset["leftRightScroll"];

        if (hasScrollBefore) {
          emit('visibilityChange', 'left')
        } else if (hasScrollAfter) {
          emit('visibilityChange', 'right')
        } else {
          emit('visibilityChange', 'none')
        }
      }
    }
  });
};

watchEffect(() => {
  const el = internalRef.value;

  if (!el || visibility.value === "auto") return;

  // Clear all data attributes
  delete el.dataset["topScroll"];
  delete el.dataset["bottomScroll"];
  delete el.dataset["topBottomScroll"];
  delete el.dataset["leftScroll"];
  delete el.dataset["rightScroll"];
  delete el.dataset["leftRightScroll"];

  // Set controlled visibility
  if (visibility.value === "both") {
    el.dataset[orientation.value === "vertical" ? "topBottomScroll" : "leftRightScroll"] = "true";
  } else if (visibility.value !== "none") {
    el.dataset[`${visibility.value}Scroll`] = "true";
  }
});

watchEffect((onCleanup) => {
  const el = internalRef.value;

  if (!el || !isEnabled.value || visibility.value !== "auto") return;

  // Initial check
  checkOverflow();

  // Use passive listener for better scroll performance
  el.addEventListener("scroll", checkOverflow, {
    passive: true
  });

  // Monitor size changes
  const resizeObserver = new ResizeObserver(checkOverflow);

  resizeObserver.observe(el);

  onCleanup(() => {
    el.removeEventListener("scroll", checkOverflow);
    resizeObserver.disconnect();

    // Cancel pending RAF and cleanup cache
    if (rafIdRef !== null) {
      cancelAnimationFrame(rafIdRef);
      rafIdRef = null;
    }

    prevStateRef = null;
  })
});

</script>

<template>
   <slot
       :ref="(r) => internalRef = r"
       :data-orientation="orientation"
       :data-scroll-shadow-size="size"
       :style="[{ '--scroll-shadow-size': `${size}px`, }]"
       :class="['scroll-shadow', {
         'scroll-shadow--hide-scrollbar': hideScrollBar,
         'scroll-shadow--horizontal': orientation === 'horizontal',
         'scroll-shadow--vertical': orientation === 'vertical',
       }]"
   />
</template>

<style>
.scroll-shadow {
  position: relative;
  --scroll-shadow-size: 40px;
}

.scroll-shadow--vertical {
  overflow-y: auto;
}

.scroll-shadow--horizontal {
  overflow-x: auto;
}

.scroll-shadow--vertical {
  &[data-top-scroll="true"] {
    --scroll-linear-gradient: 0deg, #000 calc(100% - var(--scroll-shadow-size)), transparent;

    mask-image: linear-gradient(var(--scroll-linear-gradient));
    -webkit-mask-image: linear-gradient(var(--scroll-linear-gradient));
  }

  &[data-bottom-scroll="true"] {
    --scroll-linear-gradient: 180deg, #000 calc(100% - var(--scroll-shadow-size)), transparent;

    mask-image: linear-gradient(var(--scroll-linear-gradient));
    -webkit-mask-image: linear-gradient(var(--scroll-linear-gradient));
  }

  &[data-top-bottom-scroll="true"] {
    --scroll-linear-gradient:
        #000, #000, transparent 0, #000 var(--scroll-shadow-size),
        #000 calc(100% - var(--scroll-shadow-size)), transparent;

    mask-image: linear-gradient(var(--scroll-linear-gradient));
    -webkit-mask-image: linear-gradient(var(--scroll-linear-gradient));
  }
}

.scroll-shadow--horizontal {
  &[data-left-scroll="true"] {
    --scroll-linear-gradient: 270deg, #000 calc(100% - var(--scroll-shadow-size)), transparent;

    mask-image: linear-gradient(var(--scroll-linear-gradient));
    -webkit-mask-image: linear-gradient(var(--scroll-linear-gradient));
  }

  &[data-right-scroll="true"] {
    --scroll-linear-gradient: 90deg, #000 calc(100% - var(--scroll-shadow-size)), transparent;

    mask-image: linear-gradient(var(--scroll-linear-gradient));
    -webkit-mask-image: linear-gradient(var(--scroll-linear-gradient));
  }

  &[data-left-right-scroll="true"] {
    --scroll-linear-gradient:
        to right, #000, #000, transparent 0, #000 var(--scroll-shadow-size),
        #000 calc(100% - var(--scroll-shadow-size)), transparent;

    mask-image: linear-gradient(var(--scroll-linear-gradient));
    -webkit-mask-image: linear-gradient(var(--scroll-linear-gradient));
  }
}

.scroll-shadow--hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>