import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Eye } from 'lucide-react'

const Orders: React.FC = () => {
    const orders = [
        {
            id: '1',
            orderNumber: 'ORD-1001',
            table: 'A2',
            items: 3,
            total: 450,
            status: 'preparing',
            time: '10:30',
        },
        {
            id: '2',
            orderNumber: 'ORD-1002',
            table: 'B1',
            items: 5,
            total: 780,
            status: 'ready',
            time: '10:45',
        },
        {
            id: '3',
            orderNumber: 'ORD-1003',
            table: 'A1',
            items: 2,
            total: 220,
            status: 'served',
            time: '11:00',
        },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-gray-100 text-gray-700'
            case 'confirmed':
                return 'bg-blue-100 text-blue-700'
            case 'preparing':
                return 'bg-yellow-100 text-yellow-700'
            case 'ready':
                return 'bg-green-100 text-green-700'
            case 'served':
                return 'bg-purple-100 text-purple-700'
            case 'completed':
                return 'bg-teal-100 text-teal-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'รอดำเนินการ'
            case 'confirmed':
                return 'ยืนยันแล้ว'
            case 'preparing':
                return 'กำลังเตรียม'
            case 'ready':
                return 'พร้อมเสิร์ฟ'
            case 'served':
                return 'เสิร์ฟแล้ว'
            case 'completed':
                return 'เสร็จสิ้น'
            default:
                return status
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">คำสั่งซื้อ</h1>
                    <p className="text-gray-500 mt-1">จัดการคำสั่งซื้อทั้งหมด</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    สร้างคำสั่งซื้อ
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-shadow duration-200">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}
                                >
                                    {getStatusText(order.status)}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">โต๊ะ:</span>
                                    <span className="font-medium">{order.table}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">รายการ:</span>
                                    <span className="font-medium">{order.items} รายการ</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">เวลา:</span>
                                    <span className="font-medium">{order.time}</span>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t">
                                    <span className="text-gray-600">ยอดรวม:</span>
                                    <span className="text-xl font-bold text-primary-600">฿{order.total}</span>
                                </div>
                                <Button variant="outline" className="w-full gap-2 mt-4">
                                    <Eye className="w-4 h-4" />
                                    ดูรายละเอียด
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Orders
