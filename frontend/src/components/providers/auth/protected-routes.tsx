import { Navigate } from "react-router-dom"
import { useAuthContext } from "./auth-provider"

interface Props {
    children: React.ReactElement | React.ReactElement[]
    allowAuthenticated?: boolean
}

export default function ProtectedRoutes({ children, allowAuthenticated = true }: Props) {
    const { status } = useAuthContext()
    console.log(status)

    if (status === "Loading") {
        return <></>
    }

    if (
        (status === "Authenticated" && allowAuthenticated) ||
        (status === "Unauthenticated" && !allowAuthenticated)
    ) {
        return (children)
    } else {
        return allowAuthenticated ? <Navigate to="/auth/login" /> : <Navigate to="/" />
    }
}