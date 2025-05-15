import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCarHeader = () => {
    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Skeleton className="w-32 h-8 rounded bg-primary/20" />
                <Skeleton className="w-21 h-8 rounded bg-primary/20" />
                <Skeleton className="w-19 h-8 rounded bg-primary/20" />
                <Skeleton className="w-22 h-8 rounded bg-primary/20" />
                <Skeleton className="w-14 h-8 rounded bg-primary/20" />
            </div>
            <Skeleton className="w-18 h-8 rounded bg-primary/20" />
        </div>
    )
}