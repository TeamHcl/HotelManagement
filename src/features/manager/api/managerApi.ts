import { apiClient } from '../../../lib/apiClient';

export interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  managerId: number;
  status: string;
  averageRating?: number;
  createdAt: string;
}

export interface RoomType {
  id: number;
  hotelId: number;
  name: string;
  capacity: number;
  basePrice: number;
}

export interface CreateHotelPayload {
  name: string;
  location: string;
  description: string;
}

export interface CreateRoomTypePayload {
  hotelId: number;
  name: string;
  capacity: number;
  basePrice: number;
}

export interface InventoryBulkRequest {
  roomTypeId: number;
  startDate: string;
  endDate: string;
  totalRooms: number;
}

export interface InventoryUpdateRequest {
  roomTypeId: number;
  date: string;
  totalRooms: number;
}

export interface UpsertHotelFacilityItem {
  facilityId: number;
  value: 'FREE' | 'PAID' | 'AVAILABLE';
}

export interface UpsertHotelFacilitiesRequest {
  facilities: UpsertHotelFacilityItem[];
}

export interface HotelFacilityResponse {
  facilityId: number;
  facilityName: string;
  category: 'BASIC' | 'ROOM' | 'PREMIUM';
  value: 'FREE' | 'PAID' | 'AVAILABLE';
}

export interface FacilityResponse {
  id: number;
  name: string;
  category: 'BASIC' | 'ROOM' | 'PREMIUM';
}

export const managerApi = {
  getMyHotels: async (): Promise<Hotel[]> => {
    const response = await apiClient('/hotels/my');
    return response.json();
  },

  getHotelById: async (id: number): Promise<Hotel> => {
    const response = await apiClient(`/hotels/${id}`);
    return response.json();
  },

  createHotel: async (payload: CreateHotelPayload): Promise<Hotel> => {
    const response = await apiClient('/hotels', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  getHotelRoomTypes: async (hotelId: number): Promise<RoomType[]> => {
    const response = await apiClient(`/hotels/${hotelId}/room-types`);
    return response.json();
  },

  updateHotel: async (id: number, payload: CreateHotelPayload): Promise<Hotel> => {
    const response = await apiClient(`/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  getHotelFacilities: async (id: number): Promise<HotelFacilityResponse[]> => {
    const response = await apiClient(`/hotels/${id}/facilities`);
    return response.json();
  },

  upsertHotelFacilities: async (id: number, payload: UpsertHotelFacilitiesRequest): Promise<HotelFacilityResponse[]> => {
    const response = await apiClient(`/hotels/${id}/facilities`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  createRoomType: async (payload: CreateRoomTypePayload): Promise<RoomType> => {
    const response = await apiClient('/room-types', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  getRoomTypeById: async (id: number): Promise<RoomType> => {
    const response = await apiClient(`/room-types/${id}`);
    return response.json();
  },

  updateRoomType: async (id: number, payload: CreateRoomTypePayload): Promise<RoomType> => {
    const response = await apiClient(`/room-types/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  deleteRoomType: async (id: number): Promise<void> => {
    await apiClient(`/room-types/${id}`, {
      method: 'DELETE',
    });
  },

  bulkUpdateInventory: async (payload: InventoryBulkRequest): Promise<void> => {
    await apiClient('/inventory/bulk', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  updateInventory: async (payload: InventoryUpdateRequest): Promise<void> => {
    await apiClient('/inventory/update', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  listFacilities: async (): Promise<FacilityResponse[]> => {
    const response = await apiClient('/facilities');
    return response.json();
  },
};
