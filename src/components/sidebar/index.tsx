import { ReactNode } from "react";
import { SidebarLayout } from "./sidebar-layout";
import { SidebarList } from "./sidebar-list";
interface SidebarProps {
  children: ReactNode;
}
export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <nav className="w-66 h-full overflow-y-auto bg-white">
      <SidebarLayout headerTitle="Main Menu">
        <SidebarList />
      </SidebarLayout>
      {children}
    </nav>
  );
};
