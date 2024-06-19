'use client'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'

import axios, {AxiosResponse} from 'axios'
import {ConcertEvent} from '@/types/concert.type'
import useSWR from 'swr'
import Spinner from '@/components/loader/spinner'
import moment from 'moment'
import {useToast} from '@/components/ui/use-toast'
import {useEffect} from 'react'

export const fetcher = async (url: string) => {
    const response = await axios.get<AxiosResponse<ConcertEvent[]>>(url)
    return response.data
}

export function HistoryTable(){
    const {data, error, isLoading} = useSWR('api/common/logs', fetcher, {refreshInterval: 1500})

    const {toast} = useToast()

    useEffect(() => {
        if (error) {
            toast({
                title: error.error,
                description: error.response.statusText,
                variant: 'destructive'
            })
        }
    }, [error])

    if(isLoading){
        return <Spinner size={15}/>
    }
    return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date time</TableHead>
                        <TableHead>Username </TableHead>
                        <TableHead>Concert name</TableHead>
                        <TableHead >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.data.map(res => (
                        <TableRow key={res.id}>
                            <TableCell>{moment(res.datetime).format('D/MM/YYYY HH:mm:ss')}</TableCell>
                            <TableCell>{res.username}</TableCell>
                            <TableCell>{res.concertName}</TableCell>
                            <TableCell className={'font-medium'}>{res.action.toUpperCase()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    )
}