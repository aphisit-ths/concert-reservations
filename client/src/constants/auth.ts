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
        description: 'default user account 1',
        admin: false,
        request:
            {
                username: 'defult@user1',
                password: '123456789'
            }
    },    
    {
        title: 'User',
        description: 'default user account 2',
        admin: false,
        request:
            {
                username: 'defult@user2',
                password: '123456789'
            }
    },    {
        title: 'User',
        description: 'default user account 3',
        admin: false,
        request:
            {
                username: 'defult@user3',
                password: '123456789'
            }
    },    {
        title: 'User',
        description: 'default user account 4',
        admin: false,
        request:
            {
                username: 'defult@user4',
                password: '123456789'
            }
    },    {
        title: 'User',
        description: 'default user account 5',
        admin: false,
        request:
            {
                username: 'defult@user5',
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
