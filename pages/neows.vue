<script lang="ts" setup>
import type { DataTable } from '#components'
import { generateColumns } from '~/tables/neows'

const table = ref<InstanceType<typeof DataTable>>()

const { data, isPending } = useNeows(computed(() => {
  const pagination = table.value?.vueTable.getState().pagination
  return {
    page: pagination ? pagination.pageIndex + 1 : 1,
    size: 20,
  }
}))

const columns = generateColumns()
</script>

<template>
  <NuxtLayout>
    <h2 class="text-3xl font-bold tracking-tight mb-6">
      Near Earth Objects
    </h2>

    <DataTable
      ref="table"
      :columns="columns"
      :data="data?.near_earth_objects ?? []"
      :loading="isPending"
    />
  </NuxtLayout>
</template>
