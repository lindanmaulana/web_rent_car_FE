import React, { ReactNode } from "react"
import { Button } from "./ui/button"
import { TbLoaderQuarter } from "react-icons/tb"

interface ButtonLoadingProps {
    isLoading: boolean
    type: "submit" | "reset" | "button"
    className?: string
    children: ReactNode
}
export const ButtonLoading = (props: ButtonLoadingProps) => {
    const {isLoading, type, className, children} = props
    return (
        <Button type={type} className={className}>
            {isLoading ? (
                <TbLoaderQuarter className="animate-spin" />
            ): (
                children
            )}
        </Button>
    )
}