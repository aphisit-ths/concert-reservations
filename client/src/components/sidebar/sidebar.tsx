"use client"

import {useMediaQuery} from 'usehooks-ts'
import SidebarDesktop from "@/components/sidebar/sidebar-desktop";
import SidebarMobile from "@/components/sidebar/sidebar-mobile";
import { Home, Inbox} from "lucide-react";
import {SidebarItems} from "@/types/sidebar-items.type";

const sidebarItems: SidebarItems = {
    links: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'History', href: '/', icon: Inbox },
    ],
};
export function Sidebar() {
    const isDesktop = useMediaQuery('(min-width: 640px)', {
        initializeWithValue:false
    })
    if (isDesktop) {
        return <SidebarDesktop sidebarItems={sidebarItems}/>
    }

    return <SidebarMobile sidebarItems={sidebarItems} />
}