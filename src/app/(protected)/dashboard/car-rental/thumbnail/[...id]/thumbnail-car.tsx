"use client"

import { ContentCrud } from "@/components/dashboard/crud/content-crud"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { baseURLImage } from "@/config"
import { cn } from "@/lib/utils"
import { CarUpdateThumbnailSchema, TypeCarUpdateThumbnailSchema } from "@/schemas/car"
import { UtilsCarUpdate } from "@/utils/car"
import { UtilsErrorConsumeAPI } from "@/utils/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Car } from "../../../../../../../types/car"

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
    const {mutate} = useMutation({
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

    console.log({data})

    return (
        <ContentCrud title="Thumbnail" titleAction="Thumbnail Car">
            <div className="w-full space-y-4">
                <AspectRatio ratio={16 / 12}>
                    <Image src={data.thumbnail ? `${baseURLImage}${data.thumbnail}` : "/images/car-default.png" } alt={data.model} className="w-full h-full rounded" width={120} height={120} priority />
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
                            <CarouselContent>
                            {data.image && data.image.length > 0 ? data.image?.map(car => {
                                const imgUrl = `${baseURLImage}${car.url}`
                                return(
                                <FormField 
                                    key={car.id}
                                    control={form.control}
                                    name="thumbnail"
                                    render={({field}) => {
                                        const isSelected = field.value === car.url
                                        return (
                                        <FormItem className="cursor-pointer">
                                            <FormControl>
                                                <CarouselItem autoFocus onClick={() => field.onChange(car.url)} key={car.id} className="basis-1/2">
                                                    <Card className={cn("", isSelected ? "border-2 border-primary" : "border-2")}>
                                                        <CardContent>
                                                            <figure className="w-full min-h-40">
                                                                <Image key={car.id} src={imgUrl} alt={car.url} width={100} height={100} className="w-full h-full object-cover" />
                                                            </figure>
                                                        </CardContent>
                                                    </Card>
                                                </CarouselItem>
                                            </FormControl>
                                        </FormItem>
                                    )}}
                                />
                            )}) : (
                                <Card>
                                    <CardContent>
                                        <figure className="w-full min-h-40">
                                            <h3>notfound image car</h3>
                                        </figure>
                                    </CardContent>
                                </Card>
                            )}
                            </CarouselContent>
                        </Carousel>
                        <Button type="submit">Set thumbnail</Button>
                    </form>
                </Form>
            </div>
        </ContentCrud>
    )
}