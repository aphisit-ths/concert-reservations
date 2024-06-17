import {MeResponse} from '@/types/auth.type'
import {cookies} from 'next/headers'
import {API_URI, COOKIE_NAME} from '@/constants'


export const getMe = async (): Promise<MeResponse | null> => {
    const token = cookies().get(COOKIE_NAME)
    try {
        const res = await fetch(`${API_URI}/auth/me`, {
            headers: {
                Cookie :`${COOKIE_NAME}=${token?.value}`
            },
        })
        if (res.ok) {
            return await res.json()
        }else {
            console.warn("Get ME : CURRENT USER NOT FOUNDED !")
            return null
        }
    } catch (e) {
        console.error(e)
        return null
    }
}