import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRentalGetAll } from "@/hooks/rental"
import { Session } from "next-auth"
import { Rental } from "../../../../../types/rental"
import { ErrorUi } from "@/components/feedbacks/error-ui"

interface DashboardMainCarItemProps {
    session: Session | null
}
export const DashboardMainRentalItem = ({session}: DashboardMainCarItemProps) => {
    const {data, isError} = useRentalGetAll()

    if(isError) return <ErrorUi />

    return (
        <div className="w-full">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data?.map((rental: Rental, index: number) => (
                        <TableRow key={rental.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{rental.user?.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}