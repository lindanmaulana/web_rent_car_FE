import { Car, MapPinned, Wallet } from "lucide-react"

export const HomeWhyChooseUs = () => {
    return (
        <section className="py-10">
            <div className="container max-w-6xl mx-auto px-4 lg:px-0">
                <article className="grid grid-cols-3 gap-4">
                    <article className="flex flex-col items-center justify-center gap-1 bg-white rounded py-3">
                        <MapPinned size={52} />
                        <h2 className="text-lg font-semibold">Availability</h2>
                        <p className="max-w-1/2 text-center text-sm">Service is ready whenever you need it.</p>
                    </article>
                    <article className="flex flex-col items-center justify-center gap-1 bg-white rounded py-3">
                        <Car size={52} />
                        <h2 className="text-lg font-semibold">Availability</h2>
                        <p className="max-w-1/2 text-center text-sm">Service is ready whenever you need it.</p>
                    </article>
                    <article className="flex flex-col items-center justify-center gap-1 bg-white rounded py-3">
                        <Wallet size={52} />
                        <h2 className="text-lg font-semibold">Availability</h2>
                        <p className="max-w-1/2 text-center text-sm">Service is ready whenever you need it.</p>
                    </article>
                </article>
            </div>
        </section>
    )
}