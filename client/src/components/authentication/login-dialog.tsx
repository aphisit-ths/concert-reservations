'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LogIn } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import login from '@/hooks/login.service'
import { LoginRequest } from '@/types/auth.type'
import { useAuthContext } from '@/context/auth-context'
import { defaultUsers } from '@/constants/auth'
import { useToast } from '@/components/ui/use-toast'

const LoginDialog = () => {
  const { fetchMe } = useAuthContext()
  const { toast } = useToast()

  async function onLogin(request: LoginRequest) {
    try {
      await login(request.username, request.password)
      toast({
        variant: 'default',
        title: 'Login successfully',
        className: 'bg-green-100',
        description: `You just logged in  ${request.username} account`,
      })
      fetchMe()
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Login fail !',
        description: `You just logged fail ${e}`,
      })
      console.error('unexpected error', e)
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="flex flex-row gap-4">
        <LogIn></LogIn>
        <span className="text-xl font-bold">Login</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Which role your want to process ?</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-1">
          {defaultUsers.map((user) => (
            <Card
              key={user.title}
              className="w-full hover:bg-slate-200"
              onClick={() => onLogin(user.request)}
            >
              <CardHeader>
                <CardTitle>{user.title}</CardTitle>
                <CardDescription>{user.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default LoginDialog
