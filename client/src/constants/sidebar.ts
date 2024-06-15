import {SidebarItems} from '@/types/sidebar-items.type'
import {Home, Inbox} from 'lucide-react'

export const sidebarItems: SidebarItems = {
    links: [
        {
            label: 'Home',
            href: '/',
            icon: Home,
            requireAuthenticate: false,
            adminOnly: false
        },
        {
            label: 'History',
            href: '/history',
            icon: Inbox,
            requireAuthenticate: true,
            adminOnly: true
        },
    ],
};