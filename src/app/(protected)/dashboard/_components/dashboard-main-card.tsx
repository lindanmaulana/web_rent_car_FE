import { CardCar } from '@/app/(protected)/dashboard/_components/dashboard-card/card-car';
import { CardInsight } from '@/app/(protected)/dashboard/_components/dashboard-card/card-insight';
import { CardRental } from '@/app/(protected)/dashboard/_components/dashboard-card/card-rental';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PiCarProfileDuotone } from 'react-icons/pi';

interface DashboardMainCarProps {
  token: string;
}
export const DashboardMainCard = ({ token }: DashboardMainCarProps) => {
  return (
    <div className="w-full grid grid-cols-4 gap-8 absolute -bottom-20 left-0 px-4">
        <CardCar />
        <CardRental token={token} />
        <CardInsight />
        
      <Card className="bg-white rounded-md min-h-26">
        <CardTitle className="px-4 flex items-center justify-between">
          <span className="text-xl">Car</span>
          <span className="bg-primary-blue/20 px-2 rounded py-px">
            <PiCarProfileDuotone className="text-3xl text-primary-blue" />{' '}
          </span>
        </CardTitle>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};
