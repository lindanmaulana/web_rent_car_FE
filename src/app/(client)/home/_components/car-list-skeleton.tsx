import { CarSkeleton } from './car-skeleton';

export const CarListSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
    </div>
  );
};
