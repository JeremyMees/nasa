import { useQuery } from '@tanstack/vue-query'
import type { Links, NearEarthObject, Page } from '~/types/neows'

interface NeowsResponse {
  links: Links
  page: Page
  near_earth_objects: NearEarthObject[]
}

export function useNeows(options: ComputedRef<{ page: number, size: number }>) {
  const key = useRuntimeConfig().public.nasaApiKey

  return useQuery({
    queryKey: ['useNeows', options.value.page, options.value.size],
    queryFn: async () => {
      try {
        return await $fetch<NeowsResponse>(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${key}&page=${options.value.page}&size=${options.value.size}`)
      }
      catch (error) {
        console.error(error)
      }
    },
  })
}
