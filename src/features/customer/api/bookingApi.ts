import { apiClient } from '../../../lib/apiClient'

export interface BookingResponse {
  id: number
  reservationNumber: string
  userId: number
  roomId: number | null
  roomTypeId: number | null
  checkIn: string
  checkOut: string
  totalPrice: number
  discountAmount: number
  finalPrice: number
  promotionId: number | null
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  parentBookingId: number | null
  createdAt: string
}

export interface CreateBookingPayload {
  roomId?: number
  roomTypeId?: number
  checkIn: string
  checkOut: string
  totalPrice: number
  discountAmount?: number
  promotionId?: number
}

export interface RebookBookingPayload {
  checkIn: string
  checkOut: string
  totalPrice?: number
  discountAmount?: number
  promotionId?: number
}

export const bookingApi = {
  createBooking: async (payload: CreateBookingPayload): Promise<BookingResponse> => {
    const response = await apiClient('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return response.json()
  },

  listMyBookings: async (): Promise<BookingResponse[]> => {
    const response = await apiClient('/bookings/my')
    return response.json()
  },

  cancelBooking: async (id: number): Promise<BookingResponse> => {
    const response = await apiClient(`/bookings/${id}/cancel`, {
      method: 'PUT',
    })
    return response.json()
  },

  rebook: async (id: number, payload: RebookBookingPayload): Promise<BookingResponse> => {
    const response = await apiClient(`/bookings/${id}/rebook`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return response.json()
  },
}
