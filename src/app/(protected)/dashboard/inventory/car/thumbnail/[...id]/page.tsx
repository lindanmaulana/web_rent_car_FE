"use client";

import { ThumbnailCar } from "@/features/admin/dashboard/main/inventory/car/thumbnail";
import { useParams } from "next/navigation";

const PageDashboardCarRentalThumbnail = () => {
  const { id } = useParams<{ id: string }>();

  return <ThumbnailCar id={id} />;
};

export default PageDashboardCarRentalThumbnail;
