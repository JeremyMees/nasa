<script setup lang="ts">
import { PaginationFirst, type PaginationFirstProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import {
  Button,
} from '@/components/ui/button'
import { cn } from '@/utils/shadcn'

const props = withDefaults(defineProps<PaginationFirstProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationFirst v-bind="delegatedProps">
    <Button
      :class="cn('w-9 h-9 p-0', props.class)"
      variant="outline"
    >
      <slot>
        <Icon name="tabler:chevrons-left" />
      </slot>
    </Button>
  </PaginationFirst>
</template>
