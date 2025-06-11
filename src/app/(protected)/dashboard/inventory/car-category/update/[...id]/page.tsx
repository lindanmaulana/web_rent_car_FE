'use client'

import { useParams } from "next/navigation"
import { CarCategoryUpdateForm } from "./_components/car-category-update-form"

const PageDashboardInventoryCarCategoryUpdate = () => {
    const {id} = useParams<{id: string}>()
    return (
        <CarCategoryUpdateForm id={id} />
    )
}

export default PageDashboardInventoryCarCategoryUpdate