import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

interface SuccessModalProps {
    open: boolean
    onClose: () => void
    title: string
    description: string
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
    open,
    onClose,
    title,
    description,
}) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
                    <DialogDescription className="text-center text-base">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center mt-4">
                    <Button onClick={onClose} className="w-full sm:w-auto px-8">
                        ตกลง
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
