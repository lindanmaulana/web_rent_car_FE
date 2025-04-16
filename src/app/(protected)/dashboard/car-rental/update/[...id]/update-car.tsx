"use client"

import { ContentCrud } from "@/components/dashboard/crud/content-crud"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CarUpdateSchema, TypeCarUpdateSchema } from "@/schemas/car"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Car } from "../../../../../../../types/car"

interface CarRentalUpdateProps {
    idCar: string
    dataCar: Car
}
export const CarRentalUpdate = ({idCar, dataCar}: CarRentalUpdateProps) => {
    const form = useForm<TypeCarUpdateSchema>({
        resolver: zodResolver(CarUpdateSchema),
        defaultValues: {
            brand: dataCar.brand ?? "",
            model: dataCar.model,
            year: dataCar.year,
            license_plate: dataCar.license_plate,
            seats: dataCar.seats,
            price_per_day: dataCar.price_per_day,
        }
    })

    const handleForm = form.handleSubmit((values: TypeCarUpdateSchema) => {
        
    })
    return (
        <ContentCrud title="Car" titleAction="Update car">
            <Form {...form}>
                <form onSubmit={handleForm} className="space-y-6">
                <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="brand"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="brand..." type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="model"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Model</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="model..." type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="year"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="year..." type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="license_plate"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>License Plate</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="license plate..." type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="seats"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Seats</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="seats..." type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="price_per_day"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Price Per Day</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="price per day..." type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </ContentCrud>
    )
}