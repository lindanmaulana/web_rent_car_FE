import { CarDetail } from "@/features/client/car/car-detail"
import { Metadata } from "next"

interface Props {
    params: {
        id: string
    }
}

const PageCarDetail = async ({params}: Props) => {
    const {id} = params

    return (
        <section className="py-26">
            <div className="container max-w-6xl mx-auto">
                <CarDetail id={id} />
            </div>
        </section>
    )
}

export default PageCarDetail


export async function generateMetaData({params}: Props): Promise<Metadata> {
    return {
        title: `Car detail ${params.id}`
    }
}