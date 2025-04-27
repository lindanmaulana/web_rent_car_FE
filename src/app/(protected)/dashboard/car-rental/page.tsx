"use client"

import { DashboardMainCar } from "@/components/dashboard/main/car"
import { useCarGetAll } from "@/hooks/car"
import { useToastSmart } from "@/hooks/toast/useToastSmart"
import { useState } from "react"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { ErrorUi } from "@/components/feedbacks/error-ui"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { queryHelpers } from "@/utils/queryHelpers"

const PageDashboardCarRental = () => {
    const [params, setParams] = useState<string>("")
    const {data: session, status} = useSession()
    const {data: dataCar, isLoading: isLoadingCar, isError: isErrorCar, error: errorCar} = useCarGetAll({params})

    const {isAnyLoading, isAnyError, isAnyErrorMessage} = queryHelpers([{isLoading: isLoadingCar, isError: isErrorCar, errorMessage: errorCar?.message}])
    useToastSmart({isLoading: isAnyLoading, isError: isAnyError, error: isAnyErrorMessage})

    if(status === "loading") toast.loading("loading session...")
    if(isAnyLoading) return LoadingUi({message: "Loading data..."})
    if(isAnyError) return ErrorUi({message: isAnyErrorMessage})


        console.log({SESSION: session, status})
        
    return (
        <DashboardMainCar dataCar={dataCar} session={session} setParams={setParams} />
    )
}

export default PageDashboardCarRental