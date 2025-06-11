"use client"

import { useParams } from "next/navigation"
import { CarBrandUpdateForm } from "./_components/car-brand-update-form"

const PageDashboardInventoryCarBrandUpdate = () => {
    const {id} = useParams<{id: string}>()
    
    return (
        <CarBrandUpdateForm id={id} />
    )
}

export default PageDashboardInventoryCarBrandUpdate