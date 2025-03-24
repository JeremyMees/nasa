<script lang="ts" setup>
const { data } = useAPOD()
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
      <NuxtImg
        v-if="data?.url || data?.thumbnail_url"
        :src="data?.url || data?.thumbnail_url"
        class="w-full aspect-video"
      />
      <div v-else class="w-full aspect-video bg-muted" />
      <UiCardHeader class="min-w-[200px]">
        <UiCardTitle>{{ data?.title }}</UiCardTitle>
        <div
          v-if="data?.copyright"
          class="flex items-center gap-1"
        >
          <Icon name="tabler:copyright" class="size-4" />
          <span class="text-sm text-muted-foreground">
            {{ data?.copyright }}
          </span>
        </div>
        <UiCardDescription>{{ data?.explanation }}</UiCardDescription>
      </UiCardHeader>
    </UiCard>
  </NuxtLayout>
</template>
