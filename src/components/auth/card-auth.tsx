"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { AuthForm } from "./auth-form";
import { AuthImage } from "./auth-image";

interface CardAuthProps {
  children: ReactNode;
  showSocial?: boolean;
  backButtonHref: string
  backButtonLabel: string
  headerLabel: string
}
export const CardAuth = ({ children, showSocial,backButtonHref, backButtonLabel, headerLabel }: CardAuthProps) => {
  return (
    <Card className="w-full h-screen border-none p-0">
      <CardContent className="w-full h-full flex items-center gap-x-4 p-0 overflow-hidden">
        <AuthImage />
        <AuthForm showSocial={showSocial} backButtonHref={backButtonHref} backButtonLabel={backButtonLabel} headerLabel={headerLabel}>
            {children}
        </AuthForm>
      </CardContent>
    </Card>
  );
};
