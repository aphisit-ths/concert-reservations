import {LoginRequest} from '@/types/auth.type'

export const defaultUsers: DefaultUserUtil[] = [
    {
        title: 'Admin',
        description: 'default admin account',
        admin: true,
        request:
            {
                username: 'defualt@admin',
                password: '123456789'
            }
    },
    {
        title: 'User',
        description: 'default user account',
        admin: false,
        request:
            {
                username: 'defualt@user',
                password: '123456789'
            }
    },
]

export interface DefaultUserUtil {
    title: string,
    admin: boolean,
    description: string,
    request: LoginRequest
}
