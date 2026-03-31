import { apiClient } from '../../../lib/apiClient';

export interface PendingHotel {
  id: number;
  name: string;
  location: string;
  description: string;
  managerId: number;
  status: string;
  createdAt: string;
}

export const adminApi = {
  getPendingHotels: async (): Promise<PendingHotel[]> => {
    const response = await apiClient('/admin/hotels/review');
    return response.json();
  },

  decideHotel: async (id: number, decision: 'APPROVE' | 'REJECT'): Promise<void> => {
    await apiClient(`/admin/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ decision }),
    });
  },
};
