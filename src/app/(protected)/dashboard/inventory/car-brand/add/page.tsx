import { getSession } from "@/actions/getSession"
import { CarBrandAddForm } from "./_components/car-brand-add-form"

const PageDashboardInventoryCarBrandAdd = async () => {
    const session = await getSession()

    const token = session.user.token
    return (
        <CarBrandAddForm token={token} />
    )
}

export default PageDashboardInventoryCarBrandAdd