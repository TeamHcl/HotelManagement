import { apiClient } from '../../../lib/apiClient'

export interface ReviewResponse {
  id: number
  userId: number
  hotelId: number
  rating: number
  comment?: string
  createdAt: string
}

export interface CreateReviewPayload {
  hotelId: number
  rating: number
  comment?: string
}

export const reviewApi = {
  listByHotel: async (hotelId: number): Promise<ReviewResponse[]> => {
    const response = await apiClient(`/hotels/${hotelId}/reviews`)
    return response.json()
  },

  create: async (payload: CreateReviewPayload): Promise<ReviewResponse> => {
    const response = await apiClient('/reviews', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return response.json()
  },
}
