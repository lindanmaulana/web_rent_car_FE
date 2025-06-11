'use client';
import { ErrorUi } from '@/components/feedbacks/error-ui';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRentalGetAll } from '@/hooks/rental';
import { useRentalUpdate } from '@/hooks/rental/useRentalUpdate';
import { UtilsErrorConsumeAPI } from '@/utils/helpers/errors';
import { UtilsFormatCurrency } from '@/utils/helpers/formatCurrency';
import { UtilsFormatDate } from '@/utils/helpers/formatDate';
import { RentalUpdateParams } from '@/utils/services/rental';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Rental } from '../../../../../../types/rental';

interface DashboardMainCarItemProps {
  token: string;
}
export const RentalMainList = ({ token }: DashboardMainCarItemProps) => {
  const queryClient = useQueryClient();
  const urlParams = useSearchParams();

  const query = useRentalGetAll({
    token: token,
    params: urlParams?.toString(),
  });

  const mutate = useRentalUpdate();

  if(query.isLoading) return <p>Loading...</p>
  if (query.isError) return <ErrorUi message={query.error?.message} />;

  const handleApprove = (id: string) => {
    const payloadApprove: RentalUpdateParams = {
      id,
      token: token,
      data: {
        status: 'APPROVE',
      },
    };
    toast.info('Confirmation approve this rental ?', {
      action: {
        label: 'Approve',
        onClick: () =>
          mutate(payloadApprove, {
            onSuccess: () => {
              toast.success('Rental successfully approved');
              queryClient.invalidateQueries({ queryKey: ['rentalGetAll'] });
            },

            onError: (err) => {
              toast.error(UtilsErrorConsumeAPI(err));
            },
          }),
      },
    });
  };

  return (
    <div className="w-full rounded-t-md overflow-hidden">
      <Table className="w-full">
        <TableHeader className="bg-primary-blue/80">
          <TableRow>
            <TableHead className="text-white">No</TableHead>
            <TableHead className="text-white">User</TableHead>
            <TableHead className="text-white">Start Date</TableHead>
            <TableHead className="text-white">End Date</TableHead>
            <TableHead className="text-white">Total Price</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Payment Status</TableHead>
            <TableHead className="text-white"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data.data?.map((rental: Rental, index: number) => {
            const startDate = UtilsFormatDate(rental.start_date);
            const endDate = UtilsFormatDate(rental.end_date);
            const formatIDR = UtilsFormatCurrency(Number(rental.total_price));

            return (
              <TableRow key={rental.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{rental.user?.name}</TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>
                <TableCell>{formatIDR}</TableCell>
                <TableCell>{rental.status}</TableCell>
                <TableCell>
                  <p className="text-orange-500">{rental.payment ? rental.payment.status : 'Pending'}</p>
                </TableCell>
                <TableCell>
                  <div>
                    <Button size="sm" onClick={() => handleApprove(rental.id)} className="bg-green-500 cursor-pointer">
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
