# Fork CauseNetwork rendering on mobile instead of relying on ReactFlow pan/zoom

CauseNetwork uses ReactFlow to render a 10-node, 11-edge causal graph across five
horizontal layers (~860px minimum width). On viewports under 620px, ReactFlow's
built-in pinch-zoom and pan technically work but make the graph effectively
unreadable — node labels are illegible at fit-zoom, and panning across a 5-layer
graph on a 375px screen loses the causal-depth metaphor the layout exists to
convey.

We render a separate mobile view inside the same component, gated by
`useMediaQuery("(max-width: 620px)")`: a flat list of node cards grouped by
layer header, with a sticky detail card showing description and outgoing/incoming
edges (with their mechanism labels) for the selected node. The four view-mode
buttons (surface / structural / feedback / policy) filter the list. Desktop
keeps the ReactFlow graph unchanged.

## Considered Options

- **Keep ReactFlow on mobile, lean on pinch-zoom.** Rejected: unreadable at fit,
  loses layer metaphor when panned, and edge mechanism labels are tiny even on
  desktop — they're unreadable on mobile.
- **Render as a Sankey-style vertical SVG flow.** Rejected as over-investment
  (~250 lines of bespoke SVG layout) for one section. Could revisit if the graph
  grows.
- **Layer accordion (collapsed-by-default sections).** Rejected: a causal map
  exists to be scanned; accordions force serial reading and hide structure.

## Consequences

- Two render paths in one component. Acceptable because the underlying state
  (`mode`, `selected`) is shared — only the presentation diverges.
- Edge labels become first-class text in the mobile detail card, which is
  arguably *more* readable than ReactFlow's tiny inline edge labels. Worth
  considering whether to surface these on desktop too in a future change.
