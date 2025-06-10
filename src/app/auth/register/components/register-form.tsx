"use client";

import { AuthAlert } from "@/components/auth-alert";
import { CardAuth } from "@/components/auth/card-auth";
import { ButtonLoading } from "@/components/button-loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema, typeRegisterSchema } from "@/schemas/auth";
import { UtilsAuth } from "@/utils/services/auth";
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { alert } from "../../../../../types/alert";

export const RegisterForm = () => {
  const router = useRouter();
  const [alert, setAlert] = useState<alert>({
    type: "error",
    message: "",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["authRegister"],
    mutationFn: (values: typeRegisterSchema) => UtilsAuth.Register(values),
  });

  const form = useForm<typeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleFormRegister = form.handleSubmit((values: typeRegisterSchema) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.push("/auth/login");
      },

      onError: (err) => {
        setAlert({ message: UtilsErrorConsumeAPI(err), type: "error" });
      },
    });
  });

  return (
    <CardAuth
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      headerLabel="Create an account"
    >
      <Form {...form}>
        <form onSubmit={handleFormRegister} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Example name"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@gmail.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <AuthAlert message={alert.message} type={alert.type} />
          <ButtonLoading type="submit" isLoading={isPending} className="w-full">
            Register
          </ButtonLoading>
        </form>
      </Form>
    </CardAuth>
  );
};
