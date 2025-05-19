"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ReactNode } from "react"

interface LinkQueryProps {
    children: ReactNode
    href: string
    className?: string
}
export const LinkQuery = ({children, href, className}: LinkQueryProps) => {
    const urlParams = useSearchParams()

    return (
        <Link href={`${href}?${urlParams.toString()}`} className={`${className}`}>{children}</Link>
    )
}