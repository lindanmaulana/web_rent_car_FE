"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
interface HeaderCrudProps {
    title: string
    titleAction: string
}
export const HeaderCrud = ({title, titleAction}: HeaderCrudProps) => {
    const router = useRouter()

    return (
        <div className="w-full flex items-center justify-between">
            <h3 className="text-3xl font-semibold">{title}</h3>

            <div className="flex items-center gap-3">
                <Button size="sm" variant="link" onClick={() => router.back()}>
                    Back
                </Button>
                <Button size="sm" asChild>
                    <p>{titleAction}</p>
                </Button>
            </div>
        </div>
    )
}