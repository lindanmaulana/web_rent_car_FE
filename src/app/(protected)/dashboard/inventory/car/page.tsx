import { CarMain } from "./components/car-main";
import { CarHeader } from "./components/car-header";

const PageDashboardInventoryCar = () => {
  return (
      <div className="flex flex-col gap-4">
        <CarHeader />
        <CarMain />
      </div>
  )
};

export default PageDashboardInventoryCar;
