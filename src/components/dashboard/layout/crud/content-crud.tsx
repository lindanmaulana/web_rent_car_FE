import { Card, CardContent } from "@/components/ui/card"
import { ReactNode } from "react"

interface ContentCrudProps {
    children: ReactNode
}
export const ContentCrud = (props: ContentCrudProps) => {
    const {children} = props

    return (
            <Card>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
    )
}