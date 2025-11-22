export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    STAFF = 'staff',
}

export enum Permission {
    // Menu permissions
    MENU_VIEW = 'menu:view',
    MENU_CREATE = 'menu:create',
    MENU_UPDATE = 'menu:update',
    MENU_DELETE = 'menu:delete',

    // Category permissions
    CATEGORY_VIEW = 'category:view',
    CATEGORY_CREATE = 'category:create',
    CATEGORY_UPDATE = 'category:update',
    CATEGORY_DELETE = 'category:delete',

    // Table permissions
    TABLE_VIEW = 'table:view',
    TABLE_CREATE = 'table:create',
    TABLE_UPDATE = 'table:update',
    TABLE_DELETE = 'table:delete',

    // Order permissions
    ORDER_VIEW = 'order:view',
    ORDER_CREATE = 'order:create',
    ORDER_UPDATE = 'order:update',
    ORDER_DELETE = 'order:delete',

    // User permissions
    USER_VIEW = 'user:view',
    USER_CREATE = 'user:create',
    USER_UPDATE = 'user:update',
    USER_DELETE = 'user:delete',
}

export interface User {
    id: string
    email: string
    name: string
    role: UserRole
    permissions: Permission[]
    avatar?: string
    createdAt: string
    updatedAt: string
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthResponse {
    user: User
    token: string
    refreshToken?: string
}

export interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
    hasPermission: (permission: Permission) => boolean
    hasRole: (role: UserRole | UserRole[]) => boolean
}
