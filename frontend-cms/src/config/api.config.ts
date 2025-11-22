export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
    ENDPOINTS: {
        // Auth
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        REFRESH: '/auth/refresh',

        // Menu Items
        MENU_ITEMS: '/menu-items',
        MENU_ITEM: (id: string) => `/menu-items/${id}`,

        // Categories
        CATEGORIES: '/categories',
        CATEGORY: (id: string) => `/categories/${id}`,

        // Tables
        TABLES: '/tables',
        TABLE: (id: string) => `/tables/${id}`,

        // Orders
        ORDERS: '/orders',
        ORDER: (id: string) => `/orders/${id}`,

        // Users
        USERS: '/users',
        USER: (id: string) => `/users/${id}`,
    },
    TIMEOUT: 30000,
}
