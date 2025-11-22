import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { AuthLayout } from '@/layouts/AuthLayout'

// Pages
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import MenuItems from '@/pages/MenuItems'
import Categories from '@/pages/Categories'
import Tables from '@/pages/Tables'
import Orders from '@/pages/Orders'
import Users from '@/pages/Users'
import Unauthorized from '@/pages/Unauthorized'

import { UserRole, Permission } from '@/types/auth.types'

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected routes */}
            <Route
                element={
                    // <ProtectedRoute>
                    <DashboardLayout />
                    // </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/menu-items"
                    element={
                        // <ProtectedRoute requiredPermission={Permission.MENU_VIEW}>
                        <MenuItems />
                        // </ProtectedRoute>
                    }
                />

                <Route
                    path="/categories"
                    element={
                        // <ProtectedRoute requiredPermission={Permission.CATEGORY_VIEW}>
                        <Categories />
                        // </ProtectedRoute>
                    }
                />

                <Route
                    path="/tables"
                    element={
                        // <ProtectedRoute requiredPermission={Permission.TABLE_VIEW}>
                        <Tables />
                        // </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        // <ProtectedRoute requiredPermission={Permission.ORDER_VIEW}>
                        <Orders />
                        // </ProtectedRoute>
                    }
                />

                <Route
                    path="/users"
                    element={
                        // <ProtectedRoute requiredRole={UserRole.ADMIN}>
                        <Users />
                        // </ProtectedRoute>
                    }
                />
            </Route>

            {/* Error routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    )
}
