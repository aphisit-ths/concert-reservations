export interface MeResponse {
    username: string
    isAdmin:boolean
}

export interface LoginRequest {
    username: string
    password: string
}