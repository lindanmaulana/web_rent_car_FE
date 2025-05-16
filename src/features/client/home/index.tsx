import { HomeCarRecomendation } from "./car-rekomendation"
import { HomeHeroBanner } from "./hero-banner"
import { HomePopularCar } from "./popular-car"

export const HomePage = () => {
    return (
        <>
            <HomeHeroBanner />
            <HomePopularCar />
            <HomeCarRecomendation />
        </>
    )
}