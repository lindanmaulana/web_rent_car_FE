"use client"
import { DatePicker } from "@/components/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { searchParamsRental } from "."
import Link from "next/link"
import { Button } from "@/components/ui/button"
interface RentalHeaderProps {
    setParams: (param: searchParamsRental) => void
    params: searchParamsRental
}
export const DashboardMainRentalHeader = ({params, setParams}: RentalHeaderProps) => {
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const handleChangeStartDate = (date?: Date): void => {
        setStartDate(date)
        setParams({...params, start_date: `start_date=${date?.toISOString()}`})
    }

    const handleChangeEndDate = (date?: Date): void => {
        setEndDate(date)
        setParams({...params, end_date: `end_date=${date?.toISOString()}`})
    }

    const handleChangeStatus = (status: string) => {
        switch(status) {
            case "reset":
                setParams({...params, status: ''})
            break;
            default: 
                setParams({...params, status: `status=${status}`})
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="w-1/2 flex items-center gap-3">
                <DatePicker title="Mulai sewa" date={startDate} setDate={handleChangeStartDate} />
                <DatePicker title="Selesai sewa" date={endDate} setDate={handleChangeEndDate} />
                <Select onValueChange={handleChangeStatus}>
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVE">Approve</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>  
            <div>
                <Button size="sm" asChild>
                    <Link href="/dashboard/rental/add">Add</Link>
                </Button>
            </div>
        </div>
    )
}

// car_id: "",
// start_date: "",
// end_date: "",
// status: ''

