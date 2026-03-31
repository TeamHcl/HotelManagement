import { env } from '../../runtime-config/env'

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
  role?: string
}

export type AuthResponse = {
  token: string
  userId: number
  email: string
  role: string
}

const baseUrl = env.apiBaseUrl.replace(/\/$/, '')
const authBaseUrl = `${baseUrl}/auth`

const readErrorMessage = async (response: Response) => {
  const fallback = `Request failed (${response.status})`
  try {
    const data = (await response.json()) as { message?: string; error?: string }
    return data?.message || data?.error || fallback
  } catch {
    return fallback
  }
}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await fetch(`${authBaseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return (await response.json()) as AuthResponse
}

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await fetch(`${authBaseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return (await response.json()) as AuthResponse
}
