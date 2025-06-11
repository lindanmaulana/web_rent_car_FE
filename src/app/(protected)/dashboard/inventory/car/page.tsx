import { getSession } from "@/actions/getSession";
import { CarHeader } from "@/app/(protected)/dashboard/inventory/car/_components/car-header";
import { CarList } from "@/app/(protected)/dashboard/inventory/car/_components/car-list";

const PageDashboardInventoryCar = async () => {
  const session = await getSession()

  const token = session.user.token
  return (
      <div className="flex flex-col gap-4">
        <CarHeader />
        <CarList token={token} />
      </div>
  )
};

export default PageDashboardInventoryCar;
