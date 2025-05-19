"use client";

import { ButtonUpdate } from "@/components/buttons/button-update";
import { ErrorUi } from "@/components/feedbacks/error-ui";
import { LoadingUi } from "@/components/feedbacks/loading-ui";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCarCategoryGetAll } from "@/hooks/car-category";
import { UtilsCarCategory } from "@/utils/services/car-category";
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { FaTrash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";

export const DashboardMainCategoryItem = () => {
  const { data: session, status } = useSession();
  const { data, isLoading, isError, error } = useCarCategoryGetAll();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const { mutate } = useMutation({
    mutationKey: ["carCategoryDelete"],
    mutationFn: (id: string) =>
      UtilsCarCategory.delete({ id, token: session?.user.token }),
  });

  if (status === "loading" || isLoading) return <LoadingUi />;
  if (isError) return <ErrorUi message={error.message} />;

  const handleDelete = (id: string, name: string) => {
    toast.info(`Confirmation delete car category ${name} ? `, {
      action: {
        label: "Delete",
        onClick: () => {
          mutate(id, {
            onSuccess: (data) => {
              toast.success(data.message);
              queryClient.invalidateQueries({
                queryKey: ["CarCategoryGetAll"],
              });
            },

            onError: (err) => {
              toast.error(UtilsErrorConsumeAPI(err));
            },
          });
        },
      },
    });
  };

  return (
    <div>
      <Table className="rounded-t-md overflow-hidden">
        <TableHeader className="bg-primary-blue/70">
          <TableRow>
            <TableHead className="text-white">No</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data?.map((category, index: number) => (
            <TableRow
              key={category.id}
              className="border-none odd:bg-gray-100 even:bg-white"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <p className="max-w-[300px] break-words whitespace-normal line-clamp-2">
                  {category.description}
                </p>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-x-3">
                  <ButtonUpdate pathname={pathname} id={category.id}>
                    <HiPencilSquare />
                  </ButtonUpdate>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(category.id, category.name)}
                    className="text-xs"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
