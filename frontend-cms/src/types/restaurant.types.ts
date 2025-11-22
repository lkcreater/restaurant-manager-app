export enum MenuItemStatus {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable',
    OUT_OF_STOCK = 'out_of_stock',
}

export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    categoryId: string
    category?: Category
    image?: string
    status: MenuItemStatus
    preparationTime?: number // in minutes
    createdAt: string
    updatedAt: string
}

export interface Category {
    id: string
    name: string
    description?: string
    icon?: string
    order: number
    createdAt: string
    updatedAt: string
}

export enum TableStatus {
    AVAILABLE = 'available',
    OCCUPIED = 'occupied',
    RESERVED = 'reserved',
    CLEANING = 'cleaning',
}

export interface Table {
    id: string
    number: string
    capacity: number
    status: TableStatus
    location?: string
    createdAt: string
    updatedAt: string
}

export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    PREPARING = 'preparing',
    READY = 'ready',
    SERVED = 'served',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export interface OrderItem {
    id: string
    menuItemId: string
    menuItem?: MenuItem
    quantity: number
    price: number
    notes?: string
}

export interface Order {
    id: string
    orderNumber: string
    tableId?: string
    table?: Table
    items: OrderItem[]
    subtotal: number
    tax: number
    total: number
    status: OrderStatus
    notes?: string
    createdBy: string
    createdAt: string
    updatedAt: string
}

export interface CreateMenuItemInput {
    name: string
    description: string
    price: number
    categoryId: string
    image?: string
    status: MenuItemStatus
    preparationTime?: number
}

export interface UpdateMenuItemInput extends Partial<CreateMenuItemInput> {
    id: string
}

export interface CreateCategoryInput {
    name: string
    description?: string
    icon?: string
    order: number
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
    id: string
}

export interface CreateTableInput {
    number: string
    capacity: number
    status: TableStatus
    location?: string
}

export interface UpdateTableInput extends Partial<CreateTableInput> {
    id: string
}
