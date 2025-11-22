import { api } from './api.service'
import { API_CONFIG } from '@/config/api.config'
import { LoginCredentials, AuthResponse, User } from '@/types/auth.types'

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(API_CONFIG.ENDPOINTS.LOGIN, credentials)

        // Store token and user data
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        }

        return response.data
    },

    async logout(): Promise<void> {
        try {
            await api.post(API_CONFIG.ENDPOINTS.LOGOUT)
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            // Clear local storage regardless of API call result
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
        }
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>(API_CONFIG.ENDPOINTS.ME)
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    },

    getStoredUser(): User | null {
        const userStr = localStorage.getItem('user')
        if (!userStr) return null

        try {
            return JSON.parse(userStr)
        } catch {
            return null
        }
    },

    getStoredToken(): string | null {
        return localStorage.getItem('auth_token')
    },

    isAuthenticated(): boolean {
        return !!this.getStoredToken()
    },
}
