import { ReactNode } from "react"
import { ContentCrud } from "./content-crud"
import { HeaderCrud } from "./header-crud"

interface CrudProps {
    title: string
    titleAction: string
    children: ReactNode
}
export const Crud = ({title, titleAction, children}: CrudProps) => {
    return (
        <div className="space-y-2">
            <HeaderCrud title={title} titleAction={titleAction} />
            <ContentCrud>
                {children}
            </ContentCrud>
    </div>
    )
}