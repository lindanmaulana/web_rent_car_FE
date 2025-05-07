"use client"
import Image from "next/image"

interface ErrorNotfoundProps {
    error?: string
}
export const ErrorNotfound = ({error}: ErrorNotfoundProps) => {
    return (
        <div>
             <figure>
                <Image src="/404.png" alt="404" width={200} height={200} />
            </figure>
            <h4 className="text-2xl font-medium">{error ? error : "Something went wrong"}...</h4>
            <p className="max-w-78 text-sm text-center text-black/50">The page you are looking for does not exist or an unexpected error occurred</p>
        </div>
    )
}