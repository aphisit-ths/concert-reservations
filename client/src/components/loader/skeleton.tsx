import {Skeleton} from '@/components/ui/skeleton'

export function SkeletonLoader() {
    return (
        <div className="flex flex-col space-y-6 mt-4 w-full py-7">
            <Skeleton className="h-[125px] bg-gray-200 w-[100%]"/>
            <Skeleton className="h-[125px] bg-gray-200 w-[100%]"/>
            <Skeleton className="h-[125px] bg-gray-200 w-[100%]"/>
            <Skeleton className="h-[125px] bg-gray-200 w-[100%]"/>
        </div>
    )
}

export default SkeletonLoader
