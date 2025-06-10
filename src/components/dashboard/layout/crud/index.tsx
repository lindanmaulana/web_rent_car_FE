import { ReactNode } from "react"
import { ContentCrud } from "./content-crud"
import { HeaderCrud } from "./header-crud"

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