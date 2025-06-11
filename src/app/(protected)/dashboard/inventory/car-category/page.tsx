import { CarCategoryHeader } from "./_components/car-category-header"
import { CarCategoryList } from "./_components/car-category-list"

const PageDashboardInventoryCarCategory = () => {
    return (
        <div className="flex flex-col gap-4">
            <CarCategoryHeader  />
            <CarCategoryList />
        </div>
    )
}

export default PageDashboardInventoryCarCategory