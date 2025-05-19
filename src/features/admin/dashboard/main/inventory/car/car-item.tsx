"use client";

import { ButtonDelete } from "@/components/buttons/button-delete";
import { ButtonUpdate } from "@/components/buttons/button-update";
import { ErrorUi } from "@/components/feedbacks/error-ui";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCarGetAll } from "@/hooks/car";
import { APIURLIMAGE } from "@/publicConfig";
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors";
import { UtilsCarDelete } from "@/utils/services/car";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Banknote,
  CalendarRange,
  CarFront,
  PencilLine,
  User,
  X,
} from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { toast } from "sonner";
import { Car } from "../../../../../../../types/car";
import { Button } from "@/components/ui/button";

interface DashboardMainCarItemProps {
  session: Session | null;
}
export const DashboardMainCarItem = ({ session, }: DashboardMainCarItemProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter()

  const { data, isError } = useCarGetAll({ params: params.toString() });

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteCar"],
    mutationFn: (id: string) =>
      UtilsCarDelete({ id, token: session?.user.token }),
  });

  const handleDelete = (id: string) => {
    toast("Confirmation delete this car ?", {
      action: {
        label: "Delete",
        onClick: () =>
          mutate(id, {
            onSuccess: (data) => {
              toast.success(data.message);
              queryClient.invalidateQueries({ queryKey: ["getAllCar"] });
            },

            onError: (err) => {
              toast.error(UtilsErrorConsumeAPI(err));
            },
          }),
      },
    });
  };

  const totalPages = data.pagination?.totalPages ?? 1
  const currentPage = data.pagination?.currentPage ?? 1
  const paginationPages = Array.from({length: totalPages}, (_, i) => i + 1)

  const handlePagination = (page: number) => {
    const urlParams = new URLSearchParams(window.location.search)
    
    urlParams.set("page", page.toString())

    router.replace(`${pathname}?${urlParams.toString()}`)
  }

  if (isError) return <ErrorUi />;

  return (
    <div className="w-full min-h-[340px] flex flex-col gap-4 justify-between">
      <Table className="w-full bg-red-50">
        <TableBody className="h-full">
          {data.data.length > 0 ? (
            data.data.map((car: Car) => {
              const CarThumbnail = `${APIURLIMAGE}${car.thumbnail}`;
              return (
                <TableRow
                  key={car.id}
                  className="odd:bg-gray-100 even:bg-white"
                >
                  <TableCell>
                    <Link href={`${pathname}/thumbnail/${car.id}`} className="relative" >
                      <Image
                        src={
                          car.thumbnail
                            ? CarThumbnail
                            : "/images/car-default.png"
                        }
                        alt="car-default"
                        width={140}
                        height={30}
                      />
                      <PencilLine
                        className="absolute bottom-0 right-5 text-primary/50"
                        size={16}
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-blue">
                      {car.brand.name}
                    </span>
                    <h5 className="text-xl font-semibold text-primary">
                      {car.model}
                    </h5>
                    <span
                      className={`${
                        car.status === "AVAILABLE"
                          ? "bg-green-200 text-green-700"
                          : car.status === "UNAVAILABLE"
                          ? "bg-red-200 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }  text-xs px-2 py-1 lowercase rounded-xl font-medium`}
                    >
                      {car.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center justify-center">
                      <CarFront
                        size={16}
                        className="bg-slate-blue/40 rounded p-px"
                      />
                      <span className="text-xs text-slate-blue">Brand</span>
                      <h4 className="text-base text-primary font-semibold">
                        {car.brand.name}
                      </h4>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center justify-center">
                      <CalendarRange
                        size="16"
                        className="bg-slate-blue/40 rounded p-px"
                      />
                      <span className="text-xs text-slate-blue">Year</span>
                      <h4 className="text-base text-primary font-semibold">
                        {car.year}
                      </h4>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center justify-center">
                      <User
                        size="16"
                        className="bg-slate-blue/40 rounded p-px"
                      />
                      <span className="text-xs text-slate-blue">Capacity</span>
                      <h4 className="text-base text-primary font-semibold">
                        {car.seats} Seats
                      </h4>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center justify-center">
                      <Banknote
                        size={16}
                        className="bg-slate-blue/40 rounded p-px"
                      />
                      <span className="text-xs text-slate-blue">Price</span>
                      <h4>
                        <span className="text-primary font-semibold">
                          Rp {car.price_per_day}
                        </span>
                        /days
                      </h4>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ButtonUpdate pathname={pathname} id={car.id}>
                        <HiPencilSquare />
                      </ButtonUpdate>
                      <ButtonDelete
                        id={car.id}
                        onclick={() => handleDelete(car.id)}
                        isLoading={isPending}
                      >
                        <FaTrash />
                      </ButtonDelete>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={9} rowSpan={9} className="text-center">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src="/images/car-default.png"
                    alt="car rent"
                    width={300}
                    height={120}
                  />
                  <p className="flex items-center text-2xl justify-center italic font-semibold text-red-500">
                    Car not found! <X />
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination className="flex items-center justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button variant={"ghost"} className="cursor-pointer" onClick={() => handlePagination(currentPage - 1)} disabled={!data.pagination?.hashPrevPage}><FaAngleLeft /></Button>
          </PaginationItem>

          {paginationPages.map(page => (
            <PaginationItem key={page}>
              <PaginationLink onClick={() => handlePagination(page)} isActive={currentPage === page} className="cursor-pointer">{page}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button variant={"ghost"} className="cursor-pointer" onClick={() => handlePagination(currentPage + 1)} disabled={!data.pagination?.hashNextPage}><FaAngleRight /></Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
