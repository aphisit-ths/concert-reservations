import {getMe} from '@/hooks/get-me.service'
import {NextResponse} from 'next/server'
export async function GET() {
    const res =  await getMe()
    return NextResponse.json(res)
}