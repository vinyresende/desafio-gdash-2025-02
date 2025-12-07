import { SidebarTrigger } from "../ui/sidebar"

export default function Header() {
    return (
        <header className='h-14 flex items-center border-b p-3'>
            <div>
                <SidebarTrigger className="cursor-pointer" />
            </div>
            <div></div>
        </header>
    )
}