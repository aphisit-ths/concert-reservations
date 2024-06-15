import {get} from "@/utils/fetch";
import {MeResponse} from "@/types/auth.type";

export function getMe() : Promise<MeResponse> {
    return get('auth/me')
}