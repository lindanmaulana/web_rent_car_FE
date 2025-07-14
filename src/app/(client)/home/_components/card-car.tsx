"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { BsCalendar3 } from "react-icons/bs"
import { IoMdHeart } from "react-icons/io"
import { IoPeople } from "react-icons/io5"

interface CardCar {
    id: string
    brand: string
    model: string
    category: string
    image: string
    year: number
    seats: number
    price: string
}
export const CardCar = (props: CardCar) => {
    const {id, brand, model, category, image, year, seats, price} = props
    const urlParams = useSearchParams()

    return (
         <article className="h-86 hover:-translate-y-3 shadow-md shadow-primary/20 transition-all duration-300 ease-linear overflow-hidden rounded-lg">
            <Link href={`/car/detail/${id}?${urlParams.toString()}`} className="h-full flex flex-col justify-between bg-white-blue p-6">
                <div className="flex items-start justify-between">
                <div className="flex flex-col gap-y-px">
                    <h3 className="text-xl font-bold">{brand} {model}</h3>
                    <strong className="text-sm text-black/30 font-medium">{category}</strong>
                </div>
                    <IoMdHeart className="cursor-pointer size-5 z-10 text-red-500" />
                </div>
                <figure className="relative">
                    <Image src={image} alt="contoh" width={300} height={300} className="object-contain" />
                    <Image src="/images/shadow.svg" alt="shadow car" width={300} height={400} className="z-10 absolute bottom-0 left-0"  />
                </figure>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="flex items-center gap-1 text-sm text-black/40"><BsCalendar3 /> Year {year}</p>
                        <p className="flex items-center gap-1 text-sm text-black/40"> <IoPeople className="size-5" /> {seats} seats</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-base font-semibold">{price}<span className="text-black/30 text-sm">/day</span></h4>
                        <Button size={"sm"} className="w-full text-sm bg-primary-blue rounded">Sewa Sekarang</Button>
                    </div>
                </div>
            </Link>
        </article>
    )
}