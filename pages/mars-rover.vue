<script lang="ts" setup>
const filters = computed<RoverPhotoFilters>(() => ({
  rover: 'curiosity' as const,
  camera: '' as RoverCamera,
  page: 1,
  ...(filterBySol.value ? { sol: sol.value } : { }),
  ...(!filterBySol.value ? { earthDate: earthDate.value } : { }),
}))

const filterBySol = ref<boolean>(true)
const earthDate = ref<Date>(new Date())
const sol = ref<number>(1000)

const { data, isPending, error } = useMarsRoverPhotos(filters)

const photos = computed(() => data.value?.photos || [])

const totalPages = ref(1)

function nextPage() {
  if (filters.value.page < totalPages.value) filters.value.page += 1
}

function prevPage() {
  if (filters.value.page > 1) filters.value.page -= 1
}

function resetPagination() {
  filters.value.page = 1
}

const rovers: { value: Rover, label: string }[] = [
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'opportunity', label: 'Opportunity' },
  { value: 'spirit', label: 'Spirit' },
]

const cameras: { value: RoverCamera, label: string }[] = [
  { value: 'ALL', label: 'All Cameras' },
  { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
  { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
  { value: 'MAST', label: 'Mast Camera' },
  { value: 'CHEMCAM', label: 'Chemistry and Camera Complex' },
  { value: 'MAHLI', label: 'Mars Hand Lens Imager' },
  { value: 'MARDI', label: 'Mars Descent Imager' },
  { value: 'NAVCAM', label: 'Navigation Camera' },
  { value: 'PANCAM', label: 'Panoramic Camera' },
  { value: 'MINITES', label: 'Miniature Thermal Emission Spectrometer' },
]

const availableCameras = computed(() => {
  const commonCameras = ['FHAZ', 'RHAZ', 'NAVCAM', 'ALL']
  const roverSpecificCameras = {
    curiosity: ['MAST', 'CHEMCAM', 'MAHLI', 'MARDI'],
    opportunity: ['PANCAM', 'MINITES'],
    spirit: ['PANCAM', 'MINITES'],
  }

  const validCameras = [...commonCameras, ...(roverSpecificCameras[filters.value.rover] || [])]

  return cameras.filter(camera => validCameras.includes(camera.value))
})

const todayFormatted = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})
</script>

