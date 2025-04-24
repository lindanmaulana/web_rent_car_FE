import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Rental } from "../../../../../types/rental"
import { Session } from "next-auth"

interface DashboardMainCarItemProps {
    data: Rental[]
    session: Session | null
}
export const DashboardMainRentalItem = ({data, session}: DashboardMainCarItemProps) => {
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
                    {data?.map((rental, index: number) => (
                        <TableRow key={rental.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{rental.user.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

// id: string
// user_id: string
// car_id: string
// start_date: Date
// end_date: Date
// total_price: Decimal
// status: RentalStatus