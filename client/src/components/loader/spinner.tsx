import React from 'react'
import {LoaderCircle} from 'lucide-react'

export default function Spinner ({size = 18} : {size?:number}) {
    return (
        <div className="w-full flex justify-center items-center">
            <LoaderCircle size={size} className="animate-spin text-slate-300" />
        </div>
    )
}