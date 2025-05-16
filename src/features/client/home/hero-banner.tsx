import { Button } from "@/components/ui/button"
import Image from "next/image"

export const HomeHeroBanner = () => {
    return (
        <section className="w-full h-screen">
            <div className="container max-w-6xl h-full mx-auto">
                <div className="w-full h-full grid grid-cols-2 gap-8 place-content-center">
                    <article className="relative bg-sky rounded-[10px] p-6 h-[360px] flex flex-col gap-4 items-start">
                        <figure className="absolute bottom-0 left-0">
                            <Image src="/car-hero-1.svg" alt="the platform for car" width={200} height={200} className="w-full h-full object-cover" />
                        </figure>
                        <h2 className="text-2xl text-white max-w-[40%] font-semibold text-shadow">The Best Platform for Car Rental</h2>
                        <p className="text-white max-w-[60%] mb-1">Ease of doing a car rental safely and reliably. Of course at a low price.</p>
                        <Button size="sm" className="bg-primary-blue rounded">Rental Car</Button>
                    </article>
                    <article className="relative bg-primary-blue rounded-[10px] p-6 h-[360px] flex flex-col gap-4 items-start">
                        <figure className="absolute bottom-0 left-0">
                            <Image src="/car-hero-2.svg" alt="the platform for car" width={200} height={200} className="w-full h-full object-cover" />
                        </figure>
                        <h2 className="text-2xl text-white max-w-[46%] font-semibold text-shadow">Easy way to rent a car at a low price</h2>
                        <p className="text-white max-w-[60%] mb-1">Providing cheap car rental services and safe and comfortable facilities.</p>
                        <Button size="sm" className="bg-sky rounded">Rental Car</Button>
                    </article>
                </div>
            </div>
        </section>
    )
}