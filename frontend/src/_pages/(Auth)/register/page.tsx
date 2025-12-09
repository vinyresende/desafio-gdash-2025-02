import RegisterForm from "@/components/forms/register-form"

import { usePageTitleContext } from "@/components/providers/page-title/page-title"

export default function RegisterPage() {
    const { setPageTitle } = usePageTitleContext()

    setPageTitle("Sign Up")

    return (
        <main className="w-full h-full flex items-center justify-center p-10">
            <RegisterForm />
        </main>
    )
}