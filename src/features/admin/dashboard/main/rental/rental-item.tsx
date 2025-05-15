"use client";
import { ErrorUi } from "@/components/feedbacks/error-ui";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRentalGetAll } from "@/hooks/rental";
import { useRentalUpdate } from "@/hooks/rental/useRentalUpdate";
import { UtilsErrorConsumeAPI } from "@/utils/errors";
import { UtilsFormatDate } from "@/utils/formatDate";
import { RentalUpdateParams } from "@/utils/rental";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { toast } from "sonner";
import { Rental } from "../../../../../../types/rental";
import { useSearchParams } from "next/navigation";

interface DashboardMainCarItemProps {
  session: Session | null;
}
export const DashboardMainRentalItem = ({
  session,
}: DashboardMainCarItemProps) => {
  const queryClient = useQueryClient();
  const urlParams = useSearchParams()
  console.log(urlParams.toString())
  const { data, isError, error } = useRentalGetAll({ token: session?.user.token, params: urlParams?.toString()});
  const mutate = useRentalUpdate();

  if (isError) return <ErrorUi message={error?.message} />;

  const handleApprove = (id: string) => {
    const payloadApprove: RentalUpdateParams = {
      id,
      token: session?.user.token,
      data: {
        status: "APPROVE",
      },
    };
    toast.info("Confirmation approve this rental ?", {
      action: {
        label: "Approve",
        onClick: () =>
          mutate(payloadApprove, {
            onSuccess: () => {
              toast.success("Rental successfully approved");
              queryClient.invalidateQueries({ queryKey: ["rentalGetAll"] });
            },

            onError: (err) => {
              toast.error(UtilsErrorConsumeAPI(err));
            },
          }),
      },
    });
  };

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
            <TableHead>Payment Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data?.map((rental: Rental, index: number) => {
            const startDate = UtilsFormatDate(rental.start_date);
            const endDate = UtilsFormatDate(rental.end_date);
            return (
              <TableRow key={rental.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{rental.user?.name}</TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>
                <TableCell>{rental.total_price}</TableCell>
                <TableCell>{rental.status}</TableCell>
                <TableCell>
                  <p className="text-orange-500">
                    {rental.payment ? rental.payment.status : "Pending"}
                  </p>
                </TableCell>
                <TableCell>
                  <div>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(rental.id)}
                      className="bg-green-500 cursor-pointer"
                    >
                      Approve
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
