import Image from "next/image"

export const ComingsoonUi = () => {
    return (
        <div className="w-full h-full min-h-[446px] flex items-center justify-center">
            <Image src="/car-comingsoon.png" alt="loading car" width="300" height="200" loading="lazy" className="" />
            <p className="text-2xl text-black/80 italic">Coming soon...</p> 
        </div>
    )
}