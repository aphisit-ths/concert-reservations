'use client'

import {SidebarMenuProps} from '@/types/sidebar-items.type'
import {useAuthContext} from '@/context/auth-context'
import {SkeletonLoader} from '@/components/loader/skeleton'
import SidebarMenu from '@/components/sidebar/sidebar-menu'



export default function SidebarDesktop(props: SidebarMenuProps) {
    const {loading} = useAuthContext()
    return (
        <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
            {loading ?
                <SkeletonLoader/> :
                <SidebarMenu sidebarItems={props.sidebarItems}/>
            }
        </aside>
    )
}
