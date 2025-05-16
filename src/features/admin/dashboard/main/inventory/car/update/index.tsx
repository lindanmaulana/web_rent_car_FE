"use client";

import { ButtonLoading } from "@/components/button-loading";
import { Crud } from "@/components/dashboard/crud";
import { ErrorUi } from "@/components/feedbacks/error-ui";
import { LoadingUi } from "@/components/feedbacks/loading-ui";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCarGetOne } from "@/hooks/car";
import { CarUpdateSchema, TypeCarUpdateSchema } from "@/schemas/car";
import { UtilsCarUpdate } from "@/utils/services/car";
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ImagePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CarRentalUpdateProps {
  id: string;
}
export const CarRentalUpdate = ({ id }: CarRentalUpdateProps) => {
  const router = useRouter();
  const session = useSession();
  const carGetOne = useCarGetOne({ id });

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateCar"],
    mutationFn: (data: TypeCarUpdateSchema) =>
      UtilsCarUpdate({ data, id, token: session.data?.user.token }),
  });

  const form = useForm<TypeCarUpdateSchema>({
    resolver: zodResolver(CarUpdateSchema),
  });

  const handleForm = form.handleSubmit((values: TypeCarUpdateSchema) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.back();
      },

      onError: (err) => {
        toast.error(UtilsErrorConsumeAPI(err));
      },
    });
  });

  if (carGetOne.isLoading) return <LoadingUi />;
  if (carGetOne.isError) return <ErrorUi message={carGetOne.error?.message} />;

  return (
    <Crud title="Car" titleAction="Update car">
      <Form {...form}>
        <form onSubmit={handleForm} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="brand..."
                      type="text"
                      defaultValue={carGetOne.data.data.brand.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="model..."
                      type="text"
                      defaultValue={carGetOne.data.data.model}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="year..."
                      type="text"
                      defaultValue={carGetOne.data.data.year}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="license_plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Plate</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="license plate..."
                      type="text"
                      defaultValue={carGetOne.data.data.license_plate}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seats</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="seats..."
                        type="number"
                        defaultValue={carGetOne.data.data.seats}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={carGetOne.data.data.status}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AVAILABLE">Available</SelectItem>
                          <SelectItem value="UNAVAILABLE">
                            Unavailable
                          </SelectItem>
                          <SelectItem value="MAINTENANCE">
                            Maintenance
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="bg-green-500 self-end" asChild>
                <Link href={`/dashboard/car-rental/add/image/${id}`}>
                  Add <ImagePlus />{" "}
                </Link>
              </Button>
            </div>
            <FormField
              control={form.control}
              name="price_per_day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Per Day</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="price per day..."
                      type="number"
                      defaultValue={carGetOne.data.data.price_per_day}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonLoading isLoading={isPending} type="submit">
            Update
          </ButtonLoading>
        </form>
      </Form>
    </Crud>
  );
};
