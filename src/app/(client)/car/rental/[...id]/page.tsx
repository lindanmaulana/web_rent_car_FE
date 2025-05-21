import { CarRental } from "@/features/client/car/car-rental"
import { Metadata } from "next"

interface Props {
    params: {
        id: string
    }
}

const PageCarRental = ({params}: Props) => {
    return (
        <section>
            <div className="container max-w-6xl mx-auto">
                <CarRental id={params.id} />
            </div>
        </section>
    )
}

export default PageCarRental


export async function generateMetaData({params}: Props): Promise<Metadata> {
    return {
        title: `Car Rental ${params.id}`
    }
}