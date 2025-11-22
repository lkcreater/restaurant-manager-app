import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/auth.service'
import { User, LoginCredentials, AuthContextType, UserRole, Permission } from '@/types/auth.types'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        // Check for stored user on mount
        const storedUser = authService.getStoredUser()
        const token = authService.getStoredToken()

        if (storedUser && token) {
            setUser(storedUser)
            // Optionally fetch fresh user data
            authService.getCurrentUser()
                .then(setUser)
                .catch(() => {
                    // If fetch fails, clear stored data
                    // authService.logout()
                    setUser(null)
                })
        }

        setIsLoading(false)
    }, [])

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authService.login(credentials)
            setUser(response.user)
            navigate('/dashboard')
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }

    const logout = () => {
        authService.logout()
        setUser(null)
        // navigate('/login')
    }

    const hasPermission = (permission: Permission): boolean => {
        if (!user) return false
        return user.permissions.includes(permission)
    }

    const hasRole = (role: UserRole | UserRole[]): boolean => {
        if (!user) return false

        if (Array.isArray(role)) {
            return role.includes(user.role)
        }

        return user.role === role
    }

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasPermission,
        hasRole,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
