<script lang="ts" setup>
const { data, isPending } = useAPOD({ date: formatDate(new Date()) })
</script>

<template>
  <UiCard class="overflow-hidden">
    <UiCardHeader class="pb-0">
      <div class="flex items-center gap-2">
        <Icon
          name="tabler:photo"
          class="size-5"
        />
        <UiCardTitle>Astronomy Picture of the Day</UiCardTitle>
      </div>
      <UiCardDescription>
        NASA's daily astronomy highlights
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="pt-6">
      <div class="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
        <Icon
          v-if="isPending"
          name="tabler:photo"
          class="size-12 text-muted-foreground"
        />
        <NuxtImg
          v-else-if="data?.url || data?.thumbnail_url"
          :src="data?.url || data?.thumbnail_url"
          class="w-full h-full object-scale-down"
        />
      </div>
    </UiCardContent>
    <UiCardFooter>
      <UiDialog>
        <UiDialogTrigger
          as-child
          class="w-full"
        >
          <UiButton
            variant="outline"
            class="w-full"
          >
            <Icon
              name="tabler:zoom"
              class="size-4 mr-2"
            />
            View Detailed Image
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle>
              {{ data?.title }}
            </UiDialogTitle>
          </UiDialogHeader>

          <div class="aspect-square bg-muted rounded-md overflow-hidden">
            <NuxtImg
              v-if="data?.url || data?.thumbnail_url"
              :src="data?.url || data?.thumbnail_url"
              class="w-full h-full object-scale-down"
            />
          </div>
          <p class="text-sm text-muted-foreground">
            {{ data?.explanation }}
          </p>
        </UiDialogContent>
      </UiDialog>
    </UiCardFooter>
  </UiCard>
</template>
