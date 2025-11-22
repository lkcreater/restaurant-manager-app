import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { SuccessModal } from '@/components/SuccessModal'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { menuItemSchema, type MenuItemFormData } from '@/utils/validation'

const MenuItems: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<any>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<MenuItemFormData>({
        resolver: zodResolver(menuItemSchema),
        defaultValues: {
            status: 'available',
            preparationTime: 15,
        },
    })

    // Mock data
    const [menuItems, setMenuItems] = useState([
        { id: '1', name: 'ผัดไทย', category: 'อาหารจานหลัก', categoryId: '1', price: 80, status: 'available' },
        { id: '2', name: 'ต้มยำกุ้ง', category: 'ซุป', categoryId: '2', price: 120, status: 'available' },
        { id: '3', name: 'ข้าวผัด', category: 'อาหารจานหลัก', categoryId: '1', price: 60, status: 'available' },
        { id: '4', name: 'ส้มตำ', category: 'สลัด', categoryId: '3', price: 50, status: 'out_of_stock' },
    ])

    const categories = [
        { id: '1', name: 'อาหารจานหลัก' },
        { id: '2', name: 'ซุป' },
        { id: '3', name: 'สลัด' },
        { id: '4', name: 'เครื่องดื่ม' },
    ]

    const onSubmit = (data: MenuItemFormData) => {
        console.log('Form data:', data)

        // Mock: Add or update item
        if (editingItem) {
            setMenuItems(items =>
                items.map(item =>
                    item.id === editingItem.id
                        ? { ...item, ...data, category: categories.find(c => c.id === data.categoryId)?.name || '' }
                        : item
                )
            )
        } else {
            const newItem = {
                id: String(menuItems.length + 1),
                ...data,
                category: categories.find(c => c.id === data.categoryId)?.name || '',
            }
            setMenuItems([...menuItems, newItem])
        }

        setIsDialogOpen(false)
        setIsSuccessOpen(true)
        reset()
        setEditingItem(null)
    }

    const handleEdit = (item: any) => {
        setEditingItem(item)
        setValue('name', item.name)
        setValue('description', item.description || '')
        setValue('price', item.price)
        setValue('categoryId', item.categoryId)
        setValue('status', item.status)
        setValue('preparationTime', item.preparationTime || 15)
        setValue('image', item.image || '')
        setIsDialogOpen(true)
    }

    const handleDelete = (id: string) => {
        if (confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
            setMenuItems(items => items.filter(item => item.id !== id))
        }
    }

    const handleAddNew = () => {
        setEditingItem(null)
        reset({
            status: 'available',
            preparationTime: 15,
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">รายการอาหาร</h1>
                    <p className="text-gray-500 mt-1">จัดการเมนูอาหารทั้งหมด</p>
                </div>
                <Button className="gap-2" onClick={handleAddNew}>
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
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-600 hover:text-red-700"
                                                    onClick={() => handleDelete(item.id)}
                                                >
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

            {/* Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'แก้ไขรายการอาหาร' : 'เพิ่มรายการอาหาร'}</DialogTitle>
                        <DialogDescription>
                            กรอกข้อมูลรายการอาหารให้ครบถ้วน
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">ชื่อเมนู *</Label>
                                <Input id="name" {...register('name')} placeholder="เช่น ผัดไทย" />
                                {errors.name && (
                                    <p className="text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">ราคา (บาท) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    {...register('price')}
                                    placeholder="80"
                                />
                                {errors.price && (
                                    <p className="text-sm text-red-600">{errors.price.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">รายละเอียด *</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                placeholder="อธิบายรายละเอียดของเมนู"
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="categoryId">หมวดหมู่ *</Label>
                                <Select onValueChange={(value) => setValue('categoryId', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="เลือกหมวดหมู่" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.categoryId && (
                                    <p className="text-sm text-red-600">{errors.categoryId.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">สถานะ *</Label>
                                <Select onValueChange={(value: any) => setValue('status', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="เลือกสถานะ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">พร้อมจำหน่าย</SelectItem>
                                        <SelectItem value="unavailable">ไม่พร้อมจำหน่าย</SelectItem>
                                        <SelectItem value="out_of_stock">หมด</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-600">{errors.status.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="preparationTime">เวลาเตรียม (นาที)</Label>
                                <Input
                                    id="preparationTime"
                                    type="number"
                                    {...register('preparationTime')}
                                    placeholder="15"
                                />
                                {errors.preparationTime && (
                                    <p className="text-sm text-red-600">{errors.preparationTime.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">URL รูปภาพ</Label>
                                <Input
                                    id="image"
                                    {...register('image')}
                                    placeholder="https://example.com/image.jpg"
                                />
                                {errors.image && (
                                    <p className="text-sm text-red-600">{errors.image.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsDialogOpen(false)
                                    reset()
                                    setEditingItem(null)
                                }}
                            >
                                ยกเลิก
                            </Button>
                            <Button type="submit">
                                {editingItem ? 'บันทึกการแก้ไข' : 'เพิ่มรายการ'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <SuccessModal
                open={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                title="สำเร็จ!"
                description={`${editingItem ? 'แก้ไข' : 'เพิ่ม'}รายการอาหารเรียบร้อยแล้ว`}
            />
        </div>
    )
}

export default MenuItems
