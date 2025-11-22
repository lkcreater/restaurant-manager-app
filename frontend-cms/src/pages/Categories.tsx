import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'

const Categories: React.FC = () => {
    const categories = [
        { id: '1', name: 'อาหารจานหลัก', description: 'เมนูอาหารหลักของร้าน', itemCount: 25 },
        { id: '2', name: 'ซุป', description: 'ซุปและแกงต่างๆ', itemCount: 12 },
        { id: '3', name: 'สลัด', description: 'สลัดและผักสด', itemCount: 8 },
        { id: '4', name: 'เครื่องดื่ม', description: 'เครื่องดื่มทุกประเภท', itemCount: 15 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">หมวดหมู่</h1>
                    <p className="text-gray-500 mt-1">จัดการหมวดหมู่อาหาร</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    เพิ่มหมวดหมู่
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow duration-200">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>{category.name}</span>
                                <span className="text-sm font-normal text-gray-500">{category.itemCount} รายการ</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">{category.description}</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 gap-2">
                                    <Edit className="w-4 h-4" />
                                    แก้ไข
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Categories
