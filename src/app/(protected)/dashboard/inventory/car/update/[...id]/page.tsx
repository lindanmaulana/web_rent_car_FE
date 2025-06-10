"use client";

import { useParams } from "next/navigation";
import { CarUpdateForm } from "./components/car-update-form";

const PageDashboardCarRentalUpdate = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <CarUpdateForm id={id} />
  );
};

export default PageDashboardCarRentalUpdate;
