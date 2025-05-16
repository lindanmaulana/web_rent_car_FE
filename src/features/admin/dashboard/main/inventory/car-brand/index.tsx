import { DashboardMainCarBrandHeader } from "./brand-header"
import { DashboardMainCarBrandItem } from "./brand-item"

export const DashboardMainCarBrand = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <DashboardMainCarBrandHeader />
            <DashboardMainCarBrandItem />
        </div>
    )
}