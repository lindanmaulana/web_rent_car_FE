"use client"

import { ButtonLoading } from "@/components/button-loading"
import { ContentCrud } from "@/components/dashboard/crud/content-crud"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { APIURLIMAGE } from "@/publicConfig"
import { CarUpdateThumbnailSchema, TypeCarUpdateThumbnailSchema } from "@/schemas/car"
import { UtilsCarUpdate } from "@/utils/car"
import { UtilsErrorConsumeAPI } from "@/utils/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ImagePlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Car } from "../../../../../../types/car"

interface UpdateThumbnail {
    thumbnail: string
    id: string
}

interface ThumbnailCarProps {
    data: Car
    token?: string
}
export const ThumbnailCar = ({data, token}: ThumbnailCarProps) => {
    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationKey: ["updateCarThumbnail"],
        mutationFn: (values: UpdateThumbnail) => UtilsCarUpdate({data: {thumbnail: values.thumbnail}, id: data.id, token})
    })

    const form = useForm<TypeCarUpdateThumbnailSchema>({
        resolver: zodResolver(CarUpdateThumbnailSchema)
    })

    const handleForm = form.handleSubmit((values) => {
        mutate(values, {
            onSuccess: (data) => {
                toast.success(data.message)
                queryClient.invalidateQueries({queryKey: ["getOneCar"]})
                form.reset()
            },

            onError: (err) => {
                toast.error(UtilsErrorConsumeAPI(err))
            }
        })
    })

    return (
        <ContentCrud title="Thumbnail" titleAction="Thumbnail Car">
            <div className="w-full space-y-4">
                <AspectRatio ratio={16 / 12}>
                    <Image src={data.thumbnail ? `${APIURLIMAGE}${data.thumbnail}` : "/images/car-default.png" } alt={data.model} className="w-full h-full rounded" width={120} height={120} priority />
                </AspectRatio>

                <div>
                    <h4 className="text-2xl">Image {data.model}</h4>
                </div>

                <Form {...form}>
                    <form onSubmit={handleForm} className="space-y-6">
                        <Carousel opts={{
                            align: "start",
                        }}
                        className="w-full"
                        >
                            <CarouselContent className="w-full flex items-center">
                                    {data.image?.map(car => {
                                        const imgUrl = `${APIURLIMAGE}${car.url}`
                                        return (
                                    <CarouselItem key={car.id} className="w-full basis-2/4 flex items-center gap-4">
                                        <FormField 
                                            key={car.id}
                                            control={form.control}
                                            name="thumbnail"
                                            render={({field}) => {
                                                const isSelected = field.value === car.url
                                                return (
                                                <FormItem className="w-full cursor-pointer">
                                                    <FormControl>
                                                            <Card onClick={() => field.onChange(car.url)} key={car.id} className={cn("", isSelected ? "border-2 border-primary" : "border-2")}>
                                                                <CardContent>
                                                                    <figure className="w-full h-52">
                                                                        <Image key={car.id} src={imgUrl} alt={car.url} width={100} height={100} className="w-full h-full object-cover" />
                                                                    </figure>
                                                                </CardContent>
                                                            </Card>
                                                    </FormControl>
                                                </FormItem>
                                            )}}
                                        />
                                    </CarouselItem>
                                    )})}
                                    <CarouselItem className="basis-1/4">
                                        <Link href={`/dashboard/car-rental/add/image/${data.id}`} className="w-full">
                                            <Card className="hover:bg-green-500 group flex items-center justify-center">
                                                <CardContent className="h-52 flex items-center gap-2 group-hover:text-white">
                                                        Add Image <ImagePlus />
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                        <ButtonLoading type="submit" isLoading={isPending}>Set thumbnail</ButtonLoading>
                    </form>
                </Form>
            </div>
        </ContentCrud>
    )
}