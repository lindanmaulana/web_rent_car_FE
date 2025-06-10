'use client';

import { ErrorUi } from '@/components/feedbacks/error-ui';
import { LoadingUi } from '@/components/feedbacks/loading-ui';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCarBrandGetAll } from '@/hooks/car-brand';
import { useCarCategoryGetAll } from '@/hooks/car-category';
import { CarCreateSchema, TypeCarCreateSchema } from '@/schemas/car';
import { UtilsErrorConsumeAPI } from '@/utils/helpers/errors';
import { UtilsCarCreate } from '@/utils/services/car';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const CarAddForm = () => {
  const session = useSession();
  const router = useRouter();
  const carCategory = useCarCategoryGetAll();
  const carBrand = useCarBrandGetAll();

  const isLoading = carCategory.isLoading || carBrand.isLoading;
  const isError = carCategory.isError || carBrand.isError;

  const mutation = useMutation({
    mutationKey: ['carAdd'],
    mutationFn: (values) => UtilsCarCreate(values, session.data?.user.token),
  });

  const form = useForm<TypeCarCreateSchema>({
    resolver: zodResolver(CarCreateSchema),
    defaultValues: {
      car_category_id: '',
      car_brand_id: '',
      model: '',
      year: '',
      license_plate: '',
      seats: '',
      price_per_day: '',
    },
  });

  const handleForm = form.handleSubmit((values: TypeCarCreateSchema) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        form.reset();
        router.back();
      },

      onError: (err) => {
        toast.error(UtilsErrorConsumeAPI(err));
      },
    });
  });

  if (session.status === 'loading' || isLoading) return <LoadingUi />;
  if (isError) return <ErrorUi message={carCategory.error?.message || carBrand.error?.message} />;

  return (
      <Form {...form}>
        <form onSubmit={handleForm} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-x-5">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="w-2/3">
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="model..." type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-1/3 flex items-center justify-end gap-x-4">
                <FormField
                  control={form.control}
                  name="car_category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Category</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Category..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {carCategory.data.data?.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="car_brand_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Brand</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Brand..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {carBrand.data.data?.map((carBrand) => (
                                <SelectItem key={carBrand.id} value={carBrand.id}>
                                  {carBrand.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="year..." type="text" />
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
                    <Input {...field} placeholder="license plate..." type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seats</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="seats..." type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_per_day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Per Day</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="price per day..." type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </Form>
  );
};
