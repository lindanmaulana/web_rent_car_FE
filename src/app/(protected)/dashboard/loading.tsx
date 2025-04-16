import { TbLoaderQuarter } from "react-icons/tb"

const PageDashboardLoading = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <p>Loading please waitt.. <TbLoaderQuarter className="animate-spin" /></p>
        </div>
    )
}

export default PageDashboardLoading