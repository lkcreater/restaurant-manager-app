import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Users: React.FC = () => {
    const users = [
        {
            id: '1',
            name: 'สมชาย ใจดี',
            email: 'somchai@restaurant.com',
            role: 'admin',
            avatar: '',
        },
        {
            id: '2',
            name: 'สมหญิง รักงาน',
            email: 'somying@restaurant.com',
            role: 'manager',
            avatar: '',
        },
        {
            id: '3',
            name: 'สมศักดิ์ ขยัน',
            email: 'somsak@restaurant.com',
            role: 'staff',
            avatar: '',
        },
    ]

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-700'
            case 'manager':
                return 'bg-blue-100 text-blue-700'
            case 'staff':
                return 'bg-green-100 text-green-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const getRoleText = (role: string) => {
        switch (role) {
            case 'admin':
                return 'ผู้ดูแลระบบ'
            case 'manager':
                return 'ผู้จัดการ'
            case 'staff':
                return 'พนักงาน'
            default:
                return role
        }
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">ผู้ใช้งาน</h1>
                    <p className="text-gray-500 mt-1">จัดการผู้ใช้งานและสิทธิ์การเข้าถึง</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    เพิ่มผู้ใช้งาน
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>ผู้ใช้งานทั้งหมด</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="bg-primary-600 text-white">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 text-sm rounded-full ${getRoleBadge(user.role)}`}>
                                        {getRoleText(user.role)}
                                    </span>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Users
