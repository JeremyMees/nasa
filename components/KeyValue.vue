<script setup lang="ts">
import { getUnitAbbreviation } from '~/utils/helper'

const props = withDefaults(defineProps<{
  keyWord: string
  value: string | boolean | number
  unit?: string | null
  perHour?: boolean
}>(), {
  unit: null,
  perHour: false,
})

const suffix = computed<string>(() => {
  let suffix = ''
  if (props.unit && props.perHour) suffix = getUnitAbbreviation(props.unit) + '/h'
  else if (props.perHour) suffix = 'ph.'
  else if (props.unit) suffix = getUnitAbbreviation(props.unit) + '.'
  return suffix
})
</script>

<template>
  <div class="flex flex-row flex-wrap gap-x-2 gap-y-1 text-xs">
    <p class="font-bold">
      {{ keyWord + ':' }}
    </p>
    <p>
      {{ value }}
      <span
        v-if="unit || perHour"
        class="text-[8px]"
      >{{ suffix }}</span>
    </p>
  </div>
</template>
