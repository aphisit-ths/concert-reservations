import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import {COOKIE_NAME} from '@/constants'
export async function GET() {
    const cookieStore = cookies()
    const cookie = cookieStore.get(COOKIE_NAME)
    if (cookie){
        cookieStore.delete(COOKIE_NAME)
    }
    return NextResponse.json({message: "removed "})
}