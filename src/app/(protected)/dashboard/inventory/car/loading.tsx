import { CarHeaderSkeleton } from './_components/car-header-skeleton';
import { CarListSkeleton } from './_components/car-list-skeleton';

const PageDashboardCarRentalLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <CarHeaderSkeleton />
      <CarListSkeleton />
    </div>
  );
};

export default PageDashboardCarRentalLoading;
