import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ReactNode } from "react"
import { SidebarHeader } from "./sidebar-header"

interface SidebarLayoutProps {
    headerTitle: string
    children: ReactNode
}
export const SidebarLayout = ({headerTitle, children}: SidebarLayoutProps) => {
    return (
        <Card className="border-none shadow-none ">
            <CardHeader>
                <SidebarHeader title={headerTitle} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}