import { apiClient } from '../../../lib/apiClient';

export interface UserProfileResponse {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'CUSTOMER';
  loyaltyPoints?: number;
  createdAt: string;
}

export interface UpdateUserProfileRequest {
  name: string;
  email: string;
}

export interface LoyaltyResponse {
  loyaltyPoints: number;
}

export const userApi = {
  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await apiClient('/users/me');
    return response.json();
  },

  updateProfile: async (payload: UpdateUserProfileRequest): Promise<UserProfileResponse> => {
    const response = await apiClient('/users/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  
  getLoyalty: async (): Promise<LoyaltyResponse> => {
    const response = await apiClient('/users/me/loyalty');
    return response.json();
  }
};
