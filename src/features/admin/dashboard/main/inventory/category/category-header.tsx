import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const DashboardMainCategoryHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="min-w-[40%]">
                <Input type="text" name="name-category" placeholder="Search car category name..." />
            </div>
            <Button>Add</Button>
        </div>
    )
}