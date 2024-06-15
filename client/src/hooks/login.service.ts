'use server'

import {API_URI} from "@/constants";
import {LoginRequest} from "@/types/auth.type";
import { ServerException} from "@/utils/errors";
import {cookies} from "next/headers";
import {redirect} from 'next/navigation'

interface LoginResponse {
    message: string
}

export type LoginHandlerType = LoginResponse | ServerException
export default async function login(username: string, password: string): Promise<LoginHandlerType> {
    const loginRequest: LoginRequest = {
        username: username, password: password
    }
    const res = await fetch(`${API_URI}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(loginRequest)
    });
    const parsedResponse: LoginHandlerType = await res.json();


    if (!res.ok) {
        return parsedResponse as ServerException
    }
    setAuthCookie(res)
    return parsedResponse as LoginResponse
}
const setAuthCookie = (response: Response) => {
    const setCookieHeader = response.headers.get("Set-Cookie");
    if (setCookieHeader) {
        const token = setCookieHeader.split(";")[0].split("=")[1];
        cookies().set({
            name: "access_token",
            value: token,
            secure: true,
            httpOnly: true,
        });
    }
};
