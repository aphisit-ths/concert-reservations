import {NextResponse} from 'next/server'
import {API_URI} from '@/constants'
import {SummaryResponse} from '@/components/admin/summary'
import {ServerException} from '@/utils/errors'
import {getAuthCookies} from '@/utils/getAuthCookies'

export async function GET() {
    const response = await fetch(`${API_URI}/concert/summary`, {
        headers: {
            Cookie: getAuthCookies()
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
