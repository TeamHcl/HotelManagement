import { apiClient } from '../../../lib/apiClient';
import type { Hotel } from '../../manager/api/managerApi';

export interface SearchResultItem {
  roomTypeId: number;
  hotelId: number;
  roomTypeName: string;
  capacity: number;
  totalPrice: number;
}

export interface AvailabilityResponse {
  available: boolean;
  totalPrice: number;
  dates: string[];
  nightlyPrices: number[];
  roomTypeId: number;
  hotelId: number;
  roomTypeName: string;
  capacity: number;
}

export interface FacilityResponse {
  id: number;
  name: string;
  category: 'BASIC' | 'ROOM' | 'PREMIUM';
}

export interface HotelPublicResponse {
  id: number
  name: string
  location: string
  description: string
  averageRating: number
}

export interface RoomTypeResponse {
  id: number
  hotelId: number
  name: string
  capacity: number
  basePrice: number
}

export const customerApi = {
  getHotelById: async (id: number | string): Promise<Hotel> => {
    const response = await apiClient(`/hotels/${id}`);
    return response.json();
  },

  listActiveHotels: async (): Promise<HotelPublicResponse[]> => {
    const response = await apiClient('/hotels');
    return response.json();
  },

  listRoomTypesByHotel: async (hotelId: number): Promise<RoomTypeResponse[]> => {
    const response = await apiClient(`/hotels/${hotelId}/room-types`);
    return response.json();
  },

  searchRoomTypes: async (
    hotelId: number,
    checkIn: string,
    checkOut: string,
    guests?: number
  ): Promise<SearchResultItem[]> => {
    const params = new URLSearchParams({
      hotelId: hotelId.toString(),
      checkIn,
      checkOut,
    });
    if (guests) params.append('guests', guests.toString());

    const response = await apiClient(`/search?${params.toString()}`);
    return response.json();
  },

  checkAvailability: async (
    roomTypeId: number | string,
    checkIn: string,
    checkOut: string
  ): Promise<AvailabilityResponse> => {
    const params = new URLSearchParams({
      roomTypeId: roomTypeId.toString(),
      checkIn,
      checkOut,
    });
    const response = await apiClient(`/availability?${params.toString()}`);
    return response.json();
  },

  getFacilities: async (): Promise<FacilityResponse[]> => {
    const response = await apiClient('/facilities');
    return response.json();
  },
};
