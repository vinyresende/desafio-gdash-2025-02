import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'

import Header from '../header/header'
import AppSidebar from '../app-sidebar/app-sidebar'

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <div className='w-full h-screen flex flex-col'>
                <Header />

                <div className='p-5 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    )
}