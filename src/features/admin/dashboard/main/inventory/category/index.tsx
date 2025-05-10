"use client"

import { Suspense, useState } from "react"
import { DashboardMainCategoryHeader } from "./category-header"
import { DashboardMainCategoryItem } from "./category-item"

interface searchParamsCategory {
    keyword: string
}
export const DashboardMainCategory = () => {
    const [params, setParams] = useState<searchParamsCategory>({
        keyword: ''
    })

    const handleDelete = (id: string) => {
        
    }

    return (
        <div className="flex flex-col gap-4">
            <DashboardMainCategoryHeader />
            <Suspense fallback={<p>Loading...</p>}>
                <DashboardMainCategoryItem />
            </Suspense>
        </div>
    )
}