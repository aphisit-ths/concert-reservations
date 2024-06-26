"use client"

import {useMediaQuery} from 'usehooks-ts'
import SidebarDesktop from "@/components/sidebar/sidebar-desktop";
import SidebarMobile from "@/components/sidebar/sidebar-mobile";
import {sidebarItems} from '@/constants/sidebar'

export function  Sidebar() {
    const isDesktop = useMediaQuery('(min-width: 800px)', {
        initializeWithValue:false
    })
    if (isDesktop) {
        return <SidebarDesktop
            sidebarItems={sidebarItems}/>
    }

    return <SidebarMobile
        sidebarItems={sidebarItems} />
}