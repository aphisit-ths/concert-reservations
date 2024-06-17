import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLoader() {
    return (
        <div className="flex flex-col space-y-6 mt-4">
            <Skeleton className="h-[125px] w-[250px] rounded-xl mt-15 " />
            <div className="space-y-2">
                <Skeleton className="h-8 bg-gray-200 w-[250px]" />
                <Skeleton className="h-8 bg-gray-200 w-[150px]" />
                <Skeleton className="h-8 bg-gray-200 w-[220px]" />
                <Skeleton className="h-8 bg-gray-200 w-[200px]" />
                <Skeleton className="h-8 bg-gray-200 w-[220px]" />
            </div>
        </div>
    )
}
