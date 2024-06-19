import React, {createContext, useState, useContext, useEffect} from 'react'
import {User} from '@/types/auth.type'
import axios from 'axios'
import {useToast} from '@/components/ui/use-toast'

interface AuthContextProps {
    me: User | null;
    isAuthenticated: boolean;
    onSetMe: (me: User) => void;
    onLogout: () => void;
    fetchMe: () => void;
    loading: boolean
}

const AuthContext = createContext<AuthContextProps>({
    me: null,
    isAuthenticated: false,
    onSetMe: () => {
    },
    onLogout: () => {
    },
    fetchMe: () => {
    },
    loading: false
})

export function AuthContextProvider({children}: { children: React.ReactNode }) {
    const [me, setMe] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()

    const isAuthenticated = !!me

    function onSetMe(newMe: User) {
        setMe(newMe)
    }

    async function onLogout() {
        await LogOutClient()
        setMe(null)
        toast({
            title:"See yaa",
            description:"Your just logged out"
        })
    }
    const fetchMe = async () => {
        setLoading(true)
        try {
            const {data} = await getMeClient();
            setMe(data?.data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setMe(null)
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchMe();
        return () => {
        };
    }, []);
    return (
        <AuthContext.Provider value={{me, isAuthenticated, onSetMe, onLogout ,fetchMe, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider')
    }
    return context
}

async function getMeClient() {
    try {
        const res = await axios.get('api/auth/me')
        return {data: res, error: null}
    } catch (e) {
        console.log('unexpected error', e)
        return {data: null, error: true}
    }
}
async function LogOutClient() {
    try {
        const res = await axios.get('api/auth/logout')
        return {data: res, error: null}
    } catch (e) {
        console.log('unexpected error', e)
        return {data: null, error: true}
    }
}