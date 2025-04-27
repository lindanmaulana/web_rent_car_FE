"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { ReactNode } from "react"

interface AlertConfirmationProps {
    children: ReactNode
    title: string
    description?: string
    titleCancel?: string
    titleConfirm?: string 
    handleConfirm?: () => void
}
export const AlertConfirmation = (props: AlertConfirmationProps) => {
    const {children, title, description, titleCancel = "Cancel", titleConfirm = "Confirm", handleConfirm} = props
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{titleCancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>{titleConfirm}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}