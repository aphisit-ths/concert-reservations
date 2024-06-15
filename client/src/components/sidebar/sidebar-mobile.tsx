
import React from "react";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {SidebarButton} from "@/components/sidebar/sidebar-button";
import {Menu, X} from "lucide-react";
import {SidebarItems} from "@/types/sidebar-items.type";
import Link from "next/link";
import {usePathname} from "next/navigation";
interface SidebarMobileProps {
    sidebarItems: SidebarItems;
}
export default function SidebarMobile(props : SidebarMobileProps) {
    const pathname = usePathname()
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' variant='ghost' className='fixed top-3 left-3'>
                    <Menu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='px-3 py-4'>
                <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
          <span className='text-lg font-semibold text-foreground mx-3'>
            Twitter
          </span>
                    <SheetClose asChild>
                        <Button className='h-7 w-7 p-0' variant='ghost'>
                            <X size={15} />
                        </Button>
                    </SheetClose>
                </SheetHeader>
                <div className='h-full'>
                    <div className='mt-5 flex flex-col w-full gap-1'>
                        {props.sidebarItems.links.map((link, idx) => (
                            <Link key={idx} href={link.href}>
                                <SidebarButton
                                    variant={pathname === link.href ? 'secondary' : 'ghost'}
                                    icon={link.icon}
                                    className='w-full'
                                >
                                    {link.label}
                                </SidebarButton>
                            </Link>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
