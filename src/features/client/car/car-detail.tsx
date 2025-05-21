"use client"

import { ErrorUi } from "@/components/feedbacks/error-ui"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { Button } from "@/components/ui/button"
import { useCarGetOne } from "@/hooks/car"
import { APIURLIMAGE } from "@/publicConfig"
import { UtilsFormatCurrency } from "@/utils/helpers/formatCurrency"
import clsx from "clsx"
import { LucideStepBack } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Car } from "../../../../types/car"

interface CarDetailProps {
    id: string
}

export const CarDetail = ({id}: CarDetailProps) => {
    const dataCar = useCarGetOne({id})
    const router = useRouter()

    const [preview, setPreview] = useState<string>()

    if(dataCar.isLoading) return <LoadingUi />
    if(dataCar.isError) return <ErrorUi message={dataCar.error?.message} />
    
    const data = dataCar.data.data as Car
    const pricePerDay = UtilsFormatCurrency(Number(data.price_per_day))
    const previewDefault = preview ? preview : data.thumbnail

    const handlePreview = (url: string) => {
        setPreview(url)
    }

    console.log({preview})

    return (
        <div className="space-y-4">
            <Button onClick={() => router.back()} size={"sm"} variant={"outline"} className="text-sm"><LucideStepBack /> Back</Button>
            <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                    <figure className="aspect-video bg-white p-4 rounded-md overflow-hidden">
                        <Image src={`${APIURLIMAGE}${previewDefault}`} alt={data.model} width={100} height={100} className="w-full h-full object-cover" />
                    </figure>
                    <ul className="grid grid-cols-3 gap-3">
                        {data.image?.map(image => {
                            const isActive = preview ? preview === image.url : data.thumbnail === image.url
                            
                            return (
                            <li key={image.id} onClick={() => handlePreview(image.url)} className={clsx(`rounded-md`, isActive ? "border-2 border-primary-blue p-1" : "" )}>
                                 <figure className={clsx("rounded-md", isActive ? "bg-primary-blue" : "bg-white")}>
                                    <Image src={`${APIURLIMAGE}${image.url}`} alt={data.model} width={100} height={100} className="w-full h-full" />
                                </figure>
                            </li>
                        )})}
                    </ul>
                </div>
                <div className="bg-white rounded-xl p-5 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl font-semibold tracking-widest">{data.model}</h2>
                            <p>{data.year}</p>
                        </div>
                        <p className="text-lg text-black/70 leading-8">{data.category.description}</p>
                        <ul className="grid grid-cols-2 gap-4">
                            <li className="flex items-center gap-4">
                                <h3 className="text-black/40">Brand</h3>
                                <p className="font-semibold text-primary/80">{data.brand.name}</p>
                            </li>
                            <li className="flex items-center gap-4">
                                <h3 className="text-black/40">Category</h3>
                                <p className="font-semibold text-primary/80">{data.category.name}</p>
                            </li>
                            <li className="flex items-center gap-4">
                                <h3 className="text-black/40">Seats</h3>
                                <p className="font-semibold text-primary">{data.seats}</p>
                            </li>
                            <li className="flex items-center gap-4">
                                <h3 className="text-black/40">Country</h3>
                                <p className="font-semibold text-primary">{data.brand.country}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold tracking-wider">Rp{pricePerDay}/<span className="text-sm text-black/50">days</span></h2>
                        <Button size={"lg"} className="bg-primary-blue rounded">Rent Now</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}