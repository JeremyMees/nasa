<script setup lang="ts">
const menuItems = [
  { label: 'Daily Astronomy Picture', href: '/apod', icon: 'tabler:photo' },
]
</script>

<template>
  <div class="border-border border-b py-2">
    <div class="flex items-center justify-between gap-2 max-w-[2000px] mx-auto w-full px-4 md:px-6 lg:px-10">
      <div>
        <NuxtLink to="/" class="flex items-center gap-1">
          <Icon name="tabler:rocket" class="size-6" />
          <span class="text-xl font-bold">
            Nasa
          </span>
        </NuxtLink>
      </div>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger>
          <UiButton size="icon">
            <Icon name="tabler:menu-2" class="size-4" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent>
          <UiDropdownMenuItem v-for="item in menuItems" :key="item.href">
            <NuxtLink :to="item.href" class="flex items-center gap-2">
              <Icon :name="item.icon" class="size-4" />
              {{ item.label }}
            </NuxtLink>
          </UiDropdownMenuItem>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem>
            <div class="flex items-center justify-between gap-2 w-full">
              <Icon
                name="tabler:palette"
                class="size-4 min-w-4"
              />
              <UiSelect v-model="$colorMode.preference">
                <UiSelectTrigger>
                  <UiSelectValue />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem value="light">
                      Light
                    </UiSelectItem>
                    <UiSelectItem value="dark">
                      Dark
                    </UiSelectItem>
                    <UiSelectItem value="system">
                      System
                    </UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </div>
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>
  </div>
</template>
