"use client";

import { ButtonDelete } from "@/components/buttons/button-delete";
import { ButtonUpdate } from "@/components/buttons/button-update";
import { ErrorUi } from "@/components/feedbacks/error-ui";
import { LoadingUi } from "@/components/feedbacks/loading-ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCarBrandGetAll } from "@/hooks/car-brand";
import { UtilsCarBrand } from "@/utils/services/car-brand";
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { HiPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";

export const DashboardMainCarBrandItem = () => {
  const carBrandGetAll = useCarBrandGetAll();
  const session = useSession();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["carBrandDelete"],
    mutationFn: (id: string) =>
      UtilsCarBrand.delete({ id, token: session.data?.user.token }),
  });

  const handleDelete = (id: string, name: string) => {
    toast.info(`Confirmation delete car brand ${name} ? `, {
      action: {
        label: "Delete",
        onClick: () => {
          mutation.mutate(id, {
            onSuccess: (data) => {
              toast.success(data.message);
              queryClient.invalidateQueries({ queryKey: ["carBrandGetAll"] });
            },

            onError: (err) => {
              toast.error(UtilsErrorConsumeAPI(err));
            },
          });
        },
      },
    });
  };

  if (carBrandGetAll.isLoading) return <LoadingUi />;
  if (carBrandGetAll.isError) return <ErrorUi message={carBrandGetAll.error?.message} />;
  return (
    <div className="rounded-t-md overflow-hidden">
      <Table>
        <TableHeader className="bg-primary-blue/70">
          <TableRow className="uppercase">
            <TableHead className="text-white">No</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Country</TableHead>
            <TableHead className="text-white"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carBrandGetAll.data.data.map((brand, index: number) => (
            <TableRow
              key={brand.id}
              className="odd:bg-gray-100 even:bg-white border-none"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{brand.name}</TableCell>
              <TableCell>{brand.country}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-x-3">
                  <ButtonUpdate pathname={pathname} id={brand.id}>
                    <HiPencilSquare />
                  </ButtonUpdate>
                  <ButtonDelete
                    id={brand.id}
                    isLoading={mutation.isPending}
                    onclick={() => handleDelete(brand.id, brand.name)}
                  >
                    <FaTrash />
                  </ButtonDelete>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
