import {NextRequest, NextResponse} from 'next/server'
import {API_CANCEL_SERVER_RESERVATION_URL, API_URI} from '@/constants'
import {getAuthCookies} from '@/utils/getAuthCookies'
import {ServerException} from '@/utils/errors'

export async function POST(request: NextRequest, response: NextResponse) {
    const payload = await request.json()
    const res = await fetch(API_CANCEL_SERVER_RESERVATION_URL, {
        method: 'POST',
        headers: {
            Cookie: getAuthCookies(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    if (!res.ok) {
        const err: ServerException = await res.json()
        return NextResponse.json(null, {status: res.status,statusText:err.message})
    }

    return NextResponse.json(res, {status: 201})
}