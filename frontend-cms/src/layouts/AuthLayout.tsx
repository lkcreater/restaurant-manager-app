import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-800 mb-2">
                        Restaurant CMS
                    </h1>
                    <p className="text-primary-600">ระบบจัดการร้านอาหาร</p>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
