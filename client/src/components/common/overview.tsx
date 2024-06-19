import {useToast} from '@/components/ui/use-toast'
import {useEffect} from 'react'
import axios, {AxiosResponse} from 'axios'
import useSWR from 'swr'
import ConcertDetailCard from '@/components/common/concert-detail/card'
import {GetConcertResponse} from '@/types/concert.type'
import SkeletonLoader from '@/components/loader/skeleton'

export const fetcher = async (url: string) => {
    const response = await axios.get<AxiosResponse<GetConcertResponse[]>>(url)
    return response.data
}
export default function Overview() {
    const {data, error, isLoading} = useSWR('api/common/overview', fetcher, {refreshInterval: 1500})
    const {toast} = useToast()
    useEffect(() => {
        if (error) {
            toast({
                title: error.error,
                description: error.message,
                variant: 'destructive'
            })
        }
    }, [error])

    return (
        <section>
            {isLoading
                ? <SkeletonLoader></SkeletonLoader>
                : <div className="flex w-full flex-col gap-4">
                    {data?.data.map(data => (
                        <ConcertDetailCard data={data} key={data.id}/>
                    ))}
                </div>
            }
        </section>
    )
}