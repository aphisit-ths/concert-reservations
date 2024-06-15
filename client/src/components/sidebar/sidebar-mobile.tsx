import React from 'react'
import {
    Sheet, SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger
} from '@/components/ui/sheet'
import {Button} from '@/components/ui/button'
import {Menu, X} from 'lucide-react'
import {SidebarItems} from '@/types/sidebar-items.type'
import SidebarMenu from '@/components/sidebar/sidebar-menu'

interface SidebarMobileProps {
    sidebarItems: SidebarItems;
}

export default function SidebarMobile(props: SidebarMobileProps) {
    return (
        <Sheet  >
            <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="fixed top-3 left-3">
                    <Menu size={20}/>
                </Button>
            </SheetTrigger>
            <SheetContent hideClose={true} side="left" className="px-3 py-4">
                <SheetHeader className="flex flex-row justify-between items-center space-y-0">
                    <SheetClose className="w-full flex" asChild>
                        <Button className="h-7 w-7 p-0  ml-auto" variant="ghost">
                            <X size={15}/>
                        </Button>
                    </SheetClose>
                </SheetHeader>
                <div className="h-full">
                    <SidebarMenu sidebarItems={props.sidebarItems} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
