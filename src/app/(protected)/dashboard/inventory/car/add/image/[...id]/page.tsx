"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { ImageAddForm } from "./_components/image-add-form";

const DashboardCarRentalAddImage = () => {
  const { data, status } = useSession();
  const { id } = useParams<{ id: string }>();

  if (status === "loading") toast.loading("Loading session...");

  return <ImageAddForm id={id} token={data?.user.token} />;
};

export default DashboardCarRentalAddImage;
