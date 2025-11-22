import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldAlert } from 'lucide-react'

const Unauthorized: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <ShieldAlert className="w-8 h-8 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl">ไม่มีสิทธิ์เข้าถึง</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-gray-600">
                        คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบหากคุณคิดว่านี่เป็นข้อผิดพลาด
                    </p>
                    <Button onClick={() => navigate('/dashboard')} className="w-full">
                        กลับสู่หน้าหลัก
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Unauthorized
