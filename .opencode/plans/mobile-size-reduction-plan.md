# Mobile Size Reduction Plan

## Goal
Reduce element sizes across all dashboard pages for ~430px viewport (iPhone Pro Max). Cards, padding, headings, table cells, stat icons, sidebar links, chat bubbles, gaps — all smaller on mobile while preserving desktop layout.

## Changes

### Global
- `src/components/layout/dashboard-shell.tsx`: `px-4 → px-3`, `pb-8 → pb-6` (inner content padding)

### Admin Pages
1. `src/app/admin/blog/page.tsx`: heading `text-2xl → text-xl`, card `p-4 → p-3`, `space-y-6 → space-y-4`
2. `src/app/admin/services/page.tsx`: heading `text-2xl → text-xl`, card `p-4 → p-3`, `gap-6 → gap-4`
3. `src/app/admin/contacts/page.tsx`: heading `text-2xl → text-xl`, card `p-4 → p-3`, `space-y-4 → space-y-3`
4. `src/app/admin/orders/page.tsx`: heading `text-2xl → text-xl`, table cells `px-4 → px-2 py-3 → py-2`
5. `src/app/admin/orders/[id]/page.tsx`: headings `text-lg → text-base`, `gap-6 → gap-4`, stat cards smaller
6. `src/app/admin/orders/[id]/chat-box.tsx`: `min-h-[150px] → min-h-[120px]`, gap reductions, `p-4 → p-3`
7. `src/app/admin/page.tsx`: stat card icons `h-6 w-6 → h-5 w-5`, `p-4 → p-3`, heading reductions

### Customer Pages
8. `src/app/customer/orders/page.tsx`: heading `text-2xl → text-xl`, `p-4 → p-3`, `space-y-4 → space-y-3`
9. `src/app/customer/orders/[id]/page.tsx`: heading `text-2xl → text-xl`, card `p-4 → p-3`, `space-y-6 → space-y-4`
10. `src/app/customer/page.tsx`: heading `text-2xl → text-xl`, `p-4 → p-3`, gap reductions

### Sidebar
11. `src/components/layout/sidebar.tsx`: link `px-3 → px-2`, `py-2.5 → py-2`, `gap-3 → gap-2`, icons `h-5 → h-4`, reduce font size

## Verification
- `npm run build` — 0 TS errors, 0 ESLint errors, all pages generated
