import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG } from '@/config/api.config'

class ApiService {
    private api: AxiosInstance

    constructor() {
        this.api = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        this.setupInterceptors()
    }

    private setupInterceptors() {
        // Request interceptor
        this.api.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem('auth_token')
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )

        // Response interceptor
        this.api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    // Clear auth data and redirect to login
                    localStorage.removeItem('auth_token')
                    localStorage.removeItem('user')
                    window.location.href = '/login'
                }
                return Promise.reject(error)
            }
        )
    }

    getInstance(): AxiosInstance {
        return this.api
    }
}

export const apiService = new ApiService()
export const api = apiService.getInstance()
