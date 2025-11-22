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
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { userSchema, type UserFormData } from '@/utils/validation'

const Users: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<any>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: 'staff',
        },
    })

    const [users, setUsers] = useState([
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
    ])

    const onSubmit = (data: UserFormData) => {
        console.log('Form data:', data)

        if (editingUser) {
            setUsers(usrs =>
                usrs.map(usr =>
                    usr.id === editingUser.id ? { ...usr, ...data } : usr
                )
            )
        } else {
            const newUser = {
                id: String(users.length + 1),
                ...data,
            }
            setUsers([...users, newUser])
        }

        setIsDialogOpen(false)
        setIsSuccessOpen(true)
        reset({ role: 'staff' })
        setEditingUser(null)
    }

    const handleEdit = (user: any) => {
        setEditingUser(user)
        setValue('name', user.name)
        setValue('email', user.email)
        setValue('role', user.role)
        setValue('avatar', user.avatar || '')
        setValue('password', '') // Don't populate password for editing
        setIsDialogOpen(true)
    }

    const handleDelete = (id: string) => {
        if (confirm('คุณต้องการลบผู้ใช้งานนี้หรือไม่?')) {
            setUsers(usrs => usrs.filter(usr => usr.id !== id))
        }
    }

    const handleAddNew = () => {
        setEditingUser(null)
        reset({ role: 'staff' })
        setIsDialogOpen(true)
    }

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
                <Button className="gap-2" onClick={handleAddNew}>
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
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-600 hover:text-red-700"
                                            onClick={() => handleDelete(user.id)}
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

            {/* Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingUser ? 'แก้ไขผู้ใช้งาน' : 'เพิ่มผู้ใช้งาน'}</DialogTitle>
                        <DialogDescription>
                            กรอกข้อมูลผู้ใช้งานให้ครบถ้วน
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                            <Input id="name" {...register('name')} placeholder="สมชาย ใจดี" />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">อีเมล *</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email')}
                                placeholder="example@restaurant.com"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">
                                รหัสผ่าน {editingUser ? '(เว้นว่างหากไม่ต้องการเปลี่ยน)' : '*'}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">บทบาท *</Label>
                            <Select onValueChange={(value: any) => setValue('role', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="เลือกบทบาท" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">ผู้ดูแลระบบ</SelectItem>
                                    <SelectItem value="manager">ผู้จัดการ</SelectItem>
                                    <SelectItem value="staff">พนักงาน</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-sm text-red-600">{errors.role.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="avatar">URL รูปโปรไฟล์</Label>
                            <Input
                                id="avatar"
                                {...register('avatar')}
                                placeholder="https://example.com/avatar.jpg"
                            />
                            {errors.avatar && (
                                <p className="text-sm text-red-600">{errors.avatar.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsDialogOpen(false)
                                    reset({ role: 'staff' })
                                    setEditingUser(null)
                                }}
                            >
                                ยกเลิก
                            </Button>
                            <Button type="submit">
                                {editingUser ? 'บันทึกการแก้ไข' : 'เพิ่มผู้ใช้งาน'}
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
                description={`${editingUser ? 'แก้ไข' : 'เพิ่ม'}ผู้ใช้งานเรียบร้อยแล้ว`}
            />
        </div>
    )
}

export default Users
