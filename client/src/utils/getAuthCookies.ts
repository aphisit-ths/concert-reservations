import {cookies} from 'next/headers'
import {COOKIE_NAME} from '@/constants'

export function getAuthCookies(){
    const token = cookies().get(COOKIE_NAME)
    return `${COOKIE_NAME}=${token?.value}`
}
