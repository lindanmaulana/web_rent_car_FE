'use client';

import { ButtonLoading } from '@/components/button-loading';
import { Crud } from '@/components/dashboard/layout/crud';
import { LoadingUi } from '@/components/feedbacks/loading-ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CarBrandSchema, TypeCarBrandSchemaCreate } from '@/schemas/car-brand';
import { UtilsCarBrand } from '@/utils/services/car-brand';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const DashboardMainCarBrandAdd = () => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['carBrandCreate'],
    mutationFn: (data: TypeCarBrandSchemaCreate) => UtilsCarBrand.create({ token: session.data?.user.token, data }),
  });

  const form = useForm<TypeCarBrandSchemaCreate>({
    resolver: zodResolver(CarBrandSchema.CREATE),
    defaultValues: {
      name: '',
      country: '',
    },
  });

  const handleForm = form.handleSubmit((values: TypeCarBrandSchemaCreate) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ['carBrandGetAll'] });
        router.back();
      },
    });
  });

  if (session.status === 'loading') return <LoadingUi />;
  return (
    <Crud title="Car Brand" titleAction="Add">
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="country..." />
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
