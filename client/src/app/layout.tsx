import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {Sidebar} from '@/components/sidebar/sidebar'
import {Providers} from '@/context/provider'
import {Toaster} from '@/components/ui/toaster'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

interface RootLayoutProps {
    children: React.ReactNode;
}

type RootLayoutType = Readonly<RootLayoutProps>

export default function RootLayout({children}: RootLayoutType) {
    return (
        <html lang="en">
            <body className={inter.className+ "bg-gray-100"}>
                <Providers>
                    <Sidebar/>
                    <main className="mx-5 mt-16 lg:ml-[300px] sm:mt-3 ">
                        {children}
                    </main>
                </Providers>
                <Toaster/>
            </body>
        </html>
    )
}
