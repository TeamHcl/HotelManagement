import { env } from '../features/runtime-config/env';

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem('auth.token');
  const baseUrl = env.apiBaseUrl.replace(/\/$/, '');
  
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Request failed (${response.status})`;
    try {
      const data = await response.json();
      errorMessage = data?.message || data?.error || errorMessage;
    } catch {
      // Keep default error message
    }
    throw new Error(errorMessage);
  }

  return response;
};
