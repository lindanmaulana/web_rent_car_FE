import { Crud } from "@/app/(protected)/dashboard/_components/layout-crud"
import { ReactNode } from "react"

interface LayoutCarBrandUpdateProps {
    children: ReactNode
}
const LayoutCarBrandUpdate = ({children}: LayoutCarBrandUpdateProps) => {
    return (
        <Crud title="Car Category" titleAction="Update" className="bg-white">
            {children}
        </Crud>
    )
}

export default LayoutCarBrandUpdate