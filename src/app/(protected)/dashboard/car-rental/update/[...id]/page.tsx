"use client"

import { ErrorUi } from "@/components/feedbacks/error-ui"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { useCarGetOne } from "@/hooks/car"
import { useToastSmart } from "@/hooks/toast/useToastSmart"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { CarRentalUpdate } from "./update-car"

const PageDashboardCarRentalUpdate = () => {
    const {id} = useParams<{id: string}>()
    const {data: session, status} = useSession()
    const {data, isLoading, isError, error} = useCarGetOne({id})

    useToastSmart({isLoading, isError, error: error?.message})

    if(isLoading) return LoadingUi({message: "Loading data car..."})

    if(isError) return ErrorUi({message: error?.message})

    if(status === "loading") return toast("Session loading...")

    console.log({session})

    return (
        <CarRentalUpdate idCar={id} dataCar={data} token={session?.user.token} />
    )
}

export default PageDashboardCarRentalUpdate