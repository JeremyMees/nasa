<script lang="ts" setup>
</script>

<template>
  <UiCard class="overflow-hidden flex flex-col">
    <UiCardHeader class="pb-0">
      <div class="flex items-center gap-2">
        <Icon
          name="tabler:meteor"
          class="size-5"
        />
        <UiCardTitle>Near Earth Objects</UiCardTitle>
      </div>
      <UiCardDescription>
        Track asteroids and other objects near Earth
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="pt-6 grow">
      <div class="flex justify-center items-center py-6">
        <div class="relative">
          <div class="size-20 rounded-full bg-muted flex items-center justify-center">
            <div class="size-4 rounded-full bg-primary animate-pulse" />
          </div>
          <div class="absolute size-24 rounded-full border border-dashed border-muted-foreground/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
          <div class="absolute size-2 rounded-full bg-foreground orbit-element" />
        </div>
      </div>
    </UiCardContent>
    <UiCardFooter>
      <NuxtLink
        to="/neows"
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
          View NEO Database
        </UiButton>
      </NuxtLink>
    </UiCardFooter>
  </UiCard>
</template>

<style scoped>
.animate-spin {
  animation: spin 8s linear infinite;
}

.orbit-element {
  position: absolute;
  top: 0px;
  left: 50%;
  transform-origin: center 40px;
  animation: orbit 5s linear infinite;
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes orbit {
  from {
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) rotate(360deg);
  }
}
</style>
