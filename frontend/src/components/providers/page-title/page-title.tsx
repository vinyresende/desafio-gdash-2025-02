import { createContext, useContext, useEffect, useState } from "react"
import type { PageTitleContextType } from "./type"

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined)

export function usePageTitleContext() {
    const context = useContext(PageTitleContext)

    if (!context) {
        throw new Error('usePageTitleContext() deve ser utilizado dentro de um PageTitleProvider!')
    }

    return context
}

interface Props {
    children: React.ReactElement | React.ReactElement[]
}

export default function PageTitleProvider({ children }: Props) {
    const [pageTitle, setPageTitle] = useState<string>(document.title)

    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])

    return (
        <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
            {children}
        </PageTitleContext.Provider>
    )
}
