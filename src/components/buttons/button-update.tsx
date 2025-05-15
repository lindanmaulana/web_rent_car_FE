import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonUpdate {
  pathname: string;
  id: string;
  children: ReactNode;
  className?: string
}
export const ButtonUpdate = (props: ButtonUpdate) => {
  const { pathname, id, children, className } = props;
  return (
    <Button size="sm" asChild>
      <Link href={`${pathname}/update/${id}`} className={`${className} text-xs`}>
        {children}
      </Link>
    </Button>
  );
};
