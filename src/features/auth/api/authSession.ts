import type { AuthResponse } from './authApi'

const TOKEN_KEY = 'auth.token'
const USER_KEY = 'auth.user'

export type AuthUser = {
  userId: number
  email: string
  role: string
}

const normalizeRole = (role?: string) => {
  if (!role) {
    return ''
  }
  return role.startsWith('ROLE_') ? role.slice('ROLE_'.length) : role
}

export const persistAuth = (response: AuthResponse) => {
  localStorage.setItem(TOKEN_KEY, response.token)
  const user: AuthUser = {
    userId: response.userId,
    email: response.email,
    role: normalizeRole(response.role),
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getStoredAuthUser = (): AuthUser | null => {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) {
    return null
  }
  try {
    const user = JSON.parse(raw) as AuthUser
    return {
      ...user,
      role: normalizeRole(user.role),
    }
  } catch {
    return null
  }
}

export const getPostAuthRoute = (role?: string) => {
  switch (normalizeRole(role)) {
    case 'ADMIN':
      return '/admin/dashboard'
    case 'MANAGER':
      return '/manager/dashboard'
    case 'CUSTOMER':
      return '/customer/dashboard'
    default:
      return '/'
  }
}
