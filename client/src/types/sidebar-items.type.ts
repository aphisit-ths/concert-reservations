import {LucideIcon} from "lucide-react";

export interface SidebarItems {
    links: Array<{
        label: string;
        href: string;
        icon?: LucideIcon;
        requireAuthenticate:boolean,
        adminOnly: boolean
    }>;
}

export interface SidebarMenuProps {
    sidebarItems: SidebarItems;
}