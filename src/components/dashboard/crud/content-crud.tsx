import { Card, CardContent } from "@/components/ui/card"
import { HeaderCrud } from "./header-crud"
import { ReactNode } from "react"

interface ContentCrudProps {
    title: string
    titleAction: string
    children: ReactNode
}
export const ContentCrud = (props: ContentCrudProps) => {
    const {title, titleAction, children} = props

    return (
        <div className="space-y-2">
            <HeaderCrud title={title} titleAction={titleAction} />
            <Card>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}