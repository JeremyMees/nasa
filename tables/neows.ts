import { createColumnHelper } from '@tanstack/vue-table'
import type { NearEarthObject } from '~/types/neows'
import { Icon } from '#components'

const columnHelper = createColumnHelper<NearEarthObject>()

export function generateColumns() {
  return [
    columnHelper.accessor('name', {
      enableGlobalFilter: false,
      header: 'Name',
      cell: ({ row }) => row.getValue('name'),
    }),
    columnHelper.accessor('id', {
      enableGlobalFilter: false,
      header: 'ID',
      cell: ({ row }) => row.getValue('id'),
    }),
    columnHelper.accessor('is_potentially_hazardous_asteroid', {
      enableGlobalFilter: false,
      header: 'Potentially hazardous',
      cell: ({ row }) => h(Icon, {
        name: `tabler:${row.getValue('is_potentially_hazardous_asteroid') ? 'check' : 'x'}`,
      }),
    }),
    columnHelper.accessor('is_sentry_object', {
      enableGlobalFilter: false,
      header: 'Sentry object',
      cell: ({ row }) => h(Icon, {
        name: `tabler:${row.getValue('is_sentry_object') ? 'check' : 'x'}`,
      }),
    }),
  ]
}

// export function expandedMarkup(row: Row<NoteRow>) {
//   return h('div', {
//     class: 'html-richtext max-h-[350px] sm:max-h-[600px] overflow-y-auto',
//     innerHTML: row.original.text,
//   })
// }

// export const initialState: InitialTableState = {
//   sorting: [{ id: 'created_at', desc: true }],
// }
