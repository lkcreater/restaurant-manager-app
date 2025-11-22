import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    UtensilsCrossed,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    Users,
    Table2
} from 'lucide-react'

const Dashboard: React.FC = () => {
    const { user } = useAuth()

    const stats = [
        {
            title: 'รายการอาหารทั้งหมด',
            value: '124',
            icon: UtensilsCrossed,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'คำสั่งซื้อวันนี้',
            value: '45',
            icon: ShoppingCart,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'รายได้วันนี้',
            value: '฿12,450',
            icon: DollarSign,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
        {
            title: 'เพิ่มขึ้น',
            value: '+12.5%',
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            title: 'ลูกค้าทั้งหมด',
            value: '1,234',
            icon: Users,
            color: 'text-pink-600',
            bgColor: 'bg-pink-100',
        },
        {
            title: 'โต๊ะว่าง',
            value: '8/20',
            icon: Table2,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100',
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    สวัสดี, {user?.name} 👋
                </h1>
                <p className="text-gray-500 mt-1">ยินดีต้อนรับสู่ระบบจัดการร้านอาหาร</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                                    <div>
                                        <p className="font-medium">คำสั่งซื้อ #{1000 + i}</p>
                                        <p className="text-sm text-gray-500">โต๊ะ {i}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">฿{(Math.random() * 1000 + 200).toFixed(2)}</p>
                                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                            กำลังดำเนินการ
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>เมนูยอดนิยม</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {['ผัดไทย', 'ต้มยำกุ้ง', 'ข้าวผัด', 'ส้มตำ', 'แกงเขียวหวาน'].map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <UtensilsCrossed className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item}</p>
                                            <p className="text-sm text-gray-500">{Math.floor(Math.random() * 50 + 10)} ออเดอร์</p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-primary-600">฿{(Math.random() * 100 + 50).toFixed(0)}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard
