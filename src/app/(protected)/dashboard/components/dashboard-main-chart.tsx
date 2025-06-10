'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useCarGetAll } from '@/hooks/car';
import { useRentalGetAll } from '@/hooks/rental';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { Rental } from '../../../../../types/rental';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface chartRental {
  brand: string;
  model: string;
  amount: number;
}

interface DashboardMainChartProps {
  session: Session | null;
}
export const DashboardMainChart = ({ session }: DashboardMainChartProps) => {
  const [chartRentalData, setChartRentalData] = useState<chartRental[]>([
    {
      brand: '',
      model: '',
      amount: 0,
    },
  ]);

  const rentalGetAll = useRentalGetAll({
    token: session?.user.token,
  });

  const carGetAll = useCarGetAll({ params: '' });

  useEffect(() => {
    const carChart = carGetAll.data.data.map((car) => {
      const rentalChart = rentalGetAll.data.data.filter((rental: Rental) => {
        return rental.car_id === car.id;
      });

      return {
        brand: car.brand.name,
        model: car.model,
        amount: rentalChart.length,
      };
    });

    const sortDataCar = carChart.sort((a, b) => b.amount - a.amount);

    setChartRentalData(sortDataCar);
  }, [carGetAll.data, rentalGetAll.data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Car Rental</CardTitle>
        <CardDescription>Car 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartRentalData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="model" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The unit with the highest rental this month is the{' '}
          {/* {chartRentalData[0].brand} <TrendingUp className="h-4 w-4" /> */}
        </div>
        <div className="leading-none text-muted-foreground">Showing total cars for rent</div>
      </CardFooter>
    </Card>
  );
};
