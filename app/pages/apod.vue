<script lang="ts" setup>
const { data, isPending } = useAPOD()
</script>

<template>
  <NuxtLayout>
    <h2 class="text-3xl font-bold tracking-tight">
      Astronomy Picture of the Day
    </h2>
    <p class="text-sm text-muted-foreground mb-6">
      {{ data?.date }}
    </p>

    <UiCard class="overflow-hidden max-w-[1000px] mx-auto">
      <UiSkeleton v-if="isPending" class="h-[200px] aspect-video" />
      <NuxtImg
        v-else-if="data?.url || data?.thumbnail_url"
        :src="data?.url || data?.thumbnail_url"
        class="w-full aspect-video"
      />
      <UiCardHeader class="min-w-[200px]">
        <UiCardTitle>
          <UiSkeleton v-if="isPending" class="w-[200px] h-7" />
          <span v-else-if="data?.title">
            {{ data?.title }}
          </span>
        </UiCardTitle>
        <div
          v-if="data?.copyright"
          class="flex items-center gap-1"
        >
          <Icon name="tabler:copyright" class="size-4" />
          <span class="text-sm text-muted-foreground">
            {{ data?.copyright }}
          </span>
        </div>
        <UiCardDescription>
          <UiSkeleton v-if="isPending" class="w-full h-[140px]" />
          <span v-else-if="data?.explanation">
            {{ data?.explanation }}
          </span>
        </UiCardDescription>
      </UiCardHeader>
    </UiCard>
  </NuxtLayout>
</template>
