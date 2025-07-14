import { getSession } from "@/actions/getSession"
import { RentalHistory } from "./_components/rental-history"

const CarRental = async () => {
    const session = await getSession()

    return (
        <section className="py-8">
            <div className="container max-w-6xl mx-auto">
                <h2 className="text-2xl text-primary-blue font-poppins-semibold">My rental</h2>
                <RentalHistory token={session.user.token} />
            </div>
        </section>
    )
}

export default CarRental