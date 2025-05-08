import { NavbarMainMenu } from "@/features/admin/dashboard/navbar/navbar-main-menu";
import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}
export const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="w-66 h-full overflow-y-auto bg-white">
      <NavbarMainMenu></NavbarMainMenu>
      {children}
    </nav>
  );
};
