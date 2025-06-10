import { auth, signOut } from "@/auth";
import { AlertConfirmation } from "@/components/alert-confirmation";
import { Navbar } from "@/features/admin/dashboard/navbar";
import { ChartNoAxesGantt } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface PageDashboardLayoutProps {
  children: ReactNode;
}

const PageDashboardLayout = async ({ children }: PageDashboardLayoutProps) => {
  const session = await auth()

  if(!session) {
    redirect("/auth/login")
  }

  const handleLogout = async () => {
    "use server";
    await signOut({ redirectTo: "/auth/login" });
  };


  return (
    <div className="w-full flex h-screen overflow-hidden pt-22">
      <Navbar>
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
      </Navbar>
      <div className="flex-1 bg-white-blue p-6 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default PageDashboardLayout;
