"use client";

import { ErrorUi } from "@/components/feedbacks/error-ui";
import { LoadingUi } from "@/components/feedbacks/loading-ui";
import { useCarGetOne } from "@/hooks/car";
import { useToastSmart } from "@/hooks/toast/useToastSmart";
import { queryHelpers } from "@/utils/queryHelpers";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ThumbnailCar } from "@/features/admin/dashboard/main/inventory/car/thumbnail";

const PageDashboardCarRentalThumbnail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: session, status } = useSession();
  const { data, isLoading, isError, error } = useCarGetOne({ id });

  const { isAnyLoading, isAnyError, isAnyErrorMessage } = queryHelpers([
    { isLoading, isError, errorMessage: error?.message },
  ]);
  useToastSmart({
    isLoading: isAnyLoading,
    isError: isAnyError,
    error: isAnyErrorMessage,
  });

  if (isAnyLoading) return LoadingUi();
  if (isAnyError) return ErrorUi({ message: isAnyErrorMessage });

  if (status === "loading") toast.loading("Loading session...");

  return <ThumbnailCar data={data} token={session?.user.token} />;
};

export default PageDashboardCarRentalThumbnail;
