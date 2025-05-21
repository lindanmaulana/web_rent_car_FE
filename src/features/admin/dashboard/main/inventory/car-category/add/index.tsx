"use client";

import { ButtonLoading } from "@/components/button-loading";
import { Crud } from "@/components/dashboard/crud";
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
import {
  CarCategorySchema,
  TypeCarCategoryAddSchema,
} from "@/schemas/car-category";
import { UtilsCarCategory } from "@/utils/services/car-category";
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const CarCategoryAdd = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const urlParams = useSearchParams()

  const mutation = useMutation({
    mutationKey: ["carCategoryCreate"],
    mutationFn: (value: TypeCarCategoryAddSchema) =>
      UtilsCarCategory.create({ data: value, token: data?.user.token }),
  });

  const form = useForm<TypeCarCategoryAddSchema>({
    resolver: zodResolver(CarCategorySchema.CREATE),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleForm = form.handleSubmit((value: TypeCarCategoryAddSchema) => {
    mutation.mutate(value, {
      onSuccess: (data) => {
        toast.success(data.message);
        form.reset();
        router.replace(`/dashboard/inventory/car-category?${urlParams.toString()}`);
      },

      onError: (err) => {
        toast.error(UtilsErrorConsumeAPI(err));
      },
    });
  });

  if (status === "loading") return <LoadingUi />;
  return (
    <Crud title="Car Category" titleAction="Add ">
      <Form {...form}>
        <form onSubmit={handleForm} className="max-w-1/2 space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="example..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[200px]" />
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
