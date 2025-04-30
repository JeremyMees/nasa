<template>
  <NuxtLayout>
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">
          NASA Data Explorer
        </h1>
        <p class="text-muted-foreground">
          Explore data from NASA's open APIs including Mars weather, astronomy pictures, and more.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsightCard />
        <ApodCard />
        <NeowsCard />
      </div>
    </div>
  </NuxtLayout>
</template>
