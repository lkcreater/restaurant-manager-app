import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Plus } from 'lucide-react'
import { tableSchema, type TableFormData } from '@/utils/validation'

const Tables: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [editingTable, setEditingTable] = useState<any>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<TableFormData>({
        resolver: zodResolver(tableSchema),
        defaultValues: {
            status: 'available',
            capacity: 4,
        },
    })

    const [tables, setTables] = useState([
        { id: '1', number: 'A1', capacity: 4, status: 'available', location: 'ชั้น 1' },
        { id: '2', number: 'A2', capacity: 4, status: 'occupied', location: 'ชั้น 1' },
        { id: '3', number: 'A3', capacity: 2, status: 'available', location: 'ชั้น 1' },
        { id: '4', number: 'B1', capacity: 6, status: 'reserved', location: 'ชั้น 2' },
        { id: '5', number: 'B2', capacity: 8, status: 'available', location: 'ชั้น 2' },
        { id: '6', number: 'B3', capacity: 4, status: 'cleaning', location: 'ชั้น 2' },
    ])

    const onSubmit = (data: TableFormData) => {
        console.log('Form data:', data)

        if (editingTable) {
            setTables(tbls =>
                tbls.map(tbl =>
                    tbl.id === editingTable.id ? { ...tbl, ...data } : tbl
                )
            )
        } else {
            const newTable = {
                id: String(tables.length + 1),
                ...data,
            }
            setTables([...tables, newTable])
        }

        setIsDialogOpen(false)
        setIsSuccessOpen(true)
        reset({ status: 'available', capacity: 4 })
        setEditingTable(null)
    }

    const handleEdit = (table: any) => {
        setEditingTable(table)
        setValue('number', table.number)
        setValue('capacity', table.capacity)
        setValue('status', table.status)
        setValue('location', table.location || '')
        setIsDialogOpen(true)
    }

    const handleAddNew = () => {
        setEditingTable(null)
        reset({ status: 'available', capacity: 4 })
        setIsDialogOpen(true)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-700 border-green-200'
            case 'occupied':
                return 'bg-red-100 text-red-700 border-red-200'
            case 'reserved':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200'
            case 'cleaning':
                return 'bg-blue-100 text-blue-700 border-blue-200'
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'available':
                return 'ว่าง'
            case 'occupied':
                return 'ไม่ว่าง'
            case 'reserved':
                return 'จอง'
            case 'cleaning':
                return 'กำลังทำความสะอาด'
            default:
                return status
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">โต๊ะ</h1>
                    <p className="text-gray-500 mt-1">จัดการโต๊ะทั้งหมด</p>
                </div>
                <Button className="gap-2" onClick={handleAddNew}>
                    <Plus className="w-4 h-4" />
                    เพิ่มโต๊ะ
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tables.map((table) => (
                    <Card
                        key={table.id}
                        className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-2 ${getStatusColor(
                            table.status
                        )}`}
                        onClick={() => handleEdit(table)}
                    >
                        <CardContent className="p-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">โต๊ะ {table.number}</h3>
                                <p className="text-sm text-gray-600 mb-3">{table.location}</p>
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span className="text-gray-700">{table.capacity} ที่นั่ง</span>
                                </div>
                                <span
                                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                                        table.status
                                    )}`}
                                >
                                    {getStatusText(table.status)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingTable ? 'แก้ไขโต๊ะ' : 'เพิ่มโต๊ะ'}</DialogTitle>
                        <DialogDescription>
                            กรอกข้อมูลโต๊ะให้ครบถ้วน
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="number">หมายเลขโต๊ะ *</Label>
                                <Input id="number" {...register('number')} placeholder="A1" />
                                {errors.number && (
                                    <p className="text-sm text-red-600">{errors.number.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="capacity">จำนวนที่นั่ง *</Label>
                                <Input
                                    id="capacity"
                                    type="number"
                                    {...register('capacity')}
                                    placeholder="4"
                                />
                                {errors.capacity && (
                                    <p className="text-sm text-red-600">{errors.capacity.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">สถานะ *</Label>
                            <Select onValueChange={(value: any) => setValue('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกสถานะ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">ว่าง</SelectItem>
                                    <SelectItem value="occupied">ไม่ว่าง</SelectItem>
                                    <SelectItem value="reserved">จอง</SelectItem>
                                    <SelectItem value="cleaning">กำลังทำความสะอาด</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-sm text-red-600">{errors.status.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">ตำแหน่ง</Label>
                            <Input id="location" {...register('location')} placeholder="ชั้น 1" />
                            {errors.location && (
                                <p className="text-sm text-red-600">{errors.location.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsDialogOpen(false)
                                    reset({ status: 'available', capacity: 4 })
                                    setEditingTable(null)
                                }}
                            >
                                ยกเลิก
                            </Button>
                            <Button type="submit">
                                {editingTable ? 'บันทึกการแก้ไข' : 'เพิ่มโต๊ะ'}
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
                description={`${editingTable ? 'แก้ไข' : 'เพิ่ม'}โต๊ะเรียบร้อยแล้ว`}
            />
        </div>
    )
}

export default Tables
