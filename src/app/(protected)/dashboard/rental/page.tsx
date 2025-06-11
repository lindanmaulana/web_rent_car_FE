import { RentalMain } from "./_components/rental-main"
import { getSession } from "@/actions/getSession"

const PageDashboardRental = async () => {
    const session = await getSession()

    const token = session.user.token
    return (
        <div className="flex flex-col gap-4">
            <RentalMain token={token} />
        </div>      
    )
  }


  export default PageDashboardRental