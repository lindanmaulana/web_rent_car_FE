import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const DashboardMainRentalHeader = () => {
    return (
        <div className="flex items-center">
            <div className="w-1/2">
                <Select>
                    <SelectTrigger>
                        <SelectValue>Status</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                </Select>
            </div>  
        </div>
    )
}