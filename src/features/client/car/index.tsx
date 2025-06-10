import { DynamicCardCar } from "../components/dynamic-card-car.item"
import { CarSelect } from "./components/car-select"

export const CarPage = () => {
    return (
        <>
            <section className="bg-white py-10">
                <div className="container max-w-6xl mx-auto px-4 lg:px-0 space-y-8">
                    <div className="flex flex-col items-center justify-center gap-1">
                        <h2 className="text-3xl font-semibold">The OK Mobility fleet at your fingertips</h2>
                        <p className="">Choose the mobility option that best suits you</p>
                    </div>
                    <ul className="w-full flex items-center justify-center gap-14">
                        <CarSelect />
                    </ul>
                    <ul className="grid grid-cols-3 gap-5">
                        <DynamicCardCar />
                    </ul>
                </div>
            </section>
        </>
    )
}