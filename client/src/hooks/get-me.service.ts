import {MeResponse} from '@/types/auth.type'
import {cookies} from 'next/headers'
import {API_URI} from '@/constants'

const getHeaders = (): HeadersInit => ({
    Cookie: cookies().toString(),
})

export const getMe = async (): Promise<MeResponse | null> => {
    try {
        const res = await fetch(`${API_URI}/auth/me`, {
            headers: {...getHeaders()},
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