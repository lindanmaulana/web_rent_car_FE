import Image from "next/image"

export const AuthImage = () => {
    return (
        <div className="bg-blue-500 h-full">
            <Image src="/images/auth-bg.svg" alt="car rental" className="w-full h-full" width={200} height={100} priority />
        </div>
    )
}