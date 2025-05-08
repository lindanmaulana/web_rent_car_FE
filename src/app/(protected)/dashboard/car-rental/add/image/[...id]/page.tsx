"use client";

import { CarRentalAddImage } from "@/features/admin/dashboard/main/car/add/image";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const DashboardCarRentalAddImage = () => {
  const { data, status } = useSession();
  const { id } = useParams<{ id: string }>();

  if (status === "loading") toast.loading("Loading session...");

  return <CarRentalAddImage id={id} token={data?.user.token} />;
};

export default DashboardCarRentalAddImage;
