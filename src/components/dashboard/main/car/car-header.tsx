import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface DashboardMainCarHeaderProps {
    setParams: (params: string) => void
}
export const DashboardMainCarHeader = ({setParams}: DashboardMainCarHeaderProps) => {

    const handleChangeSeats = (seats: string) => {
        switch(seats) {
            case "reset":
                setParams("")
            break;
            default: 
            setParams(`seats=${seats}`)
        }
    }

    const handleChangeYear = (year: string) => {
        switch(year) {
            case "reset":
                setParams('')
            break;
            default: 
                setParams(`year=${year}`)
        }
    }

    const handleChangeStatus = (status: string) => {
        switch(status) {
            case "reset":
                setParams("")
            break;
            default:
                setParams(`status=${status}`)
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="w-1/2 flex items-center gap-3">
                <div className="relative w-full bg-white">
                    <Input type="text" placeholder="Search..." />
                </div>
                <Select onValueChange={handleChangeSeats}>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Seats" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Seats</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={handleChangeYear}>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Year</SelectItem>
                        <SelectItem value="2010">2018</SelectItem>
                        <SelectItem value="2019">2019</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={handleChangeStatus}>
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reset">Status</SelectItem>
                        <SelectItem value="AVAILABLE">Available</SelectItem>
                        <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                        <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Button size="sm" asChild>
                    <Link href="/dashboard/car-rental/add">Add Car</Link>
                </Button>
            </div>
        </div>
    )
}