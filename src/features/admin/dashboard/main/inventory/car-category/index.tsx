"use client"

import { Suspense } from "react"
import { DashboardMainCategoryHeader } from "./category-header"
import { DashboardMainCategoryItem } from "./category-item"


export const DashboardMainCarCategory = () => {
    return (
        <div className="flex flex-col gap-4">
            <DashboardMainCategoryHeader  />
            <Suspense fallback={<p>Loading...</p>}>
                <DashboardMainCategoryItem />
            </Suspense>
        </div>
    )
}