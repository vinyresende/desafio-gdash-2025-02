import { SidebarTrigger } from "../ui/sidebar"
import { usePageTitleContext } from "../providers/page-title/page-title"

export default function Header() {
    const { pageTitle } = usePageTitleContext()

    return (
        <header className='h-14 flex items-center border-b p-3'>
            <div className="w-1/2">
                <SidebarTrigger className="cursor-pointer" />
            </div>
            <div className="w-1/2 flex justify-end">{pageTitle}</div>
        </header>
    )
}