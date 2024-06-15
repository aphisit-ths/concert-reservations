'use client'

import {SidebarItems, SidebarMenuProps} from '@/types/sidebar-items.type'
import {usePathname} from 'next/navigation'
import {SidebarButton} from '@/components/sidebar/sidebar-button'
import {LogOut, Users} from 'lucide-react'
import AuthenticationButton from '@/components/authentication/authentication-button'
import {useAuthContext} from '@/context/auth-context'
import {Separator} from '@/components/ui/separator'
import Link from 'next/link'
import Spinner from '@/components/loader/spinner'
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
