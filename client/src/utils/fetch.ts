import { cookies } from "next/headers";
import {API_URI} from "@/constants";

const getHeaders = () => ({
    Cookie: cookies().toString(),
});

export const get = async (path: string) => {
    console.log(getHeaders())
    const res = await fetch(`${API_URI}/${path}`, {
        headers: { ...getHeaders() },
    });
    return res.json();
};