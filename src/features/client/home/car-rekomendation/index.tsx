import { HomeCarRecomendationCardItemDynamic } from "@/features/client/home/car-rekomendation/dynamic-car.item"

export const HomeCarRecomendation = () => {
    
    return (
        <section className="w-full py-8">
            <div className="container max-w-6xl mx-auto">
                <div className="space-y-5">
                    <h2 className="text-gray-bluish text-[16px] font-semibold text-left">Recomendation Car</h2>
                    <div className="grid grid-cols-4 gap-8">
                        <HomeCarRecomendationCardItemDynamic />
                    </div>
                </div>
            </div>
        </section>
    )
}