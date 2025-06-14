import { CarList } from './_components/car-list';
import { CarHeader } from './_components/car-recomendation-header';

export const HomeCarRecomendation = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="space-y-5">
          <CarHeader />
          <CarList />
        </div>
      </div>
    </section>
  );
};
