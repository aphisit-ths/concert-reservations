'use client'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {LogIn} from "lucide-react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import login from "@/hooks/login.service";
import {LoginRequest} from "@/types/auth.type";

interface CardElement {
    title: string,
    description : string,
    request : LoginRequest
}

const cardElements: CardElement[] = [
    {title: "Admin", description: "default admin account",request:{username: "defualt@admin" , password: "123456789"}},
    {title: "User", description: "default user account",request:{username: "defualt@user" , password: "123456789"}},
]
const LoginDialog = () => {
    async function onLogin(request : LoginRequest) {
        const res = await login(request.username, request.password)
    }
    return (<Dialog>
        <DialogTrigger className="flex flex-row gap-4">
            <LogIn></LogIn>
            <span className="text-xl font-bold">Login</span>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Which role your want to process ?</DialogTitle>
            </DialogHeader>
            <div className="flex flex-row w-full items-center justify-center gap-4">
                {cardElements.map((card) => (
                    <Card onClick={() => onLogin(card.request)} key={card.title} className="w-1/2 cursor-pointer hover:bg-slate-200">
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </DialogContent>
    </Dialog>)
};
export default LoginDialog;