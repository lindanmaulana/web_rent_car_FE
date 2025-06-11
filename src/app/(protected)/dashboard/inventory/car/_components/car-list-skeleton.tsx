import { Skeleton } from "@/components/ui/skeleton"

export const CarListSkeleton = () => {
      const skeletonItems = Array.from({length: 6})
    return (
            <div  className="text-center w-full space-y-3">
                {skeletonItems.map((_, index) => (
                    <div key={index} className="flex items-center space-x-8">
                        <Skeleton className="w-40 h-16 rounded-md bg-primary/20" />
                        <div className="space-y-2 mr-22">
                            <Skeleton className="w-16 h-2 rounded bg-primary/20" />
                            <Skeleton className="w-10 h-3 rounded bg-primary/20" />
                            <Skeleton className="w-14 h-2 rounded bg-primary/20" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="w-26 h-6 rounded bg-primary/20" />
                            <Skeleton className="w-26 h-4 rounded bg-primary/20" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="w-12 h-6 rounded bg-primary/20" />
                            <Skeleton className="w-12 h-4 rounded bg-primary/20" />
                        </div>
                        <div className="space-y-2 mr-10">
                            <Skeleton className="w-12 h-6 rounded bg-primary/20" />
                            <Skeleton className="w-12 h-4 rounded bg-primary/20" />
                        </div>
                        <div className="flex items-center flex-col gap-2 mr-8">
                            <Skeleton className="w-10 h-6 rounded bg-primary/20" />
                            <Skeleton className="w-24 h-4 rounded bg-primary/20" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-14 h-6 rounded bg-primary/20" />
                            <Skeleton className="w-14 h-6 rounded bg-primary/20" />
                        </div>
                    </div>
                ))}
            </div>
    )
}