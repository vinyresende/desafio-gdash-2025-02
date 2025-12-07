import { Outlet } from 'react-router-dom'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarProvider
} from '@/components/ui/sidebar'

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader className='flex items-center justify-center p-5'>
                    <h1 className='text-xl font-semibold'>GDASH</h1>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup />
                </SidebarContent>
            </Sidebar>

            <div className='w-full flex flex-col p-8'>
                <Outlet />
            </div>
        </SidebarProvider>
    )
}