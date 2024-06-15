import {SidebarButton} from '@/components/sidebar/sidebar-button'
import {Users} from 'lucide-react'
import {LoginRequest, MeResponse} from '@/types/auth.type'
import login from '@/hooks/login.service'
import {useAuthContext} from '@/context/auth-context'
import {defaultUsers} from '@/constants/auth'
import Spinner from '@/components/loader/spinner'
import {useToast} from '@/components/ui/use-toast'

export default function ToggleUserSwitch() {
    const {me, fetchMe ,loading, } = useAuthContext()
    const { toast } = useToast()
    async function onLogin() {
        if(me){
            try {
                let request : LoginRequest
                if(me.isAdmin){
                    request = defaultUsers.findLast(user => !user.admin)!.request
                } else {
                    request = defaultUsers.findLast(user => user.admin)!.request
                }
                await login(request.username, request.password)
                toast({
                    variant: "default",
                    title: "Login successfully",
                    className:"bg-green-100",
                    description: `You just logged in  ${request.username} account`,
                })
                fetchMe()
            } catch (e) {
                toast({
                    variant: "destructive",
                    title: "Login fail !",
                    description: `You just logged fail ${e}`,
                })
            }
        }
    }
    return (me &&
        <>
            {loading
                ? <Spinner/>
                : <SidebarButton
                    onClick={()=> onLogin()}
                    variant={'ghost'}
                    icon={Users}
                    className="w-full text-md hover:bg-blue-300"
                >
                    <h3 className="mx-1 text-md font-semibold text-foreground"> Switch to {me.isAdmin ? 'User' : 'Admin'}</h3>
                </SidebarButton>
            }
        </>
    )
}