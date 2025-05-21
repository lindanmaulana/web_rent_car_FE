"use client"

import { Form, FormField } from "@/components/ui/form"
import { RentalSchema, TypeRentalCreateSchema } from "@/schemas/rental"
import { UtilsRentalCreate } from "@/utils/services/rental"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

interface CarRentalProps {
    id: string
}

export const CarRental = ({id}: CarRentalProps) => {
    const session = useSession()

    const createRental = useMutation({
        mutationKey: ["rentalCreate"],
        mutationFn: (data: TypeRentalCreateSchema) => UtilsRentalCreate({token: session.data?.user.token, data})
    })

    const form = useForm<TypeRentalCreateSchema>({
        resolver: zodResolver(RentalSchema.CREATE)
    })

    const handleForm = form.handleSubmit((values: TypeRentalCreateSchema) => {
        createRental.mutate(values, {
            onSuccess: (data) => {

            },

            onError: (err) => {

            }
        })
    })
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            hello world {id}
            <Form {...form}>
                <form onSubmit={handleForm} className="space-y-6">
                    <div className="space-y-4"> 
                        {/* <FormField 
                        
                        /> */}
                        {/* <FormField 
                            control={form.control}
                            name="total_day"
                        /> */}
                    </div>
                </form>
            </Form>
        </div>
    )
}