<script lang="ts" setup>
const { data: insightData, isPending } = useInsight()

const sols = computed(() => {
  if (!insightData.value?.sol_keys) return []
  return insightData.value.sol_keys
})

const latestSol = computed(() => {
  if (!sols.value.length) return null
  return sols.value[sols.value.length - 1]
})

const latestSolData = computed(() => {
  if (!latestSol.value || !insightData.value?.[latestSol.value]) return null
  return insightData.value[latestSol.value]
})
</script>

<template>
  <UiCard class="overflow-hidden flex flex-col">
    <UiCardHeader class="pb-0">
      <div class="flex items-center gap-2">
        <Icon
          name="tabler:temperature"
          class="size-5"
        />
        <UiCardTitle>Mars Weather</UiCardTitle>
      </div>
      <UiCardDescription>
        Latest weather data from Mars InSight lander
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="pt-6 grow">
      <div
        v-if="isPending"
        class="flex justify-center items-center py-6"
      >
        <Icon
          name="tabler:loader-2"
          class="size-8 animate-spin"
        />
      </div>
      <div
        v-else-if="!latestSolData"
        class="text-center py-6 text-sm text-muted-foreground"
      >
        No weather data available
      </div>
      <div
        v-else
        class="space-y-4"
      >
        <div class="flex justify-between items-center">
          <p class="font-medium">
            Sol {{ latestSol }}
          </p>
          <p class="text-sm text-muted-foreground">
            {{ latestSolData.Season || 'Unknown season' }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="border rounded-lg p-3">
            <div class="text-sm font-medium mb-1">
              Temperature
            </div>
            <div
              v-if="latestSolData.AT"
              class="text-xl font-bold"
            >
              {{ latestSolData.AT.av.toFixed(1) }}°C
            </div>
            <div
              v-else
              class="text-sm text-muted-foreground"
            >
              N/A
            </div>
          </div>

          <div class="border rounded-lg p-3">
            <div class="text-sm font-medium mb-1">
              Wind
            </div>
            <div
              v-if="latestSolData.HWS"
              class="text-xl font-bold"
            >
              {{ latestSolData.HWS.av.toFixed(1) }} m/s
            </div>
            <div
              v-else
              class="text-sm text-muted-foreground"
            >
              N/A
            </div>
          </div>
        </div>
      </div>
    </UiCardContent>
    <UiCardFooter>
      <NuxtLink
        to="/mars-weather"
        class="w-full"
      >
        <UiButton
          variant="outline"
          class="w-full"
        >
          <Icon
            name="tabler:external-link"
            class="size-4 mr-2"
          />
          View Detailed Weather
        </UiButton>
      </NuxtLink>
    </UiCardFooter>
  </UiCard>
</template>
