"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { searchParamsCar } from "."
import { useMemo } from "react"
import debounce from "lodash.debounce"
import { RiFunctionAddFill } from "react-icons/ri"
interface CarHeaderProps {
    setParams: (param: searchParamsCar) => void
    params: searchParamsCar
}

export const DashboardMainCarHeader = ({params, setParams}: CarHeaderProps) => {
    const handleChangeSeats = (seats: string) => {
        switch(seats) {
            case "reset":
                setParams({...params, seats: ''})
            break;
            default: 
            setParams({...params, seats: `seats=${seats}`})
        }
    }

    const handleChangeYear = (year: string) => {
        switch(year) {
            case "reset":
                setParams({...params, year: ''})
            break;
            default: 
                setParams({...params, year: `year=${year}`})
        }
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

    const debounceSearch = useMemo(() => debounce((keyword: string) => {
        setParams({...params, keyword: `keyword=${keyword}`})

    }, 1000), [setParams, params])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounceSearch(e.target.value)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="w-1/2 flex items-center gap-3">
                <div className="relative w-full bg-white">
                    <Input type="text" placeholder="Search..." onChange={handleSearch} />
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
                    <Link href="/dashboard/inventory/car/add" className="flex items-center gap-2"><RiFunctionAddFill /> Add</Link>
                </Button>
            </div>
        </div>
    )
}