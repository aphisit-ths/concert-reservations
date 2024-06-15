import Link from 'next/link'
import {SidebarButton} from '@/components/sidebar/sidebar-button'
import {Separator} from '@/components/ui/separator'
import {LogOut} from 'lucide-react'
import AuthenticationButton from '@/components/authentication/authentication-button'
import {usePathname} from 'next/navigation'
import {useAuthContext} from '@/context/auth-context'
import {SidebarItems, SidebarMenuProps} from '@/types/sidebar-items.type'
import {MeResponse} from '@/types/auth.type'
import ToggleUserSwitch from '@/components/authentication/toggle-user-switch'


export default function SidebarMenu(props: SidebarMenuProps) {
    const pathname = usePathname()
    const {isAuthenticated, me, onLogout} = useAuthContext()
    return (
        <div className="h-full px-3 py-4">
            <SideBarHeader me={me}/>
            <div className="mt-5">
                <div className="flex flex-col gap-4 w-full">
                    <SubMenus
                        items={props.sidebarItems}
                        pathname={pathname}
                        isAuthenticated={isAuthenticated}
                        adminOnly={!!me?.isAdmin}/>
                    <Separator/>
                    <ToggleUserSwitch />
                </div>
            </div>
            <div className="absolute left-0 bottom-20 w-full px-3">
                <AuthActionButton isAuthenticated={isAuthenticated} onLogout={onLogout}/>
            </div>
        </div>
    )
}

function SideBarHeader({me}: { me: MeResponse | null }) {
    return (
        me ? <h3 className="mx-3 ">
                Logged as
                <span className="text-lg font-semibold text-foreground">
                        {me.isAdmin ? ' Admin' : ' User'}
                </span>
            </h3> :
            <h3 className="mx-3 ">
                <span className="text-lg font-semibold text-foreground">
                    Welcome
                </span>
            </h3>
    )
}

function SubMenus({items, pathname, isAuthenticated, adminOnly}: {
    items: SidebarItems,
    isAuthenticated: boolean,
    pathname: string,
    adminOnly :boolean
}) {

    const getFilteredLinks = () => {
        return items.links.filter(link => {
            if (link.adminOnly) {
                return adminOnly;
            }
            if (link.requireAuthenticate) {
                return isAuthenticated;
            }
            return true;
        });
    };

    const filteredLinks = getFilteredLinks();
    return (filteredLinks.map((link) => (
        <div key={link.label}>
            {isAuthenticated || !link.requireAuthenticate ? (
                <Link href={link.href} key={link.label}>
                    <SidebarButton
                        variant={pathname === link.href ? 'secondary' : 'ghost'}
                        icon={link.icon}
                        className="w-full text-md"
                    >
                        {link.label}
                    </SidebarButton>
                </Link>
            ) : null}
        </div>
    )))
}


function AuthActionButton({isAuthenticated, onLogout}: { isAuthenticated: boolean, onLogout: () => void }) {
    return (isAuthenticated ?
            <SidebarButton
                onClick={() => onLogout()}
                variant={'ghost'}
                icon={LogOut}
                className="w-full text-md hover:bg-blue-300"
            >
                <h3 className="mx-1 text-md font-semibold text-foreground">Logout </h3>
            </SidebarButton>
            :
            <AuthenticationButton/>
    )
}

