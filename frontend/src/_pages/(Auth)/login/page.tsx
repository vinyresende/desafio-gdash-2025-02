import LoginForm from "@/components/forms/login-form"

import { usePageTitleContext } from "@/components/providers/page-title/page-title"

export default function LoginPage() {
    const { setPageTitle } = usePageTitleContext()

    setPageTitle("Sign In")

    return (
        <main className="w-full h-full flex items-center justify-center p-10">
            <LoginForm />
        </main>
    )
}