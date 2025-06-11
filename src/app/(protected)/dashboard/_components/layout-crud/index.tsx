import { ReactNode } from "react"
import { HeaderCrud } from "@/app/(protected)/dashboard/_components/layout-crud/header-crud"
import { ContentCrud } from "@/app/(protected)/dashboard/_components/layout-crud/content-crud"

interface CrudProps {
    title: string
    titleAction: string
    children: ReactNode
    className?: string
}
export const Crud = ({title, titleAction, children, className}: CrudProps) => {
    return (
        <div className={`${className} space-y-2`}>
            <HeaderCrud title={title} titleAction={titleAction} />
            <ContentCrud>
                {children}
            </ContentCrud>
        </div>
    )
}