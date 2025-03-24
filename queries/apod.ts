import { useQuery } from '@tanstack/vue-query'

interface APODResponse {
  date: string
  explanation: string
  media_type: string
  service_version: string
  title: string
  url: string
  thumbnail_url?: string
  hdurl?: string
  copyright?: string
}

export function useAPOD(options: ComputedRef<{ date: string }>) {
  const key = useRuntimeConfig().public.nasaApiKey

  return useQuery({
    queryKey: ['useAPOD', options.value.date],
    queryFn: async () => {
      try {
        return await $fetch<APODResponse>(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${options.value.date}&thumbs=true`)
      }
      catch (error) {
        console.error(error)
      }
    },
  })
}
