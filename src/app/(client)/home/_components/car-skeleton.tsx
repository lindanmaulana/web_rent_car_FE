import { Skeleton } from "@/components/ui/skeleton"

export const CarSkeleton = () => {
    return (
            <div className="h-86 bg-white-blue rounded-lg p-6 space-y-2">
                <div className="w-full flex justify-between">
                    <div className="space-y-1">
                        <Skeleton className="w-16 h-6 bg-gray-300 rounded-sm" />
                        <Skeleton className="w-10 h-5 bg-gray-300 rounded-sm" />
                    </div>
                    <Skeleton className="size-6 bg-gray-300 rounded-sm" />
                </div>
                <div className="w-full h-[60%]">
                    <Skeleton className="w-full h-full bg-gray-300" />
                </div>
                <div className="h-[20%] space-y-2">
                    <div className="w-full flex items-center justify-between">
                        <Skeleton className="w-18 h-5 bg-gray-300 rounded-sm" />
                        <Skeleton className="w-12 h-5 bg-gray-300 rounded-sm" />
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <Skeleton className="w-28 h-6 bg-gray-300 rounded-sm" />
                        <Skeleton className="w-18 h-7 bg-gray-300 rounded-sm" />
                    </div>
                </div>
            </div>
    )
}