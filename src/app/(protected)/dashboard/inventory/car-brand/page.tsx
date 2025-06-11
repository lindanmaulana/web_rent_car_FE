import { CarBrandHeader } from './_components/car-brand-header';
import { CarBrandList } from './_components/car-brand-list';

const PageDashboardInventoryCarBrand = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <CarBrandHeader />
      <CarBrandList />
    </div>
  );
};

export default PageDashboardInventoryCarBrand;
