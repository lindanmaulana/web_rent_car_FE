"use client"

import { DashboardMainRental } from "@/components/dashboard/main/rental"
import { ErrorUi } from "@/components/feedbacks/error-ui"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { useRentalGetAll } from "@/hooks/rental"
import { useToastSmart } from "@/hooks/toast/useToastSmart"
import { queryHelpers } from "@/utils/queryHelpers"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

const PageDashboardRental = () => {
    const [params, setParams] = useState<string>("")
    const {data: session, status} = useSession()
    const {data, isLoading, isError, error} = useRentalGetAll()

    const {isAnyLoading, isAnyError, isAnyErrorMessage} = queryHelpers([{isLoading, isError, errorMessage: error?.message}])
    useToastSmart({isLoading: isAnyLoading, isError: isAnyError, error: isAnyErrorMessage})

    if(status === "loading") toast.loading("loading session...")
    if(isAnyLoading) return LoadingUi({message: "Loading data..."})
    if(isAnyError) return ErrorUi({message: isAnyErrorMessage})

        console.log({data})
    return (
        <DashboardMainRental session={session} dataRental={data.data} setParams={setParams} />
    )
}

export default PageDashboardRental