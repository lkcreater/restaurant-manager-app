import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { SuccessModal } from '@/components/SuccessModal'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { categorySchema, type CategoryFormData } from '@/utils/validation'

const Categories: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<any>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            order: 0,
        },
    })

    const [categories, setCategories] = useState([
        { id: '1', name: 'อาหารจานหลัก', description: 'เมนูอาหารหลักของร้าน', itemCount: 25, order: 1 },
        { id: '2', name: 'ซุป', description: 'ซุปและแกงต่างๆ', itemCount: 12, order: 2 },
        { id: '3', name: 'สลัด', description: 'สลัดและผักสด', itemCount: 8, order: 3 },
        { id: '4', name: 'เครื่องดื่ม', description: 'เครื่องดื่มทุกประเภท', itemCount: 15, order: 4 },
    ])

    const onSubmit = (data: CategoryFormData) => {
        console.log('Form data:', data)

        if (editingCategory) {
            setCategories(cats =>
                cats.map(cat =>
                    cat.id === editingCategory.id
                        ? { ...cat, ...data }
                        : cat
                )
            )
        } else {
            const newCategory = {
                id: String(categories.length + 1),
                ...data,
                itemCount: 0,
            }
            setCategories([...categories, newCategory])
        }

        setIsDialogOpen(false)
        setIsSuccessOpen(true)
        reset({ order: 0 })
        setEditingCategory(null)
    }

    const handleEdit = (category: any) => {
        setEditingCategory(category)
        setValue('name', category.name)
        setValue('description', category.description || '')
        setValue('icon', category.icon || '')
        setValue('order', category.order)
        setIsDialogOpen(true)
    }

    const handleDelete = (id: string) => {
        if (confirm('คุณต้องการลบหมวดหมู่นี้หรือไม่?')) {
            setCategories(cats => cats.filter(cat => cat.id !== id))
        }
    }

    const handleAddNew = () => {
        setEditingCategory(null)
        reset({ order: categories.length + 1 })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">หมวดหมู่</h1>
                    <p className="text-gray-500 mt-1">จัดการหมวดหมู่อาหาร</p>
                </div>
                <Button className="gap-2" onClick={handleAddNew}>
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
                                <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => handleEdit(category)}>
                                    <Edit className="w-4 h-4" />
                                    แก้ไข
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => handleDelete(category.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่'}</DialogTitle>
                        <DialogDescription>
                            กรอกข้อมูลหมวดหมู่ให้ครบถ้วน
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">ชื่อหมวดหมู่ *</Label>
                            <Input id="name" {...register('name')} placeholder="เช่น อาหารจานหลัก" />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">รายละเอียด</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                placeholder="อธิบายรายละเอียดของหมวดหมู่"
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="icon">ไอคอน</Label>
                                <Input id="icon" {...register('icon')} placeholder="🍜" />
                                {errors.icon && (
                                    <p className="text-sm text-red-600">{errors.icon.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order">ลำดับ *</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    {...register('order')}
                                    placeholder="1"
                                />
                                {errors.order && (
                                    <p className="text-sm text-red-600">{errors.order.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsDialogOpen(false)
                                    reset({ order: 0 })
                                    setEditingCategory(null)
                                }}
                            >
                                ยกเลิก
                            </Button>
                            <Button type="submit">
                                {editingCategory ? 'บันทึกการแก้ไข' : 'เพิ่มหมวดหมู่'}
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
                description={`${editingCategory ? 'แก้ไข' : 'เพิ่ม'}หมวดหมู่เรียบร้อยแล้ว`}
            />
        </div>
    )
}

export default Categories
