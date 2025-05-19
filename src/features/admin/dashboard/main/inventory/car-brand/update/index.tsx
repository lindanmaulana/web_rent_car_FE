"use client";

import { ButtonLoading } from "@/components/button-loading";
import { Crud } from "@/components/dashboard/crud";
import { ErrorUi } from "@/components/feedbacks/error-ui";
import { LoadingUi } from "@/components/feedbacks/loading-ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCarBrandGetOne } from "@/hooks/car-brand/useCarBrandGetone";
import { CarBrandSchema, TypeCarBrandSchemaUpdate } from "@/schemas/car-brand";
import { UtilsCarBrand } from "@/utils/services/car-brand";
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CarBrandUpdateProps {
  id: string;
}

export const CarBrandUpdate = ({ id }: CarBrandUpdateProps) => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const carBrandGetOne = useCarBrandGetOne(id);

  const form = useForm<TypeCarBrandSchemaUpdate>({
    resolver: zodResolver(CarBrandSchema.UPDATE),
    // defaultValues: {
    //     name: carBrandGetOne.data?.data.name,
    //     country: carBrandGetOne.data?.data.country
    // }
  });

  const mutation = useMutation({
    mutationKey: ["carBrandUpdate"],
    mutationFn: (data: TypeCarBrandSchemaUpdate) =>
      UtilsCarBrand.update({ token: session.data?.user.token, id, data }),
  });

  const handleSubmit = form.handleSubmit((values: TypeCarBrandSchemaUpdate) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["carBrandGetAll"] });
        router.back();
      },

      onError: (err) => {
        toast.error(UtilsErrorConsumeAPI(err));
      },
    });
  });

  if (carBrandGetOne.isLoading) return <LoadingUi />;
  if (carBrandGetOne.isError) return <ErrorUi message={carBrandGetOne.error?.message} />;
  return (
    <Crud title="Car Category" titleAction="Update" className="bg-white">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="max-w-1/2 space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Name example..."
                      defaultValue={carBrandGetOne.data.data.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Name example..."
                      defaultValue={carBrandGetOne.data.data.country}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonLoading type="submit" isLoading={mutation.isPending}>
            Submit
          </ButtonLoading>
        </form>
      </Form>
    </Crud>
  );
};
