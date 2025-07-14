import { CarSelect } from '@/features/client/car/components/car-select';
import { CarContent } from './_components/car-content';

const Car = () => {
  return (
    <section className="bg-white py-10">
      <div className="container max-w-6xl mx-auto px-4 lg:px-0 space-y-8">
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="text-3xl font-semibold">The OK Mobility fleet at your fingertips</h2>
          <p className="">Choose the mobility option that best suits you</p>
        </div>
        <ul className="w-full flex items-center justify-center gap-14">
          <CarSelect />
        </ul>
        <CarContent />
      </div>
    </section>
  );
};

export default Car;
