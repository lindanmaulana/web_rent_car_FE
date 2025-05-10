"use client"

import { ErrorUi } from "@/components/feedbacks/error-ui"
import { LoadingUi } from "@/components/feedbacks/loading-ui"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCategoryGetAllSuspense } from "@/hooks/car-category"
import { UtilsCarCategoryDelete } from "@/utils/car-category"
import { UtilsErrorConsumeAPI } from "@/utils/errors"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

export const DashboardMainCategoryItem = () => {
    const {data: session, status} = useSession()
    const {data, isError, error} = useCategoryGetAllSuspense()
    const {mutate} = useMutation({
        mutationKey: ['carCategoryDelete'],
        mutationFn: (id: string) => UtilsCarCategoryDelete({id, token: session?.user.token})
    })
    const queryClient = useQueryClient()

    if(status === "loading") return <LoadingUi />
    if(isError) return <ErrorUi message={error.message} />

    const handleDelete = (id: string, name: string) => {
        toast.info(`Confirmation delete car category ${name} ? `, {
            action: {
                label: "Delete",
                onClick: () => {
                    mutate(id, {
                        onSuccess: (data) => {
                            toast.success(data.message)
                            queryClient.invalidateQueries({queryKey: ["carCategoryGetAllSuspense"]})
                        },

                        onError: (err) => {
                            toast.error(UtilsErrorConsumeAPI(err))
                        }
                    })
                }
            }
        })
    }

    return(
        <div className="w-full">
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data?.map((category, index: number) => (
                        <TableRow key={category.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-x-3">
                                    <Button size="sm" >Update</Button>
                                    <Button size="sm" onClick={() => handleDelete(category.id, category.name)}>Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}