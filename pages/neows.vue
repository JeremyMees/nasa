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

    <!-- <div v-for="neows in data?.near_earth_objects">
      <div class="flex flex-row flex-wrap justify-between items-start gap-y-2">
        <p class="font-bold">{{ neows.name }}</p>
        <p class="text-xs">{{ neows.id }}</p>
      </div>

      <div class="text-xs flex flex-row flex-wrap gap-x-8 gap-y-2 pb-2 xl:justify-center">
        <KeyValue
          keyWord="Potential hazardous"
          :value="neows.is_potentially_hazardous_asteroid ? 'Yes' : 'No'"
        />
        <KeyValue
          keyWord="Sentry astroid"
          :value="neows.is_sentry_object ? 'Yes' : 'No'"
        />
        <KeyValue
          keyWord="Absolute magnitude"
          :value="neows.absolute_magnitude_h"
        />
        <KeyValue
          keyWord="Designation"
          :value="neows.designation"
        />

        <div class="flex flex-row flex-wrap gap-2">
          <span class="font-bold">Estimated diameter:</span>
          <div class="flex flex-row flex-wrap gap-1">
            <Icon name="tabler:minus" class="size-4" />
            <span>
              {{ neows.estimated_diameter[unit].estimated_diameter_min.toFixed(2) }} {{ getUnitAbbreviation(unit) }}
            </span>
          </div>
          <div class="flex flex-row flex-wrap gap-1">
            <Icon name="tabler:plus" class="size-4" />
            <span>
              {{ neows.estimated_diameter[unit].estimated_diameter_max.toFixed(2) }} {{ getUnitAbbreviation(unit) }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap gap-2 w-full items-start justify-center">
        <CloseApproach class="w-full" :approach="neows.close_approach_data" />
        <OrbitalData class="w-full" :orbit="neows.orbital_data" />
      </div>
    </div> -->
  </NuxtLayout>
</template>
