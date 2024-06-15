import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Sidebar} from "@/components/sidebar/sidebar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children}:
    Readonly<{
        children: React.ReactNode;
}>) {
    return (
        <html lang="en">

        <body className={inter.className}>
            <Sidebar/>
            <main className='mx-5 mt-16 sm:ml-[300px] sm:mt-3'>
                {children}
            </main>
        </body>
        </html>
    );
}
