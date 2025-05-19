import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { LinkQuery } from "../link-query";

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
      <LinkQuery href={`${pathname}/update/${id}`} className={`${className} text-xs`}>{children}</LinkQuery>
    </Button>
  );
};
