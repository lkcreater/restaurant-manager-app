import { z } from 'zod'

// Menu Item Validation Schema
export const menuItemSchema = z.object({
    name: z.string().min(1, 'กรุณากรอกชื่อเมนู').max(100, 'ชื่อเมนูต้องไม่เกิน 100 ตัวอักษร'),
    description: z.string().min(1, 'กรุณากรอกรายละเอียด').max(500, 'รายละเอียดต้องไม่เกิน 500 ตัวอักษร'),
    price: z.coerce.number().min(1, 'ราคาต้องมากกว่า 0').max(100000, 'ราคาต้องไม่เกิน 100,000'),
    categoryId: z.string().min(1, 'กรุณาเลือกหมวดหมู่'),
    status: z.enum(['available', 'unavailable', 'out_of_stock'], {
        required_error: 'กรุณาเลือกสถานะ',
    }),
    preparationTime: z.coerce.number().min(0, 'เวลาเตรียมต้องไม่ติดลบ').max(300, 'เวลาเตรียมต้องไม่เกิน 300 นาที').optional(),
    image: z.string().url('URL รูปภาพไม่ถูกต้อง').optional().or(z.literal('')),
})

export type MenuItemFormData = z.infer<typeof menuItemSchema>

// Category Validation Schema
export const categorySchema = z.object({
    name: z.string().min(1, 'กรุณากรอกชื่อหมวดหมู่').max(50, 'ชื่อหมวดหมู่ต้องไม่เกิน 50 ตัวอักษร'),
    description: z.string().max(200, 'รายละเอียดต้องไม่เกิน 200 ตัวอักษร').optional(),
    icon: z.string().optional(),
    order: z.coerce.number().min(0, 'ลำดับต้องไม่ติดลบ').max(999, 'ลำดับต้องไม่เกิน 999'),
})

export type CategoryFormData = z.infer<typeof categorySchema>

// Table Validation Schema
export const tableSchema = z.object({
    number: z.string().min(1, 'กรุณากรอกหมายเลขโต๊ะ').max(10, 'หมายเลขโต๊ะต้องไม่เกิน 10 ตัวอักษร'),
    capacity: z.coerce.number().min(1, 'จำนวนที่นั่งต้องมากกว่า 0').max(50, 'จำนวนที่นั่งต้องไม่เกิน 50'),
    status: z.enum(['available', 'occupied', 'reserved', 'cleaning'], {
        required_error: 'กรุณาเลือกสถานะ',
    }),
    location: z.string().max(50, 'ตำแหน่งต้องไม่เกิน 50 ตัวอักษร').optional(),
})

export type TableFormData = z.infer<typeof tableSchema>

// Order Validation Schema
export const orderSchema = z.object({
    tableId: z.string().min(1, 'กรุณาเลือกโต๊ะ'),
    items: z.array(z.object({
        menuItemId: z.string().min(1, 'กรุณาเลือกเมนู'),
        quantity: z.coerce.number().min(1, 'จำนวนต้องมากกว่า 0'),
        notes: z.string().optional(),
    })).min(1, 'กรุณาเพิ่มรายการอาหารอย่างน้อย 1 รายการ'),
    notes: z.string().max(500, 'หมายเหตุต้องไม่เกิน 500 ตัวอักษร').optional(),
})

export type OrderFormData = z.infer<typeof orderSchema>

// User Validation Schema
export const userSchema = z.object({
    name: z.string().min(1, 'กรุณากรอกชื่อ').max(100, 'ชื่อต้องไม่เกิน 100 ตัวอักษร'),
    email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
    password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร').optional(),
    role: z.enum(['admin', 'manager', 'staff'], {
        required_error: 'กรุณาเลือกบทบาท',
    }),
    avatar: z.string().url('URL รูปภาพไม่ถูกต้อง').optional().or(z.literal('')),
})

export type UserFormData = z.infer<typeof userSchema>
