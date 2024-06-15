'use client'

import React from 'react';
import Link from "next/link";
import {SidebarItems} from "@/types/sidebar-items.type";
import {usePathname} from "next/navigation";
import {SidebarButton} from "@/components/sidebar/sidebar-button";
import {Users} from "lucide-react";
import AuthenticationButton from "@/components/authentication/authentication-button";

interface SidebarDesktopProps {
    sidebarItems: SidebarItems;
}

export default function SidebarDesktop(props: SidebarDesktopProps) {
    const pathname = usePathname();
    const admin = false
    return (
        <aside className='w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r'>
        <div className='h-full px-3 py-4'>
            <h3 className='mx-3 '>Logged as <span className='text-lg font-semibold text-foreground'>{admin ? "User" : "Admin"}</span></h3>
            <div className='mt-5'>
                <div className='flex flex-col gap-4 w-full'>
                    {props.sidebarItems.links.map((link, index) => (
                        <Link key={index} href={link.href}>
                            <SidebarButton
                                variant={pathname === link.href ? 'secondary' : 'ghost'}
                                icon={link.icon}
                                className='w-full text-md'
                            >
                                {link.label}
                            </SidebarButton>
                        </Link>

                    ))}
                    <SidebarButton
                        variant={'ghost'}
                        icon={Users}
                        className='w-full text-md hover:bg-blue-300'
                    >
                        <h3 className='mx-1 text-md font-semibold text-foreground'> Switch to {admin ? "User" : "Admin"}</h3>
                    </SidebarButton>
                </div>
            </div>
            <div className='absolute left-0 bottom-20 w-full px-3'>
                <AuthenticationButton/>
            </div>
        </div>
    </aside>
    )
}
