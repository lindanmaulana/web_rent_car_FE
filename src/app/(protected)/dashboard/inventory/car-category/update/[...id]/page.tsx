'use client'

import { CarCategoryUpdate } from "@/features/admin/dashboard/main/inventory/car-category/update"
import { useParams } from "next/navigation"

const PageDashboardInventoryCarCategoryUpdate = () => {
    const {id} = useParams<{id: string}>()
    return (
        <CarCategoryUpdate id={id} />
    )
}

export default PageDashboardInventoryCarCategoryUpdate