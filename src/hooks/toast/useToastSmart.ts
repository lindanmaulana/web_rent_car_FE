"use client"

import { useEffect, useRef } from "react"
import { toast } from "sonner"

interface useToastSmartProps {
    isLoading: boolean
    isError: boolean
    error?: string
}
export const useToastSmart = ({isLoading, isError, error}: useToastSmartProps) => {
    const toastLoading = useRef<string | number | null>(null)
    const toastError = useRef(false)

    useEffect(() => {
        if(isLoading && !toastLoading.current) {
            toastLoading.current = toast.loading("Loading...")
        }

        if(!isLoading && toastLoading.current) {
            toast.dismiss(toastLoading.current)
            toastLoading.current = null
        }

        if(isError && !toastError.current) {
            toast.error(error)
            toastError.current = true
        }

        if(!isError && toastError.current) {
            toastError.current = false
        }
    }, [isLoading, isError, error])
}