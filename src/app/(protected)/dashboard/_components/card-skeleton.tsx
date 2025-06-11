import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const CardSkeleton = () => {
    return (
    <Card className="relative rounded-md min-h-26 cursor-pointer border-none">
      <CardContent className="space-y-3">
        <Skeleton className="absolute inset-0 flex items-center justify-center bg-gray-200" />
      </CardContent>
    </Card>
    )
}