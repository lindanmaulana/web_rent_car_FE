import { Button } from "@/components/ui/button"
import Image from "next/image"

export const HomeHeroBanner = () => {
    return (
        <section className="w-full h-[468px] py-10">
            <div className="container max-w-6xl h-full mx-auto">
                <div className="w-full h-full grid grid-cols-2 gap-8 place-content-center">
                    <article className="relative bg-sky rounded-[10px] p-6 h-[360px] flex flex-col gap-4 items-start">
                        <figure className="absolute bottom-0 left-0">
                            <Image src="/car-hero-1.svg" alt="the platform for car" width={200} height={200} className="w-full h-full object-cover" />
                        </figure>
                        <h2 className="text-2xl text-white max-w-[60%] font-semibold text-shadow">Platform terbaik untuk penyewaan mobil.</h2>
                        <p className="text-white max-w-[60%] mb-1">Kemudahan melakukan sewa mobil dengan aman dan terpercaya. Tentunya dengan harga yang murah.</p>
                        <Button size="sm" className="bg-primary-blue rounded">Rental Car</Button>
                    </article>
                    <article className="relative bg-primary-blue rounded-[10px] p-6 h-[360px] flex flex-col gap-4 items-start">
                        <figure className="absolute bottom-0 left-0">
                            <Image src="/car-hero-2.svg" alt="the platform for car" width={200} height={200} className="w-full h-full object-cover" />
                        </figure>
                        <h2 className="text-2xl text-white max-w-[60%] font-semibold text-shadow">Cara mudah menyewa mobil dengan harga murah.</h2>
                        <p className="text-white max-w-[60%] mb-1">Menyediakan jasa penyewaan mobil murah dengan fasilitas aman dan nyaman.</p>
                        <Button size="sm" className="bg-sky rounded">Rental Car</Button>
                    </article>
                </div>
            </div>
        </section>
    )
}