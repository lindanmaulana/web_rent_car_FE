"use client"

import { signOutAction } from "@/actions/signOutAction";
import { AlertConfirmation } from "@/components/alert-confirmation";
import { SidebarLayout } from "@/components/sidebar/sidebar-layout";
import { SidebarList } from "@/components/sidebar/sidebar-list";
import { ChartNoAxesGantt } from "lucide-react";

const Sidebar = () => {
  const handleLogout = async () => {
    await signOutAction()
  };

  return (
      <nav className="w-66 h-full overflow-y-auto bg-white">
          <SidebarLayout headerTitle="Main Menu">
            <SidebarList />
          </SidebarLayout>
          <AlertConfirmation
          title="Apakah anda yakin ingin logout ?"
          description="Anda akan keluar dari akun anda perlu login kembali untuk melanjutkan"
          handleConfirm={handleLogout}
        >
          <button className="cursor-pointer w-full font-semibold text-sm px-5 rounded-md flex items-center gap-2 text-red-500">
            {" "}
            <ChartNoAxesGantt size={20} /> logout
          </button>
        </AlertConfirmation>
      </nav>
      // <Navbar>
        
      // </Navbar>
  );
};

export default Sidebar;