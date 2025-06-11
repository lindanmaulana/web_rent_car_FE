
import { ThumbnailCar } from "./_components/thumbnail-form";

interface GetParams {
  params: {
    id: string
  }
}
const PageDashboardCarRentalThumbnail = ({params}: GetParams) => {

  return <ThumbnailCar id={params.id} />;
};

export default PageDashboardCarRentalThumbnail;