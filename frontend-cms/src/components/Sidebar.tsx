import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    UtensilsCrossed,
    FolderTree,
    Table2,
    ShoppingCart,
    Users
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Permission, UserRole } from '@/types/auth.types'
import { cn } from '@/lib/utils'

interface MenuItem {
    title: string
    href: string
    icon: React.ElementType
    permission?: Permission
    role?: UserRole
}

const menuItems: MenuItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'รายการอาหาร',
        href: '/menu-items',
        icon: UtensilsCrossed,
        // permission: Permission.MENU_VIEW,
    },
    {
        title: 'หมวดหมู่',
        href: '/categories',
        icon: FolderTree,
        // permission: Permission.CATEGORY_VIEW,
    },
    {
        title: 'โต๊ะ',
        href: '/tables',
        icon: Table2,
        // permission: Permission.TABLE_VIEW,
    },
    {
        title: 'คำสั่งซื้อ',
        href: '/orders',
        icon: ShoppingCart,
        // permission: Permission.ORDER_VIEW,
    },
    {
        title: 'ผู้ใช้งาน',
        href: '/users',
        icon: Users,
        // role: UserRole.ADMIN,
    },
]

export const Sidebar: React.FC = () => {
    const location = useLocation()
    const { hasPermission, hasRole } = useAuth()

    const canAccessMenuItem = (item: MenuItem): boolean => {
        if (item.permission && !hasPermission(item.permission)) {
            return false
        }
        if (item.role && !hasRole(item.role)) {
            return false
        }
        return true
    }

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-primary-700">Restaurant CMS</h2>
                <p className="text-sm text-gray-500 mt-1">ระบบจัดการร้านอาหาร</p>
            </div>

            <nav className="px-3 space-y-1">
                {menuItems.map((item) => {
                    if (!canAccessMenuItem(item)) return null

                    const Icon = item.icon
                    const isActive = location.pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.title}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
