import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

const MenuItems: React.FC = () => {
    // Mock data - replace with actual API calls
    const menuItems = [
        { id: '1', name: 'ผัดไทย', category: 'อาหารจานหลัก', price: 80, status: 'available' },
        { id: '2', name: 'ต้มยำกุ้ง', category: 'ซุป', price: 120, status: 'available' },
        { id: '3', name: 'ข้าวผัด', category: 'อาหารจานหลัก', price: 60, status: 'available' },
        { id: '4', name: 'ส้มตำ', category: 'สลัด', price: 50, status: 'out_of_stock' },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">รายการอาหาร</h1>
                    <p className="text-gray-500 mt-1">จัดการเมนูอาหารทั้งหมด</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    เพิ่มรายการอาหาร
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>รายการอาหารทั้งหมด</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="ค้นหารายการอาหาร..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">ชื่อเมนู</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">หมวดหมู่</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">ราคา</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">สถานะ</th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-700">การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuItems.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4 font-medium">{item.name}</td>
                                        <td className="py-4 px-4 text-gray-600">{item.category}</td>
                                        <td className="py-4 px-4 text-gray-600">฿{item.price}</td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-block px-2 py-1 text-xs rounded-full ${item.status === 'available'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {item.status === 'available' ? 'พร้อมจำหน่าย' : 'หมด'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default MenuItems
