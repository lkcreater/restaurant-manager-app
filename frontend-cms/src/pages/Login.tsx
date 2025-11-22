import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Mail, AlertCircle } from 'lucide-react'

const loginSchema = z.object({
    email: z.string().email('กรุณากรอกอีเมลให้ถูกต้อง'),
    password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
})

type LoginFormData = z.infer<typeof loginSchema>

const Login: React.FC = () => {
    const { login } = useAuth()
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError('')
            setIsLoading(true)
            await login(data)
        } catch (err: any) {
            setError(err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="shadow-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">เข้าสู่ระบบ</CardTitle>
                <CardDescription className="text-center">
                    กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">อีเมล</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                className="pl-10"
                                {...register('email')}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">รหัสผ่าน</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                {...register('password')}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Demo credentials:</p>
                    <p className="font-mono text-xs mt-1">admin@restaurant.com / password123</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default Login
