
import { HomeCarRecomendation } from "./car-recomendation"
import { HomeHeroBanner } from "./hero-banner"
import { HomePopularCar } from "./popular-car"
import { HomeWhyChooseUs } from "./why-choose-us"

export const HomePage = () => {
    return (
        <>
            <HomeHeroBanner />
            <HomeWhyChooseUs />
            <HomePopularCar />
            <HomeCarRecomendation />
        </>
    )
}