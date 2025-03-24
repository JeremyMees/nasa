<script lang="ts" setup>
import { formatDate } from '~/utils/helper'

const today = formatDate(new Date())
const currentDate = ref(today)

const { data, isPending, refetch } = useAPOD(computed(() => ({
  date: currentDate.value,
})))

function previousDay() {
  const date = new Date(currentDate.value)
  date.setDate(date.getDate() - 1)
  currentDate.value = formatDate(date)
  refetch()
}

function nextDay() {
  const date = new Date(currentDate.value)
  date.setDate(date.getDate() + 1)
  const formattedDate = formatDate(date)
  if (formattedDate <= today) {
    currentDate.value = formattedDate
    refetch()
  }
}
</script>

<template>
  <NuxtLayout>
    <h2 class="text-3xl font-bold tracking-tight">
      Astronomy Picture of the Day
    </h2>
    <p class="text-sm text-muted-foreground mb-6">
      {{ currentDate }}
    </p>

    <div class="max-w-[1000px] mx-auto">
      <UiCard class="overflow-hidden mx-auto">
        <UiSkeleton
          v-if="isPending"
          class="h-[200px] aspect-video"
        />
        <NuxtImg
          v-else-if="data?.url || data?.thumbnail_url"
          :src="data?.url || data?.thumbnail_url"
          class="w-full aspect-video"
        />
        <UiCardHeader class="min-w-[200px]">
          <UiCardTitle>
            <UiSkeleton
              v-if="isPending"
              class="w-[200px] h-7"
            />
            <span v-else-if="data?.title">
              {{ data?.title }}
            </span>
          </UiCardTitle>
          <div
            v-if="data?.copyright"
            class="flex items-center gap-1"
          >
            <Icon
              name="tabler:copyright"
              class="size-4"
            />
            <span class="text-sm text-muted-foreground">
              {{ data?.copyright }}
            </span>
          </div>
          <UiCardDescription>
            <UiSkeleton
              v-if="isPending"
              class="w-full h-[140px]"
            />
            <span v-else-if="data?.explanation">
              {{ data?.explanation }}
            </span>
          </UiCardDescription>
        </UiCardHeader>
      </UiCard>

      <div class="flex items-center justify-end gap-2 mt-2">
        <UiButton
          size="icon"
          :disabled="isPending"
          class="absolute lg:relative top-1/2 lg:top-0 -translate-y-1/2 lg:translate-y-0 left-0"
          @click="previousDay"
        >
          <Icon
            name="tabler:chevron-left"
            class="size-4"
          />
        </UiButton>
        <UiButton
          size="icon"
          :disabled="isPending || currentDate === today"
          class="absolute lg:relative top-1/2 lg:top-0 -translate-y-1/2 lg:translate-y-0 right-0"
          @click="nextDay"
        >
          <Icon
            name="tabler:chevron-right"
            class="size-4"
          />
        </UiButton>
      </div>
    </div>
  </NuxtLayout>
</template>
