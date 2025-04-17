"use client"

import { ButtonLoading } from "@/components/button-loading"
import { ContentCrud } from "@/components/dashboard/crud/content-crud"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CarUpdateSchema, TypeCarUpdateSchema } from "@/schemas/car"
import { UtilsCarUpdate } from "@/utils/car"
import { UtilsErrorConsumeAPI } from "@/utils/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Car } from "../../../../../../../types/car"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CarRentalUpdateProps {
    idCar: string
    dataCar: Car
    token?: string
}
export const CarRentalUpdate = ({idCar, dataCar, token}: CarRentalUpdateProps) => {
    const router = useRouter()
    const {mutate, isPending} = useMutation({
        mutationKey: ["updateCar"],
        mutationFn: (values) => UtilsCarUpdate({data: values, id: idCar, token})
    })

    const form = useForm<TypeCarUpdateSchema>({
        resolver: zodResolver(CarUpdateSchema),
        defaultValues: {
            brand: dataCar.brand,
            model: dataCar.model,
            year: dataCar.year,
            license_plate: dataCar.license_plate,
            seats: dataCar.seats,
            price_per_day: dataCar.price_per_day,
            status: dataCar.status
        }
    })

    const handleForm = form.handleSubmit((values: TypeCarUpdateSchema) => {
        mutate(values, {
            onSuccess: (data) => {
                toast.success(data.message)
                router.back()
            },

            onError: (err) => {
                toast.error(UtilsErrorConsumeAPI(err))
            }
        })
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
                        <div className="flex items-center gap-8">
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
                                name="status"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="AVAILABLE">Available</SelectItem>
                                                    <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                                                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
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
                    <ButtonLoading isLoading={isPending} type="submit">Update</ButtonLoading>
                </form>
            </Form>
        </ContentCrud>
    )
}