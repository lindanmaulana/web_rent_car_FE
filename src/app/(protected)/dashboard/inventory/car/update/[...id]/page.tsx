"use client";

import { CarRentalUpdate } from "@/features/admin/dashboard/main/inventory/car/update";
import { useParams } from "next/navigation";

const PageDashboardCarRentalUpdate = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <CarRentalUpdate id={id}/>
  );
};

export default PageDashboardCarRentalUpdate;
