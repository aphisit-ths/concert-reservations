import {LoginRequest} from '@/types/auth.type'

export const defaultUsers: DefaultUserUtil[] = [
    {
        title: 'Admin',
        description: 'default admin account',
        admin: true,
        request:
            {
                username: 'default@admin',
                password: '123456789'
            }
    },
    {
        title: 'User 1',
        description: 'default user account',
        admin: false,
        request:
            {
                username: 'default@user1',
                password: '123456789'
            }
    },    
    {
        title: 'User 2',
        description: 'default user account',
        admin: false,
        request:
            {
                username: 'default@user2',
                password: '123456789'
            }
    },  
    {
        title: 'User 3',
        description: 'default user account',
        admin: false,
        request:
            {
                username: 'default@user3',
                password: '123456789'
            }
    },    
    {
        title: 'User 4',
        description: 'default user account',
        admin: false,
        request:
            {
                username: 'default@user4',
                password: '123456789'
            }
    },   
    {
        title: 'User 5',
        description: 'default user account',
        admin: false,
        request:
            {
                username: 'default@user5',
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
