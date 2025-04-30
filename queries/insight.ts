import { useQuery } from '@tanstack/vue-query'

interface InSightWeatherData {
  sol_keys: string[]
  validity_checks: Record<string, any>
  [key: string]: {
    AT: {
      av: number
      ct: number
      mn: number
      mx: number
    }
    HWS: {
      av: number
      ct: number
      mn: number
      mx: number
    }
    PRE: {
      av: number
      ct: number
      mn: number
      mx: number
    }
    WD: {
      most_common: number
      compass_degrees: number
      compass_point: string
      compass_right: number
      compass_up: number
      ct: number
    }
    First_UTC: string
    Last_UTC: string
    Season: string
  } | any
}

export function useInsight() {
  const key = useRuntimeConfig().public.nasaApiKey

  return useQuery({
    queryKey: ['useInsight'],
    queryFn: async () => {
      try {
        return await $fetch<InSightWeatherData>(`https://api.nasa.gov/insight_weather/?api_key=${key}&feedtype=json&ver=1.0`)
      }
      catch (error) {
        console.error(error)
      }
    },
  })
}
