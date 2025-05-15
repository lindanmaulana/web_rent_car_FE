import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ButtonDelete {
  id: string;
  onclick: (id: string) => void;
  isLoading: boolean
  className?: string
  children: ReactNode
}
export const ButtonDelete = ({ id, onclick, isLoading, className, children }: ButtonDelete) => {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => onclick(id)}
      className={`${className} text-xs`}
      disabled={isLoading}
    >
      {children}
    </Button>
  );
};
