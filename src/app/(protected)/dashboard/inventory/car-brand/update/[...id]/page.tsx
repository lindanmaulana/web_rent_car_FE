"use client"

import { CarBrandUpdate } from "@/features/admin/dashboard/main/inventory/car-brand/update"
import { useParams } from "next/navigation"

const PageDashboardInventoryCarBrandUpdate = () => {
    const {id} = useParams<{id: string}>()
    
    return (
        <CarBrandUpdate id={id} />
    )
}

export default PageDashboardInventoryCarBrandUpdate