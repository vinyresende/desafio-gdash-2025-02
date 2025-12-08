import { SidebarTrigger } from "../ui/sidebar"

export default function Header() {
    return (
        <header className='h-14 flex items-center border-b p-3'>
            <div className="w-1/2">
                <SidebarTrigger className="cursor-pointer" />
            </div>
            <div className="w-1/2 flex justify-end">{document.title}</div>
        </header>
    )
}