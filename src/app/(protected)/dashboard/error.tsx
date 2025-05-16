"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface PageDashboardErrorProps {
    error: Error
    reset: () => void
}
const PageDashboardError = ({error}: PageDashboardErrorProps) => {
    const router = useRouter()
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <figure>
                <Image src="/404.png" alt="404" width={200} height={200} />
            </figure>
            <h4 className="text-2xl font-medium">{error.message ? error.message : "Something went wrong"}...</h4>
            <p className="max-w-78 text-sm text-center text-black/50">The page you are looking for does not exist or an unexpected error occurred</p>
            <div className="flex items-center gap-1">
                <Button onClick={() => router.back()} size="sm" variant="link">Back</Button>
                <Button onClick={() => router.refresh()} size="sm" variant="default">Refresh</Button>
                <Button onClick={() => signOut()} size="sm" variant="ghost" className="bg-primary-blue text-white">Login</Button>
            </div>
        </div>
    )
}

export default PageDashboardError