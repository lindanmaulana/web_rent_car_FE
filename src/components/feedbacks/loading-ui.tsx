"use client"

import Image from "next/image"

export const LoadingUi = () => {
    return (
        <div className="w-full h-full min-h-[446px] flex items-center justify-center">
            <Image src="/car-loading.png" alt="loading car" width="300" height="200" className="animate-bounce delay-100 motion-safe:animate-bounce" />
            <p className="text-2xl text-black/80 italic">Loading please waitt...</p> 
        </div>
    )
}