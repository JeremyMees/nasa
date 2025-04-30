<script lang="ts" setup>
const { data, isPending, error, refetch } = useInsight()

const sols = computed(() => {
  if (!data.value?.sol_keys) return []
  return data.value.sol_keys
})

const latestSol = computed(() => {
  if (!sols.value.length) return null
  return sols.value[sols.value.length - 1]
})

const latestSolData = computed(() => {
  if (!latestSol.value || !data.value?.[latestSol.value]) return null
  return data.value[latestSol.value]
})

const lastUpdateDate = computed(() => {
  if (!latestSolData.value?.Last_UTC) return 'Unknown'
  return new Date(latestSolData.value.Last_UTC).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>

<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 class="text-3xl font-bold tracking-tight">
          Mars Weather
        </h2>
      </div>

      <UiCard class="w-full">
        <UiCardHeader>
          <UiCardTitle>InSight Mars Weather Station</UiCardTitle>
          <UiCardDescription>
            Weather data from NASA's InSight Mars lander at Elysium Planitia
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div
            v-if="isPending"
            class="flex justify-center items-center py-12"
          >
            <Icon
              name="tabler:loader-2"
              class="size-12 animate-spin"
            />
          </div>

          <div
            v-else-if="error || !data"
            class="text-center py-12"
          >
            <Icon
              name="tabler:alert-triangle"
              class="size-12 mx-auto mb-4 text-yellow-500"
            />
            <p class="text-xl font-medium mb-2">
              Unable to load Mars weather data
            </p>
            <p class="text-sm text-muted-foreground">
              The InSight API may be temporarily unavailable or the API key may need to be configured.
            </p>
          </div>

          <div
            v-else-if="!sols.length"
            class="text-center py-12"
          >
            <Icon
              name="tabler:info-circle"
              class="size-12 mx-auto mb-4"
            />
            <p class="text-xl font-medium">
              No weather data available
            </p>
          </div>

          <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Latest Sol Weather Card -->
              <div>
                <div class="flex items-center gap-2 pb-3">
                  <Icon
                    name="tabler:calendar"
                    class="size-5"
                  />
                  <h3 class="text-lg font-semibold">
                    Sol {{ latestSol }} (Latest)
                  </h3>
                </div>
                <p class="text-sm text-muted-foreground">
                  Last updated: {{ lastUpdateDate }}
                </p>
                <p class="text-sm text-muted-foreground">
                  Season: {{ latestSolData?.Season || 'Unknown' }}
                </p>

                <div class="grid grid-cols-2 gap-4 mt-4">
                  <!-- Temperature -->
                  <div class="border rounded-lg p-4">
                    <div class="flex items-center gap-2 mb-2">
                      <Icon
                        name="tabler:temperature"
                        class="size-5"
                      />
                      <h4 class="font-medium">
                        Temperature
                      </h4>
                    </div>
                    <div v-if="latestSolData?.AT">
                      <p class="text-2xl font-bold">
                        {{ latestSolData.AT.av.toFixed(1) }}°C
                      </p>
                      <p class="text-sm font-medium">
                        {{ celsiusToFahrenheit(latestSolData.AT.av).toFixed(1) }}°F
                      </p>
                      <div class="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Min: {{ latestSolData.AT.mn.toFixed(1) }}°C</span>
                        <span>Max: {{ latestSolData.AT.mx.toFixed(1) }}°C</span>
                      </div>
                    </div>
                    <p
                      v-else
                      class="text-sm text-muted-foreground"
                    >
                      No temperature data available
                    </p>
                  </div>

                  <!-- Wind -->
                  <div class="border rounded-lg p-4">
                    <div class="flex items-center gap-2 mb-2">
                      <Icon
                        name="tabler:wind"
                        class="size-5"
                      />
                      <h4 class="font-medium">
                        Wind
                      </h4>
                    </div>
                    <div v-if="latestSolData?.HWS">
                      <p class="text-2xl font-bold">
                        {{ latestSolData.HWS.av.toFixed(1) }} m/s
                      </p>
                      <p class="text-sm font-medium">
                        {{ (latestSolData.HWS.av * 2.237).toFixed(1) }} mph
                      </p>
                      <div class="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Min: {{ latestSolData.HWS.mn.toFixed(1) }} m/s</span>
                        <span>Max: {{ latestSolData.HWS.mx.toFixed(1) }} m/s</span>
                      </div>
                    </div>
                    <p
                      v-else
                      class="text-sm text-muted-foreground"
                    >
                      No wind data available
                    </p>
                  </div>

                  <!-- Pressure -->
                  <div class="border rounded-lg p-4">
                    <div class="flex items-center gap-2 mb-2">
                      <Icon
                        name="tabler:gauge"
                        class="size-5"
                      />
                      <h4 class="font-medium">
                        Pressure
                      </h4>
                    </div>
                    <div v-if="latestSolData?.PRE">
                      <p class="text-2xl font-bold">
                        {{ latestSolData.PRE.av.toFixed(1) }} Pa
                      </p>
                      <p class="text-sm text-muted-foreground mt-2">
                        {{ (latestSolData.PRE.av / 101325 * 1000).toFixed(2) }} mbar
                      </p>
                    </div>
                    <p
                      v-else
                      class="text-sm text-muted-foreground"
                    >
                      No pressure data available
                    </p>
                  </div>

                  <!-- Wind Direction -->
                  <div class="border rounded-lg p-4">
                    <div class="flex items-center gap-2 mb-2">
                      <Icon
                        name="tabler:compass"
                        class="size-5"
                      />
                      <h4 class="font-medium">
                        Wind Direction
                      </h4>
                    </div>
                    <div v-if="latestSolData?.WD">
                      <p class="text-2xl font-bold">
                        {{ latestSolData.WD.compass_point || 'N/A' }}
                      </p>
                      <p class="text-sm text-muted-foreground mt-2">
                        {{ latestSolData.WD.compass_degrees || 0 }}°
                      </p>
                    </div>
                    <p
                      v-else
                      class="text-sm text-muted-foreground"
                    >
                      No wind direction data available
                    </p>
                  </div>
                </div>
              </div>

              <!-- History/Chart section -->
              <div class="border rounded-lg p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon
                    name="tabler:chart-line"
                    class="size-5"
                  />
                  Recent Weather History
                </h3>
                <div class="space-y-4">
                  <div
                    v-for="sol in sols.slice().reverse()"
                    :key="sol"
                    class="border-b pb-2 last:border-b-0"
                  >
                    <div class="flex justify-between">
                      <p class="font-medium">
                        Sol {{ sol }}
                      </p>
                      <p
                        v-if="data[sol]?.AT"
                        class="text-sm"
                      >
                        {{ data[sol].AT.av.toFixed(1) }}°C
                      </p>
                      <p
                        v-else
                        class="text-sm text-muted-foreground"
                      >
                        N/A
                      </p>
                    </div>
                    <div class="flex text-xs text-muted-foreground">
                      <p
                        v-if="data[sol]?.Season"
                        class="mr-4"
                      >
                        {{ data[sol].Season }}
                      </p>
                      <p v-if="data[sol]?.Last_UTC">
                        {{ new Date(data[sol].Last_UTC).toLocaleDateString() }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
        <UiCardFooter>
          <p class="text-xs text-muted-foreground">
            Data provided by NASA's InSight Mission. The InSight lander takes continuous weather measurements on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars' equator.
          </p>
        </UiCardFooter>
      </UiCard>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>About Mars Weather</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium mb-2">
                Understanding the Data
              </h3>
              <ul class="space-y-1 text-sm">
                <li><strong>Sol:</strong><span class="text-muted-foreground"> Martian day, approximately 24 hours and 37 minutes</span></li>
                <li><strong>AT:</strong><span class="text-muted-foreground"> Air temperature in Celsius</span></li>
                <li><strong>HWS:</strong><span class="text-muted-foreground"> Horizontal wind speed in meters per second</span></li>
                <li><strong>PRE:</strong><span class="text-muted-foreground"> Atmospheric pressure in Pascals</span></li>
                <li><strong>WD:</strong><span class="text-muted-foreground"> Wind direction (compass point and degrees)</span></li>
                <li><strong>Season:</strong><span class="text-muted-foreground"> Martian season at the InSight landing site</span></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-medium mb-2">
                About InSight
              </h3>
              <p class="text-sm mb-2 text-muted-foreground">
                NASA's InSight (Interior Exploration using Seismic Investigations, Geodesy and Heat Transport) is a Mars lander designed to study the "inner space" of Mars: its crust, mantle, and core.
              </p>
              <p class="text-sm text-muted-foreground">
                The lander's weather sensors are called the Temperature and Wind for InSight (TWINS) instrument, which was provided by Spain's Centro de Astrobiología.
              </p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </NuxtLayout>
</template>
