import React from 'react'
import {HistoryTable} from '@/components/admin/history-table'
import {getMe} from '@/hooks/auth/get-me.service'
import {redirect} from 'next/navigation'

async function checkAuth() {
    const res = await getMe()

    if (!res) {
        redirect("/")
    }
    if(!res?.isAdmin){
        redirect("/")
    }
}


export default async function Page (){
    await checkAuth()
    return (
        <div id={"table"} className="rounded-md border">
            <HistoryTable></HistoryTable>
        </div>
)}

