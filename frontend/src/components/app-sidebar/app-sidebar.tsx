import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenu,
    SidebarFooter
} from '@/components/ui/sidebar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'

import { CloudSun, BookText, type LucideProps, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

interface MenuItem {
    title: string
    href: string
    icon: React.FC<LucideProps>
}

const menuItems: MenuItem[] = [
    { title: "Clima", href: "/", icon: CloudSun },
    { title: "Pokedex", href: "/pokedex", icon: BookText },

]

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className='flex items-center justify-center p-5'>
                <h1 className='text-xl font-semibold'>GDASH</h1>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Páginas</SidebarGroupLabel>

                    <SidebarMenu>
                        {menuItems.map((i, index) => (
                            <SidebarMenuButton asChild key={index}>
                                <Link to={i.href}>
                                    <i.icon /> {i.title}
                                </Link>
                            </SidebarMenuButton>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className='border-t'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage
                            className='w-10 min-w-10'
                            src='https://avatar.iran.liara.run/public'
                            alt='user-avatar'
                        />
                    </Avatar>
                    <div className='flex flex-col truncate'>
                        <span className='truncate'>Username Example</span>
                        <span className='text-muted-foreground text-sm truncate'>email@example.com</span>
                    </div>
                </div>
                <SidebarMenuButton
                    className='cursor-pointer flex justify-center gap-2'
                    variant={'outline'}
                >
                    <LogOut /> Logout
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    )
}