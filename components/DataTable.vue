<script setup lang="ts">
import type { ColumnDef, PaginationState, Row, SortingState, TableOptions } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, getExpandedRowModel, useVueTable } from '@tanstack/vue-table'

const emit = defineEmits<{
  remove: [number[]]
  invalidate: []
}>()

const props = defineProps<{
  columns: ColumnDef<any, any>[]
  data: any[]
  loading: boolean
  options?: Partial<TableOptions<any>>
  expandedMarkup?: (row: Row<any>) => VNode
}>()

const globalFilter = ref<string>('')
const sorting = ref<SortingState>(props.options?.initialState?.sorting || [])
const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: 20 })

// Convert 0-based to 1-based for Radix
const internalPage = computed({
  get: () => pagination.value.pageIndex + 1,
  set: (value: number) => pagination.value.pageIndex = value - 1,
})

const table = useVueTable({
  ...props.options,
  data: computed(() => props.data),
  columns: props.columns,
  manualPagination: true,
  manualSorting: true,
  manualFiltering: true,
  getCoreRowModel: getCoreRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  getRowId: row => row.id,
  onSortingChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, sorting)
    pagination.value.pageIndex = 0
    emit('invalidate')
  },
  onGlobalFilterChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, globalFilter)
    pagination.value.pageIndex = 0
    emit('invalidate')
  },
  state: {
    get globalFilter() { return globalFilter.value },
    get pagination() { return pagination.value },
    get sorting() { return sorting.value },
  },
})

defineExpose({ vueTable: table })
</script>

<template>
  <div class="rounded-md border">
    <UiTable>
      <UiTableHeader>
        <UiTableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <UiTableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :data-pinned="header.column.getIsPinned()"
            :class="cn(
              { 'sticky bg-background/95': header.column.getIsPinned() },
              header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
              header.column.getCanSort() ? 'cursor-pointer select-none' : '',
            )"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <div
              class="flex items-center gap-2 w-fit"
              :class="{
                'bg-muted rounded-lg p-2 transition-all duration-300 text-foreground': header.column.getIsSorted(),
              }"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <Icon
                v-if="header.column.getIsSorted()"
                :name="`tabler:sort-${header.column.getIsSorted() === 'asc' ? 'ascending' : 'descending'}`"
                class="size-4"
              />
            </div>
          </UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <template v-if="table.getRowModel().rows?.length">
          <template
            v-for="row in table.getRowModel().rows"
            :key="row.id"
          >
            <UiTableRow :data-state="row.getIsSelected() && 'selected'">
              <UiTableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :data-pinned="cell.column.getIsPinned()"
                :class="cn(
                  { 'sticky bg-background/95': cell.column.getIsPinned() },
                  cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                )"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-if="expandedMarkup && row.getIsExpanded()">
              <UiTableCell :colspan="row.getAllCells().length">
                <FlexRender :render="expandedMarkup(row)" />
              </UiTableCell>
            </UiTableRow>
          </template>
        </template>
        <slot
          v-else-if="loading"
          name="loading"
        />
      </UiTableBody>
    </UiTable>
  </div>
  <div
    v-if="options?.pageCount && options.pageCount > 1"
    class="flex items-center gap-2 justify-end mt-4"
  >
    <UiPagination
      v-model:page="internalPage"
      :total="Math.max(1, (options?.pageCount || 0) * pagination.pageSize)"
      :items-per-page="pagination.pageSize"
      :disabled="loading"
    >
      <UiPaginationList class="flex items-center gap-6 w-fit">
        <div class="text-sm text-muted-foreground">
          {{ `Page ${internalPage} of ${Math.max(1, options?.pageCount || 0)}` }}
        </div>
        <div class="flex items-center gap-1">
          <UiPaginationFirst
            :disabled="!table.getCanPreviousPage()"
          />
          <UiPaginationPrev
            :disabled="!table.getCanPreviousPage()"
          />
          <UiPaginationNext
            :disabled="!table.getCanNextPage() || (options?.pageCount && options.pageCount <= 1)"
          />
          <UiPaginationLast
            :disabled="!table.getCanNextPage() || (options?.pageCount && options.pageCount <= 1)"
          />
        </div>
      </UiPaginationList>
    </UiPagination>
  </div>
</template>
