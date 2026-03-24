export const demoOptionSets = {
    large: [
        { id: 'large-1', label: 'Overview', hint: 'selected + start slot', selected: true, start: '&#9632;' },
        { id: 'large-2', label: 'Analytics', hint: 'variant: primary + start + end', variant: 'primary', start: '&#9679;', end: '&#8250;' },
        { id: 'large-3', label: 'Members', hint: 'default + end slot', end: '&#8942;' },
        { id: 'large-4', label: 'Billing', hint: 'disabled + end slot', disabled: true, end: '&#128274;' },
        { id: 'large-5', label: 'Danger zone', hint: 'variant: danger + start slot', variant: 'danger', start: '&#9888;' },
        { id: 'large-6', label: 'Deploy', hint: 'variant: primary + start + end', variant: 'primary', start: '&#9654;', end: '&#11014;' },
        { id: 'large-7', label: 'Export', hint: 'default + start slot', start: '&#8681;' },
        { id: 'large-8', label: 'Archive', hint: 'variant: danger + end slot', variant: 'danger', end: '&#10006;' },
        { id: 'large-9', label: 'Invites', hint: 'default + selected', selected: true, start: '&#9993;' },
        { id: 'large-10', label: 'Webhooks', hint: 'default + start + end', start: '&#8644;', end: '&#8250;' },
        { id: 'large-11', label: 'Secrets', hint: 'disabled + start slot', disabled: true, start: '&#128274;' },
        { id: 'large-12', label: 'Rollback', hint: 'variant: danger + selected', variant: 'danger', selected: true, end: '&#8630;' },
        { id: 'large-13', label: 'Sync nodes', hint: 'variant: primary + selected', variant: 'primary', selected: true, start: '&#8635;' },
        { id: 'large-14', label: 'Console logs', hint: 'default + both slots', start: '&#62;_', end: '&#8942;' }
    ],
    topEdge: [
        { id: 'te-1', label: 'Upper edge anchor', hint: 'selected + constrained upward', selected: true, start: '&#8593;' },
        { id: 'te-2', label: 'Flip fallback check', hint: 'variant: primary + near top edge', variant: 'primary', end: '&#8250;' },
        { id: 'te-3', label: 'Viewport clamp', hint: 'default + start slot', start: '&#8645;' },
        { id: 'te-4', label: 'Overflow pressure', hint: 'variant: danger + end slot', variant: 'danger', end: '&#9888;' }
    ],
    cornerEdge: [
        { id: 'ce-1', label: 'Corner trigger', hint: 'selected + right/bottom pressure', selected: true, start: '&#9701;' },
        { id: 'ce-2', label: 'Horizontal clamp', hint: 'variant: primary + edge alignment', variant: 'primary', end: '&#8594;' },
        { id: 'ce-3', label: 'Bottom overflow check', hint: 'default + start slot', start: '&#8595;' },
        { id: 'ce-4', label: 'Tight viewport', hint: 'variant: danger + end slot', variant: 'danger', end: '&#10006;' }
    ],
    fullWidth: [
        { id: 'fw-1', label: 'Tracks trigger width', hint: 'selected + fullWidth enabled', selected: true, start: '&#8596;' },
        { id: 'fw-2', label: 'Cross-axis bleed', hint: 'variant: primary + width stress', variant: 'primary', end: '&#8250;' },
        { id: 'fw-3', label: 'Viewport clamp still applies', hint: 'default + start slot', start: '&#9633;' },
        { id: 'fw-4', label: 'Long row label for wrapping', hint: 'variant: danger + edge pressure', variant: 'danger', end: '&#9888;' }
    ],
    obstacle: [
        { id: 'obs-1', label: 'Moving header check', hint: 'selected + start slot', selected: true, start: '&#8646;' },
        { id: 'obs-2', label: 'Track overlap', hint: 'variant: primary + start + end', variant: 'primary', start: '&#8596;', end: '&#8250;' },
        { id: 'obs-3', label: 'Shrink viewport', hint: 'variant: danger + end slot', variant: 'danger', end: '&#9888;' },
        { id: 'obs-4', label: 'Keep scrolling', hint: 'default + start slot', start: '&#8942;' },
        { id: 'obs-5', label: 'Locked command', hint: 'disabled + end slot', disabled: true, end: '&#128274;' },
        { id: 'obs-6', label: 'Bottom marker', hint: 'variant: primary + start slot', variant: 'primary', start: '&#9662;' },
        { id: 'obs-7', label: 'Center pressure', hint: 'default + selected + end', selected: true, end: '&#8250;' },
        { id: 'obs-8', label: 'Exit channel', hint: 'variant: danger + start + end', variant: 'danger', start: '&#9888;', end: '&#10006;' },
        { id: 'obs-9', label: 'Lock viewport', hint: 'disabled + start slot', disabled: true, start: '&#128274;' },
        { id: 'obs-10', label: 'Named track', hint: 'variant: primary + selected', variant: 'primary', selected: true, start: '&#8597;' }
    ],
    drag: [
        { id: 'drag-1', label: 'Drag top blocker', hint: 'default + start slot', start: '&#8596;' },
        { id: 'drag-2', label: 'Drag bottom blocker', hint: 'default + start + end', start: '&#8596;', end: '&#8250;' },
        { id: 'drag-3', label: 'Selected row', hint: 'selected only', selected: true },
        { id: 'drag-4', label: 'Primary shortcut', hint: 'variant: primary + end slot', variant: 'primary', end: '&#10003;' },
        { id: 'drag-5', label: 'Danger shortcut', hint: 'variant: danger + start slot', variant: 'danger', start: '&#9888;' },
        { id: 'drag-6', label: 'Axis lock', hint: 'disabled + start slot', disabled: true, start: '&#8594;' },
        { id: 'drag-7', label: 'Drop marker', hint: 'variant: primary + selected', variant: 'primary', selected: true, end: '&#8250;' }
    ],
    sidebarGlobal: [
        { id: 'sg-1', label: 'Global context', hint: 'selected + start slot', selected: true, start: '&#9632;' },
        { id: 'sg-2', label: 'Main action', hint: 'variant: primary + end slot', variant: 'primary', end: '&#8250;' },
        { id: 'sg-3', label: 'Fallback item', hint: 'default + start slot', start: '&#8942;' },
        { id: 'sg-4', label: 'Danger cleanup', hint: 'variant: danger + end slot', variant: 'danger', end: '&#10006;' },
        { id: 'sg-5', label: 'Header spacing', hint: 'default + both slots', start: '&#9633;', end: '&#8250;' },
        { id: 'sg-6', label: 'Bottom menu edge', hint: 'selected + end slot', selected: true, end: '&#9662;' },
        { id: 'sg-7', label: 'Header overlap check', hint: 'default + start slot', start: '&#8593;' },
        { id: 'sg-8', label: 'Primary action B', hint: 'variant: primary + start + end', variant: 'primary', start: '&#9733;', end: '&#8250;' },
        { id: 'sg-9', label: 'Danger cleanup B', hint: 'variant: danger + selected', variant: 'danger', selected: true, end: '&#10006;' },
        { id: 'sg-10', label: 'Viewport filler', hint: 'default + end slot', end: '&#8942;' },
        { id: 'sg-11', label: 'Disabled blocker demo', hint: 'disabled + start slot', disabled: true, start: '&#128274;' },
        { id: 'sg-12', label: 'Last visible row', hint: 'variant: primary + selected', variant: 'primary', selected: true, start: '&#9654;' }
    ],
    sidebarOuter: [
        { id: 'so-1', label: 'Full sidebar scope', hint: 'selected + start slot', selected: true, start: '&#9724;' },
        { id: 'so-2', label: 'Primary inside shell', hint: 'variant: primary + start slot', variant: 'primary', start: '&#9654;' },
        { id: 'so-3', label: 'Secondary info', hint: 'default + end slot', end: '&#8250;' },
        { id: 'so-4', label: 'Disabled row', hint: 'disabled + end slot', disabled: true, end: '&#128274;' },
        { id: 'so-5', label: 'Danger shell action', hint: 'variant: danger + start slot', variant: 'danger', start: '&#9888;' },
        { id: 'so-6', label: 'Stretch marker', hint: 'default + selected + end', selected: true, end: '&#8597;' },
        { id: 'so-7', label: 'Quick action', hint: 'variant: primary + both slots', variant: 'primary', start: '&#9733;', end: '&#8250;' },
        { id: 'so-8', label: 'Archive shell', hint: 'variant: danger + selected', variant: 'danger', selected: true, start: '&#10006;' }
    ],
    sidebarInner: [
        { id: 'si-1', label: 'Named blockers only', hint: 'selected + start slot', selected: true, start: '&#9632;' },
        { id: 'si-2', label: 'Primary local action', hint: 'variant: primary + end slot', variant: 'primary', end: '&#8250;' },
        { id: 'si-3', label: 'Context split', hint: 'default + start slot', start: '&#8644;' },
        { id: 'si-4', label: 'Danger local action', hint: 'variant: danger + end slot', variant: 'danger', end: '&#9888;' },
        { id: 'si-5', label: 'Disabled local row', hint: 'disabled only', disabled: true },
        { id: 'si-6', label: 'Header aware', hint: 'selected + end slot', selected: true, end: '&#8593;' },
        { id: 'si-7', label: 'Footer aware', hint: 'variant: primary + start slot', variant: 'primary', start: '&#8595;' },
        { id: 'si-8', label: 'Critical local task', hint: 'variant: danger + start + end', variant: 'danger', start: '&#9888;', end: '&#10006;' }
    ],
    sidebarBottom: [
        { id: 'sb-1', label: 'Bottom locked placement', hint: 'selected + stays below trigger', selected: true, start: '&#9662;' },
        { id: 'sb-2', label: 'Flip disabled', hint: 'variant: primary + no jump to top', variant: 'primary', end: '&#8250;' },
        { id: 'sb-3', label: 'Scroll stress test', hint: 'default + start slot', start: '&#8645;' },
        { id: 'sb-4', label: 'Bottom max-height', hint: 'default + end slot', end: '&#8595;' },
        { id: 'sb-5', label: 'Named blockers still apply', hint: 'variant: danger + start slot', variant: 'danger', start: '&#9888;' }
    ]
};

export const sidebarScrollSections = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: `Sidebar section ${index + 1}`,
    text: 'Extra scroll content inside the sidebar layout to verify how nested poppers behave while the shell content is scrolling.'
}));
