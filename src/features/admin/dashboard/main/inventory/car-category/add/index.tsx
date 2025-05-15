'use client'

import { ButtonLoading } from "@/components/button-loading"
import { Crud } from "@/components/dashboard/crud"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CarCategorySchema, TypeCarCategoryAddSchema } from "@/schemas/car-category"
import { UtilsCarCategoryAdd } from "@/utils/car-category"
import { UtilsErrorConsumeAPI } from "@/utils/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const CarCategoryAdd = () => {
    const {data, status} = useSession()
    const router = useRouter()
    const {mutate, isPending} = useMutation({
        mutationKey: ['carCategoryCreate'],
        mutationFn: (value: TypeCarCategoryAddSchema) => UtilsCarCategoryAdd({data: value, token: data?.user.token})
    })

    const form = useForm<TypeCarCategoryAddSchema>({
        resolver: zodResolver(CarCategorySchema.CREATE),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    useEffect(() => {
        if(status !== "authenticated") toast.loading("Loading session")
    }, [status])

    const handleForm = form.handleSubmit((value: TypeCarCategoryAddSchema) => {
        mutate(value, {
            onSuccess: (data) => {
                toast.success(data.message)
                form.reset()
                router.replace("/dashboard/inventory/car-category")
            },

            onError: (err) => {
                toast.error(UtilsErrorConsumeAPI(err))
            }
        })
    })
    return (
        <Crud title="Car Category" titleAction="Add ">
            <Form {...form}>
                <form onSubmit={handleForm} className="max-w-1/2 space-y-6">
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="example..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className="min-h-[200px]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <ButtonLoading type="submit" isLoading={isPending}>Submit</ButtonLoading>
                </form>
            </Form>
        </Crud>
    )
}