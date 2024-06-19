'use client'
import axios, {AxiosResponse} from 'axios'
import {Card} from '@/components/ui/card'
import useSWR from 'swr'
import {Skeleton} from '@/components/ui/skeleton'
import {useToast} from '@/components/ui/use-toast'
import {useEffect} from 'react'

export interface SummaryResponse {
    canceled: number,
    reserved: number,
    totalSeat: number
}

const fetcher = async (url: string) => {
        const response = await axios.get<AxiosResponse<SummaryResponse>>(url)
        return response.data
}

export default function AdminSummary() {
    const {data, error, isLoading} = useSWR('api/admin/summary', fetcher,{refreshInterval:2500})
    const {toast} = useToast()
    useEffect(() => {
        if(error){
            toast({
                title:error.error,
                description: error.message,
                variant: "destructive"
            })
        }
    }, [error])
    return (
        <section id="admin-summary" className="grid gap-4 justify-between items-center">
            {isLoading || error && <Loading/>}
            {data && <>
                <Card
                    className="bg-[#0070A4]  col-span-full text-white sm:row-span-full md:col-span-1 lg:col-span-1 xl:col-span-1 min-w-[300px] max-w-[400] md:max-w-[500px] h-[300px]  flex flex-col justify-center items-center">
                        <h3 className="text-4xl font-bold">{data.data.totalSeat ? data.data.totalSeat : 0}</h3>
                        <span>Total of seats</span>
                </Card>
                <Card
                    className="bg-[#00A58B] col-span-full text-white sm:row-span-full md:col-span-1 lg:col-span-1 xl:col-span-1 min-w-[300px]  max-w-[400] md:max-w-[500px] h-[300px] flex flex-col justify-center items-center">
                    <h3 className="text-4xl font-bold">{data.data.reserved}</h3>
                    <span>Reserve</span>
                </Card>
                <Card
                    className="bg-[#F96464]  col-span-full text-white sm:row-span-full md:col-span-1 lg:col-span-1 xl:col-span-1 min-w-[300px] max-w-[400] md:max-w-[500px] h-[300px]  flex flex-col justify-center items-center">
                        <h3 className="text-4xl font-bold">{data.data.canceled}</h3>
                        <span>Cancel</span>
                </Card>
            </>}
        </section>
    )
}

function Loading() {
    return (
        <>
            <div className="col-span-full sm:row-span-full md:col-span-1 lg:col-span-1 xl:col-span-1">
                <Skeleton className="h-32 bg-gray-200 w-[250px]"/>
            </div>
            <div className="col-span-full sm:row-span-full md:col-span-1 lg:col-span-1 xl:col-span-1">
                <Skeleton className="h-32 bg-gray-200 w-[250px]"/>
            </div>
            <div className="col-span-full sm:row-span-full md:col-span-1 lg:col-span-1 xl:col-span-1">
                <Skeleton className="h-32 bg-gray-200 w-[250px]"/>
            </div>
        </>
    )
}