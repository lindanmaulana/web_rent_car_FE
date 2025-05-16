"use client";

import { loginCredentials } from "@/actions/auth";
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
import { LoginSchema, typeLoginSchema } from "@/schemas/auth";
import { UtilsErrorConsumeAPI } from "@/utils/helpers/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { alert } from "../../../types/alert";

export const LoginForm = () => {
  const router = useRouter();
  const [alert, setAlert] = useState<alert>({
    message: "",
    type: "success",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["authLogin"],
    mutationFn: (values: typeLoginSchema) => loginCredentials(values),
  });

  const form = useForm<typeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormLogin = form.handleSubmit((values: typeLoginSchema) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Login successfully");
        router.push("/");
      },

      onError: (err) => {
        setAlert({ type: "error", message: UtilsErrorConsumeAPI(err) });
      },
    });
  });

  return (
    <CardAuth
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      headerLabel="Wellcome Back"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={handleFormLogin} className="space-y-6">
          <div className="space-y-4">
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
            Submit
          </ButtonLoading>
        </form>
      </Form>
    </CardAuth>
  );
};
