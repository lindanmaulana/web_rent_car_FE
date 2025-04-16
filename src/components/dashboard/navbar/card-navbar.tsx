import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ReactNode } from "react"
import { NavbarHeader } from "./navbar-header"
import { NavbarList } from "./navbar-list"

interface CardNavbarProps {
    headerTitle: string
    children: ReactNode
}
export const CardNavbar = ({headerTitle, children}: CardNavbarProps) => {
    return (
        <Card className="border-none shadow-none ">
            <CardHeader>
                <NavbarHeader title={headerTitle} />
            </CardHeader>
            <CardContent>
                <NavbarList>{children}</NavbarList>
            </CardContent>
        </Card>
    )
}