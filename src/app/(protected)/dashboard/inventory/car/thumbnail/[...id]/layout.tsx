import { Crud } from "@/app/(protected)/dashboard/_components/layout-crud"
import { ReactNode } from "react"

interface LayoutCarThumbnailProps {
    children: ReactNode
}
const LayoutCarThumbnail = ({children}: LayoutCarThumbnailProps) => {
    return (
            <Crud title="Thumbnail" titleAction="Thumbnail Car">
                {children}
            </Crud>
    )
}

export default LayoutCarThumbnail