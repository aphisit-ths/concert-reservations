'use client'

import React, {useEffect} from 'react'
import {HistoryTable} from '@/components/admin/history-table'
import {useAuthContext} from '@/context/auth-context'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'


export default function Page (){
    const {me,loading} = useAuthContext()
    const router = useRouter()
    useEffect(() => {
        if(!me?.isAdmin){
            router.push('/')
        }
    }, [])
    return (
        <div id={"table"} className="rounded-md border">
            <HistoryTable></HistoryTable>
        </div>
)}

