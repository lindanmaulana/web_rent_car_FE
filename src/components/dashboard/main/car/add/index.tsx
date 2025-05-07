"use client"

import { Crud } from "@/components/dashboard/crud"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CarCreateSchema, TypeCarCreateSchema } from "@/schemas/car"
import { UtilsCarCreate } from "@/utils/car"
import { UtilsErrorConsumeAPI } from "@/utils/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"


export const CarRentalAdd = () => {
    const {data: session, status} = useSession()
    const router = useRouter()

    const {mutate} = useMutation({
        mutationKey: ["carAdd"],
        mutationFn: (values) => UtilsCarCreate(values, session?.user.token)
    })

    const form = useForm<TypeCarCreateSchema>({
        resolver: zodResolver(CarCreateSchema),
        defaultValues: {
            brand: "",
            model: "",
            year: "",
            license_plate: "",
            seats: "",
            price_per_day: ""
        }
    })

    const handleForm = form.handleSubmit((values: TypeCarCreateSchema) => {
        mutate(values, {
            onSuccess: (data) => {
                toast.success(data.message)
                form.reset()
                router.replace("/dashboard/car-rental")
            },

            onError: (err) => {
                toast.error(UtilsErrorConsumeAPI(err))
            }
        })
    })

    if(status === "loading") return null;

    return (
        <Crud title="Car" titleAction="New Car">
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
                    <Button type="submit">Create</Button>
                </form>
            </Form>
        </Crud>
    )
}