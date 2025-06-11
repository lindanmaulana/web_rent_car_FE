'use client';

import { ButtonLoading } from '@/components/button-loading';
import { Crud } from '@/app/(protected)/dashboard/_components/layout-crud/index';
import { ErrorUi } from '@/components/feedbacks/error-ui';
import { LoadingUi } from '@/components/feedbacks/loading-ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCarCategoryGetOne } from '@/hooks/car-category';
import { CarCategorySchema, TypeCarCategoryUpdateSchema } from '@/schemas/car-category';
import { UtilsCarCategory } from '@/utils/services/car-category';
import { UtilsErrorConsumeAPI } from '@/utils/helpers/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CarCategoryUpdateProps {
  id: string;
}
export const CarCategoryUpdateForm = ({ id }: CarCategoryUpdateProps) => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const carCategoryGetOne = useCarCategoryGetOne(id);

  const form = useForm<TypeCarCategoryUpdateSchema>({
    resolver: zodResolver(CarCategorySchema.UPDATE),
    defaultValues: {
      name: carCategoryGetOne.data?.data.name,
      description: carCategoryGetOne.data?.data.description,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['carCategoryUpdate'],
    mutationFn: (data: TypeCarCategoryUpdateSchema) => UtilsCarCategory.update({ id, token: session.data?.user.token, data }),
  });

  const handleSubmit = form.handleSubmit((values: TypeCarCategoryUpdateSchema) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ['carCategoryGetAll'] });
        router.replace('/dashboard/inventory/car-category');
      },

      onError: (err) => {
        toast.error(UtilsErrorConsumeAPI(err));
      },
    });
  });

  if (session.status === 'loading' || carCategoryGetOne.isLoading) return <LoadingUi />;

  if (carCategoryGetOne.isError) return <ErrorUi message={carCategoryGetOne.error.message} />;

  return (
    <Crud title="Car Category" titleAction="Update">
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
                    <Input {...field} type="text" placeholder="Name .example" />
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonLoading isLoading={isPending} type="submit">
            Submit
          </ButtonLoading>
        </form>
      </Form>
    </Crud>
  );
};
