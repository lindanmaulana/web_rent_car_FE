"use client"

import { ErrorUi } from "@/components/feedbacks/error-ui"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { useCarGetOne } from "@/hooks/car"
import { useToastSmart } from "@/hooks/toast/useToastSmart"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { queryHelpers } from "@/utils/queryHelpers"
import { CarRentalUpdate } from "@/components/dashboard/main/car/update"

const PageDashboardCarRentalUpdate = () => {
    const {id} = useParams<{id: string}>()
    const {data: session, status} = useSession()
    const {data, isLoading, isError, error} = useCarGetOne({id})

    const {isAnyLoading, isAnyError, isAnyErrorMessage} = queryHelpers([{isLoading, isError, errorMessage: error?.message}])

    useToastSmart({isLoading: isAnyLoading, isError: isAnyError, error: isAnyErrorMessage})

    if(isAnyLoading) return LoadingUi({message: "Loading data car..."})

    if(isAnyError) return ErrorUi({message: isAnyErrorMessage})

    if(status === "loading") toast("Session loading...")

    return (
        <CarRentalUpdate idCar={id} dataCar={data} token={session?.user.token} />
    )
}

export default PageDashboardCarRentalUpdate