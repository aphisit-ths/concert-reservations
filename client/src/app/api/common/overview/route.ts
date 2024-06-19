import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import {API_URI, COOKIE_NAME} from '@/constants'
import {SummaryResponse} from '@/components/admin/summary'
import {ServerException} from '@/utils/errors'

export async function GET() {
    const token = cookies().get(COOKIE_NAME)
    const response = await fetch(`${API_URI}/concert`, {
        headers: {
            Cookie: `${COOKIE_NAME}=${token?.value}`
        },
    })
    if (response.ok) {
        const data : SummaryResponse  = await response.json()
        return NextResponse.json({data})
    } else {
        const error : ServerException   = await response.json()
        return NextResponse.json(null,{
            status: error.statusCode,
            statusText : error.message
        })
    }
}

