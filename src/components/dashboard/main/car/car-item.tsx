"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Banknote, CalendarRange, CarFront, User, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car } from "../../../../../types/car"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UtilsCarDelete } from "@/utils/car"
import { UtilsErrorConsumeAPI } from "@/utils/errors"

interface DashboardMainCarItemProps {
    data: Car[]
}
export const DashboardMainCarItem = ({data}: DashboardMainCarItemProps) => {
    const pathname = usePathname()
    const queryClient = useQueryClient()
    const {data: Session, status} = useSession()
    const {mutate} = useMutation({
        mutationKey: ["deleteCar"],
        mutationFn: (id: string) => UtilsCarDelete({id, token: Session?.user.token})
    })

    const handleDelete = (id: string) => {
        toast("Confirmation delete this car ?", {
            action: {
                label: "Delete",
                onClick: () => mutate(id, {
                    onSuccess: (data) => {
                        toast(data.message)
                        queryClient.invalidateQueries({queryKey: ["getAllCar"]})
                    },
                    
                    onError: (err) => {
                        toast(UtilsErrorConsumeAPI(err))
                    }
                })
            },
            position: "bottom-right",
        })
    }   

    if(status === "loading") return toast("Loading session...")

    return (
        <div className="w-full">
            <Table className="w-full bg-red-50">
                <TableBody>
                    {data.length > 0 ? data.map((car: Car) => (
                        <TableRow key={car.id} className="bg-white">
                            <TableCell>
                                <Image src="/images/car-default.png" alt="car-default" width={140} height={30} />
                            </TableCell>
                            <TableCell>
                                <span className="text-xs text-slate-blue">{car.brand}</span>
                                <h5 className="text-xl font-semibold text-primary">{car.model}</h5>
                                <span className="bg-primary text-white text-xs px-2 lowercase rounded">{car.status}</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col items-center justify-center">
                                    <CarFront size={16} className="bg-slate-blue/40 rounded p-px" />
                                    <span className="text-xs text-slate-blue">Brand</span>
                                    <h4 className="text-base text-primary font-semibold">{car.brand}</h4>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col items-center justify-center">
                                    <CalendarRange size="16" className="bg-slate-blue/40 rounded p-px" />
                                    <span className="text-xs text-slate-blue">Year</span>
                                    <h4 className="text-base text-primary font-semibold">{car.year}</h4>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col items-center justify-center">
                                    <User size="16" className="bg-slate-blue/40 rounded p-px" />
                                    <span className="text-xs text-slate-blue">Capacity</span>
                                    <h4 className="text-base text-primary font-semibold">{car.seats} Seats</h4>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col items-center justify-center">
                                    <Banknote size={16} className="bg-slate-blue/40 rounded p-px" />
                                    <span className="text-xs text-slate-blue">Price</span>
                                    <h4><span className="text-primary font-semibold">Rp {car.price_per_day}</span>/days</h4>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button>Select</Button>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" asChild>
                                        <Link href={`${pathname}/update/${car.id}`}>Update</Link>
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(car.id)}>Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )): (
                        <TableRow>
                            <TableCell colSpan={9} rowSpan={9} className="text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <Image src="/images/car-default.png" alt="car rent" width={300} height={120} />
                                    <p className="flex items-center text-2xl justify-center italic font-semibold text-red-500">Car not found! <X /></p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}