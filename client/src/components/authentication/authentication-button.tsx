
import React from 'react';
import LoginDialog from "@/components/authentication/login-dialog";
import {SidebarButton} from "@/components/sidebar/sidebar-button";
import {LogOut} from "lucide-react";

const AuthenticationButton = () => {
    const user = false;
    if (!user) {
        return <LoginDialog/>
    }
    return <SidebarButton
        variant={'ghost'}
        icon={LogOut}
        className='w-full'
    >
        <h3 className='text-xl font-bold'> Logout</h3>
    </SidebarButton>
};

export default AuthenticationButton;