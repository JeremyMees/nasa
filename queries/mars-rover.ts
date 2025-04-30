import { useQuery } from '@tanstack/vue-query'

interface Photo {
  id: number
  sol: number
  camera: Camera
  img_src: string
  earth_date: string
  rover: Rover
}

interface Camera {
  id: number
  name: string
  rover_id: number
  full_name: string
}

interface Rover {
  id: number
  name: string
  landing_date: string
  launch_date: string
  status: string
}

interface RoverPhotosResponse {
  photos: Photo[]
}

export type RoverName = 'curiosity' | 'opportunity' | 'spirit'
export type RoverCamera = 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI' | 'NAVCAM' | 'PANCAM' | 'MINITES' | 'ALL'

export interface RoverPhotoFilters {
  rover: RoverName
  sol?: number
  earthDate?: string
  camera: RoverCamera
  page: number
}

export function useMarsRoverPhotos(filters: ComputedRef<RoverPhotoFilters>) {
  const key = useRuntimeConfig().public.nasaApiKey

  return useQuery({
    queryKey: ['marsRoverPhotos', filters.value],
    queryFn: async () => {
      try {
        const params = new URLSearchParams()

        params.append('api_key', key)
        params.append('page', filters.value.page.toString())

        if (filters.value.sol) params.append('sol', filters.value.sol.toString())
        else if (filters.value.earthDate) params.append('earth_date', filters.value.earthDate)

        if (filters.value.camera) {
          if (filters.value.camera === 'ALL') params.append('camera', '')
          else params.append('camera', filters.value.camera.toLowerCase())
        }

        return await $fetch<RoverPhotosResponse>(`https://api.nasa.gov/mars-photos/api/v1/rovers/${filters.value.rover}/photos?${params.toString()}`)
      }
      catch (error) {
        console.error(error)
        throw error
      }
    },
  })
}
