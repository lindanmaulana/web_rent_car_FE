import { Button } from "@/components/ui/button"
import { LucideChevronsRight } from "lucide-react"
import Link from "next/link"
import { HomeCarRecomendationCardItemDynamic } from "./components/car-rekomendation/dynamic-car.item"

export const HomeCarRecomendation = () => {
    
    return (
        <section className="w-full py-8">
            <div className="container max-w-6xl mx-auto">
                <div className="space-y-5">
                    <h2 className="text-gray-bluish text-[16px] font-semibold text-left">Recomendation Car</h2>
                    <div className="grid grid-cols-4 gap-4">
                        <HomeCarRecomendationCardItemDynamic />
                    </div>
                    <div className="flex items-center justify-end">
                        <Button className="max-w-26 bg-primary-blue" size={"sm"}  asChild>
                            <Link href={"/car"} className="w-full flex items-center justify-end text-xs">Read More <LucideChevronsRight className="self-center" /></Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}