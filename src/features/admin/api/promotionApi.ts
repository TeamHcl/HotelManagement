import { apiClient } from '../../../lib/apiClient'

export interface PromotionResponse {
  id: number
  code: string
  type: 'PERCENTAGE' | 'FIXED'
  value: number
  minBookingAmount: number
  maxDiscount: number
  startDate: string
  endDate: string
  usageLimit: number
  usedCount: number
  active: boolean
  createdAt: string
}

export interface CreatePromotionPayload {
  code: string
  type: 'PERCENTAGE' | 'FIXED'
  value: number
  minBookingAmount: number
  maxDiscount: number
  startDate: string
  endDate: string
  usageLimit: number
  active: boolean
}

export const adminPromotionApi = {
  listActive: async (): Promise<PromotionResponse[]> => {
    const response = await apiClient('/promotions')
    return response.json()
  },

  create: async (payload: CreatePromotionPayload): Promise<PromotionResponse> => {
    const response = await apiClient('/promotions', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return response.json()
  },
}
