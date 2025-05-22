import { CarRental } from "@/features/client/car/car-rental"
import { Metadata } from "next"

interface Props {
    params: Promise<{id: string}>
}

const PageCarRental = async ({params}: Props) => {
    const {id} = await params

    return (
        <section className="py-10">
            <div className="container max-w-6xl mx-auto">
                <CarRental id={id[0]} />
            </div>
        </section>
    )
}

export default PageCarRental


export async function generateMetaData({params}: Props): Promise<Metadata> {
    const {id} = await params

    return {
        title: `Car Rental ${id}`
    }
}