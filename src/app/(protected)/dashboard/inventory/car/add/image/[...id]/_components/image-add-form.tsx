'use client';

import { ButtonLoading } from '@/components/button-loading';
import { Crud } from '@/app/(protected)/dashboard/_components/layout-crud/index';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageAddSchema, TypeImageAddSchema } from '@/schemas/images';
import { UtilsErrorConsumeAPI } from '@/utils/helpers/errors';
import { UtilsImageCreate } from '@/utils/services/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ImageUp, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddImage {
  image: File;
}

interface ImageAddFormProps {
  id: string;
  token?: string;
}
export const ImageAddForm = ({ id, token }: ImageAddFormProps) => {
  const [preview, setPreview] = useState<string>('');
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ['createImage'],
    mutationFn: (values: AddImage) => UtilsImageCreate({ file: values.image, id, token }),
  });

  const form = useForm<TypeImageAddSchema>({
    resolver: zodResolver(ImageAddSchema),
  });

  const handleForm = form.handleSubmit((values) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.back();
      },

      onError: (err) => {
        toast.error(UtilsErrorConsumeAPI(err));
      },
    });
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: File | null) => void) => {
    const file = e.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);
    } else {
      onChange(null);
    }
  };
  return (
    <Crud title="Image Car" titleAction="New Image Car">
      <Form {...form}>
        <form onSubmit={handleForm} className="h-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="min-h-40">
                <FormControl>
                  <div className="w-full flex items-center justify-center">
                    {preview ? (
                      <div className="relative">
                        <Image src={preview} alt="preview image" width={200} height={200} className="object-cover" />
                        <Button onClick={() => setPreview('')} variant="destructive" size="sm" className="absolute top-0 -right-10 cursor-pointer rounded-l-none rounded-r-xl">
                          <X size={40} />
                        </Button>
                      </div>
                    ) : (
                      <Label htmlFor="file-input" className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <ImageUp size={50} />
                        <h4>Drag image here to upload or</h4>
                        <p className="rounded-full cursor-pointer bg-green-500 p-2 text-white">Choose Image</p>
                      </Label>
                    )}
                    <Input id="file-input" onChange={(e) => handleChange(e, field.onChange)} type="file" accept="image/*" className="hidden" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <ButtonLoading type="submit" isLoading={mutation.isPending}>
            Add
          </ButtonLoading>
        </form>
      </Form>
    </Crud>
  );
};
