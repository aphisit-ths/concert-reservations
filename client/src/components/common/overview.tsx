import {useToast} from '@/components/ui/use-toast'
import {useEffect} from 'react'
import axios, {AxiosResponse} from 'axios'
import useSWR from 'swr'
import Spinner from '@/components/loader/spinner'
import ConcertDetailCard from '@/components/common/concert-detail/card'
import {GetConcertResponse} from '@/types/concert.type'

const fetcher = async (url: string) => {
    const response = await axios.get<AxiosResponse<GetConcertResponse[]>>(url)
    return response.data
}
export default function Overview() {
    const {data, error, isLoading} = useSWR('api/common/overview', fetcher, {refreshInterval: 2500})
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
                ? <Spinner></Spinner>
                : <div className="flex w-full flex-col gap-4">
                    {data?.data.map(data => (
                        <ConcertDetailCard data={data} key={data.id} />
                    ))}
                </div>
            }
        </section>
    )
}