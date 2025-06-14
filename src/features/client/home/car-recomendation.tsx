import { HomeCarRecomendationHeader } from "@/features/client/home/components/car-rekomendation/header"

export const HomeCarRecomendation = () => {
    
    return (
        <section className="w-full py-8 bg-white">
            <div className="container max-w-6xl mx-auto">
                <div className="space-y-5">
                    <HomeCarRecomendationHeader />
                    <div className="grid grid-cols-4 gap-4">
                        <DynamicCardCar />
                    </div>
                </div>
            </div>
        </section>
    )
}