<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 class="text-3xl font-bold tracking-tight">
          Mars Rover Photos
        </h2>
      </div>

      <UiCard class="w-full">
        <UiCardHeader>
          <UiCardTitle>Filter Photos</UiCardTitle>
          <UiCardDescription>
            Browse photos from NASA's Curiosity, Opportunity, and Spirit rovers
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="space-y-2">
              <UiLabel for="rover-select">
                Rover
              </UiLabel>
              <UiSelect
                v-model="filters.rover"
                @update:model-value="resetPagination"
              >
                <UiSelectTrigger id="rover-select">
                  <UiSelectValue placeholder="Select rover" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="rover in rovers"
                    :key="rover.value"
                    :value="rover.value"
                  >
                    {{ rover.label }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>

            <div class="space-y-2">
              <UiLabel for="camera-select">
                Camera
              </UiLabel>
              <UiSelect
                v-model="filters.camera"
                @update:model-value="resetPagination"
              >
                <UiSelectTrigger id="camera-select">
                  <UiSelectValue placeholder="Select camera" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="camera in availableCameras"
                    :key="camera.value"
                    :value="camera.value"
                  >
                    {{ camera.label }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>

            <div class="space-y-2">
              <UiLabel>Filter By</UiLabel>
              <UiToggleGroup
                v-model="filterBySol"
                type="single"
                class="justify-start"
              >
                <UiToggleGroupItem
                  :value="true"
                  aria-label="Filter by Sol"
                >
                  Sol
                </UiToggleGroupItem>
                <UiToggleGroupItem
                  :value="false"
                  aria-label="Filter by Earth Date"
                >
                  Earth Date
                </UiToggleGroupItem>
              </UiToggleGroup>
            </div>

            <div
              v-if="filterBySol"
              class="space-y-2"
            >
              <UiLabel for="sol-input">
                Martian Sol
              </UiLabel>
              <UiInput
                id="sol-input"
                v-model.number="sol"
                type="number"
                min="0"
                placeholder="Enter sol (e.g. 1000)"
                @change="resetPagination()"
              />
            </div>
            <div
              v-else
              class="space-y-2"
            >
              <UiLabel for="date-input">
                Earth Date
              </UiLabel>
              <UiInput
                id="date-input"
                v-model="earthDate"
                type="date"
                :max="todayFormatted"
                @change="resetPagination()"
              />
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard class="w-full">
        <UiCardHeader>
          <UiCardTitle>Results</UiCardTitle>
          <UiCardDescription>
            Page {{ filters.page }} · {{ photos.length }} photos found
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
            v-else-if="error"
            class="text-center py-12"
          >
            <Icon
              name="tabler:alert-triangle"
              class="size-12 mx-auto mb-4"
            />
            <p class="text-xl font-medium mb-2">
              Unable to load Mars rover photos
            </p>
            <p class="text-sm text-muted-foreground">
              {{ error }}
            </p>
          </div>
          <div
            v-else-if="photos.length === 0"
            class="text-center py-12"
          >
            <Icon
              name="tabler:photo-off"
              class="size-12 mx-auto mb-4"
            />
            <p class="text-xl font-medium">
              No photos found
            </p>
            <p class="text-sm text-muted-foreground">
              Try adjusting your filters
            </p>
          </div>
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <UiCard
              v-for="photo in photos"
              :key="photo.id"
              class="overflow-hidden h-full flex flex-col"
            >
              <img
                :src="photo.img_src"
                :alt="`Mars rover photo ${photo.id}`"
                class="h-48 w-full object-cover"
              >
              <UiCardContent class="p-4 flex-grow flex flex-col">
                <div class="flex justify-between items-start mt-2 mb-1">
                  <span class="text-sm font-medium">
                    Sol {{ photo.sol }}
                  </span>
                  <span class="text-xs text-muted-foreground">
                    {{ formatDate(new Date(photo.earth_date)) }}
                  </span>
                </div>
                <div class="text-xs text-muted-foreground mb-2">
                  {{ photo.camera.full_name }}
                </div>
                <div class="flex gap-2 mt-auto">
                  <UiTooltip>
                    <UiTooltipTrigger>
                      <UiBadge variant="outline">
                        <Icon
                          name="tabler:robot"
                          class="size-3 mr-1"
                        />
                        {{ photo.rover.name }}
                      </UiBadge>
                    </UiTooltipTrigger>
                    <UiTooltipContent>
                      <p>Rover: {{ photo.rover.name }}</p>
                      <p>Status: {{ photo.rover.status }}</p>
                      <p>Landed: {{ photo.rover.landing_date }}</p>
                    </UiTooltipContent>
                  </UiTooltip>
                  <UiTooltip>
                    <UiTooltipTrigger>
                      <UiBadge variant="outline">
                        <Icon
                          name="tabler:camera"
                          class="size-3 mr-1"
                        />
                        {{ photo.camera.name }}
                      </UiBadge>
                    </UiTooltipTrigger>
                    <UiTooltipContent>
                      {{ photo.camera.full_name }}
                    </UiTooltipContent>
                  </UiTooltip>
                </div>
              </UiCardContent>
            </UiCard>
          </div>

          <div
            v-if="photos.length > 0"
            class="flex justify-between items-center mt-6"
          >
            <UiButton
              variant="outline"
              size="sm"
              :disabled="filters.page <= 1"
              @click="prevPage"
            >
              Previous
            </UiButton>
            <span class="text-sm text-muted-foreground">
              Page {{ filters.page }}
            </span>
            <UiButton
              variant="outline"
              size="sm"
              :disabled="photos.length < 25"
              @click="nextPage"
            >
              Next
            </UiButton>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </NuxtLayout>
</template>
