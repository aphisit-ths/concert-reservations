'use client'

import {AuthContextProvider} from '@/context/auth-context'
import React from 'react'

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <AuthContextProvider>{children}</AuthContextProvider>
    )
}