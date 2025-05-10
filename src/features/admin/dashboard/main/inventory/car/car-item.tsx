"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCarGetAll } from "@/hooks/car";
import { APIURLIMAGE } from "@/publicConfig";
import { UtilsCarDelete } from "@/utils/car";
import { UtilsErrorConsumeAPI } from "@/utils/errors";
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
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Car } from "../../../../../../../types/car";
import { ErrorUi } from "@/components/feedbacks/error-ui";
import { searchParamsCar } from ".";

interface DashboardMainCarItemProps {
  session: Session | null;
  params: searchParamsCar;
}
export const DashboardMainCarItem = ({
  session,
  params,
}: DashboardMainCarItemProps) => {
  const { data, isError } = useCarGetAll({ params });
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteCar"],
    mutationFn: (id: string) =>
      UtilsCarDelete({ id, token: session?.user.token }),
  });

  if (isError) return <ErrorUi />;

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

  return (
    <div className="w-full">
      <Table className="w-full bg-red-50">
        <TableBody>
          {data.length > 0 ? (
            data.map((car: Car) => {
              const CarThumbnail = `${APIURLIMAGE}${car.thumbnail}`;
              return (
                <TableRow key={car.id} className="bg-white">
                  <TableCell>
                    <Link
                      href={`${pathname}/thumbnail/${car.id}`}
                      className="relative"
                    >
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
                    <span className="text-xs text-slate-blue">{car.brand.name}</span>
                    <h5 className="text-xl font-semibold text-primary">
                      {car.model}
                    </h5>
                    <span
                      className={`${
                        car.status === "AVAILABLE"
                          ? "bg-green-500"
                          : car.status === "NONAVAILABLE"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      } text-white text-xs px-2 lowercase rounded`}
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
                      <Button size="sm" asChild>
                        <Link
                          href={`${pathname}/update/${car.id}`}
                          className="text-xs"
                        >
                          Update
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(car.id)}
                        className="text-xs"
                      >
                        Delete
                      </Button>
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
    </div>
  );
};
