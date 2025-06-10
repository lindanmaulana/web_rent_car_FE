"use client"

import { DatePicker } from "@/components/date-picker"
import { ErrorUi } from "@/components/feedbacks/error-ui"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BASECLIENTCARDETAIL } from "@/const/route"
import { useCarGetOne } from "@/hooks/car"
import { APIURLIMAGE } from "@/publicConfig"
import { RentalSchema, TypeRentalCreateSchema } from "@/schemas/rental"
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors"
import { UtilsFormatCurrency } from "@/utils/helpers/formatCurrency"
import { UtilsFormatTotalDay } from "@/utils/helpers/formatTotalDay"
import { UtilsRentalCreate } from "@/utils/services/rental"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface dateRental {
    start_date?: Date
    end_date?: Date
}

interface CarRentalProps {
    id: string
}

export const CarRental = ({id}: CarRentalProps) => {
    const session = useSession()
    const urlParams = useSearchParams()
    const router = useRouter()
    const carGetOne = useCarGetOne({id})
    
    const [date, setDate] = useState<dateRental>()
    const [totalDay, setTotalDay] = useState<string>("")
    const [subTotal, setSubTotal] = useState<number>(0)
    const [terms, setTerms] = useState<boolean>(false)

    const createRental = useMutation({
        mutationKey: ["rentalCreate"],
        mutationFn: (data: TypeRentalCreateSchema) => UtilsRentalCreate({token: session.data?.user.token, data})
    })

    const form = useForm<TypeRentalCreateSchema>({
        resolver: zodResolver(RentalSchema.CREATE),
        defaultValues: {
            car_id: id,
            start_date: "",
            end_date: "",
            total_day: totalDay
        }
    })

    const handleForm = form.handleSubmit((values: TypeRentalCreateSchema) => {
        const newRental: TypeRentalCreateSchema = {
            ...values,
            total_day: Number(totalDay)
        }

        createRental.mutate(newRental, {
            onSuccess: (data) => {
                toast.success(data.message)

                router.replace(`/transaction/${data.data.id}`)
            },

            onError: (err) => {
                toast.error(UtilsErrorConsumeAPI(err))
            }
        })
    })

    const handleDate = (key: "start_date" | "end_date", pickDate?: Date) => {
        setDate({...date, [key]: pickDate})
    }

    useEffect(() => {
        if(date?.start_date && date?.end_date) {
            const result = UtilsFormatTotalDay(date.start_date, date.end_date).toString()

            if(result !== totalDay) {
                setTotalDay(result)
            }

            setSubTotal(Number(carGetOne.data?.data.price_per_day) * Number(totalDay))
        }

    }, [date, totalDay, carGetOne.data])

    const handleTerms = () => {
        setTerms(!terms)
    }

    if(carGetOne.isLoading) return <LoadingUi />
    if(carGetOne.isError) return <ErrorUi message={carGetOne.error?.message} />

    const dataCar = carGetOne.data.data
    const subTotalIDR = UtilsFormatCurrency(subTotal)
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Form {...form}>
                <form onSubmit={handleForm} className="w-full space-y-6">
                   <div className="flex gap-8">
                        <div className="w-[60%] space-y-5">
                            <div className="w-full p-6 space-y-5 bg-white rounded-xl"> 
                                <div>
                                    <h2 className="text-xl text-primary font-semibold">Billing Info</h2>
                                    <p className="text-primary/50">Please enter your billing info</p>
                                </div>
                                <FormField 
                                    control={form.control}
                                    name="car_id"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Car</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" readOnly />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="total_day"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Total Day</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" placeholder="total..." value={totalDay} readOnly />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="start_date"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Start Date</FormLabel>
                                            <FormControl>
                                                <DatePicker title="start_date" date={field.value} setDate={(e) => {
                                                    field.onChange(e)
                                                    handleDate("start_date", e)
                                                }}  />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="end_date"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>End Date</FormLabel>
                                            <FormControl>
                                                <DatePicker title="end_date" date={field.value} setDate={(e) => {
                                                    field.onChange(e)
                                                    handleDate("end_date", e)
                                                }}  />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full p-6 bg-white rounded-xl">
                                <h2 className="text-xl text-primary font-semibold">Confirmation</h2>
                                <p className="text-primary/50 text-sm">We are getting to the end. Just few clicks and your rental is ready!</p>
                                <div className="py-6">
                                    <div className="flex items-center gap-4 bg-white-blue py-4 px-8 rounded-lg">
                                        <Checkbox onCheckedChange={handleTerms} id="ConsentToTerms" className="border-primary/50" disabled={terms} />
                                        <label htmlFor="ConsentToTerms" className="text-sm">I agree with our terms and conditions and privacy policy.</label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button type="submit" disabled={terms} variant={"destructive"} className="mb-8" asChild>
                                        <Link href={`${BASECLIENTCARDETAIL}/${id}?${urlParams.toString()}`}>Back</Link>
                                    </Button>
                                    <Button type="submit" disabled={!terms} className="mb-8">Rent Now</Button>
                                </div>
                                <div className="space-y-1">
                                    <Image src={'/shield.svg'} alt="safe data" width={100} height={100} className="w-8 h-8" />
                                    <h2 className="text-base font-semibold">All your data all safe</h2>
                                    <p className="text-sm text-primary/50">We are using the most advanced security to provide you the best experience ever.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[40%] max-h-[410px] p-6 bg-white rounded-xl">
                            <h2 className="text-xl text-primary font-semibold">Rental Summary</h2>
                            <p className="text-primary/50 text-sm">Harga dapat berubah tergantung pada lama sewa dan harga mobil sewaan Anda.</p>
                            <div className="flex gap-4 items-center border-b py-7">
                                <figure className="min-w-34 bg-primary-blue rounded px-4 py-1">
                                    <Image src={`${APIURLIMAGE}${dataCar.thumbnail}`} alt={dataCar.model} width={50} height={50} className="w-full h-full" />
                                </figure>
                                <h3 className="text-2xl text-primary font-semibold">{dataCar.brand.name} {dataCar.model}</h3>
                            </div>
                            <ul className="py-8 space-y-2">
                                <li className="flex items-center justify-between">
                                    <h3>Subtotal</h3>
                                    <strong>{subTotalIDR}</strong>
                                </li>
                                <li className="flex items-center justify-between">
                                    <h3>Tax</h3>
                                    <strong>0</strong>
                                </li>
                            </ul>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl text-primary font-semibold">Total Rental Price</h2>
                                    <p className="text-primary/50 text-sm">Harga keseluruhan dan termasuk diskon sewa</p>
                                </div>
                                <strong className="text-xl">{subTotalIDR}</strong>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}