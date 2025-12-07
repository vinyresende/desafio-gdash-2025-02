import axios from "axios"

import { createContext, useContext, useEffect, useState } from "react"

import type { AuthContextType, UserInfo } from "./types"

const API_URL: string = import.meta.env.VITE_API_URL || ""
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Context hook
export function useAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuhContext() deve ser utilizado dentro de um AuthProvider!')
    }

    return context
}

// Context Provider

interface Props {
    children: React.ReactElement | React.ReactElement[]
}

export default function AuthProvider({ children }: Props) {
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
    const [status, setStatus] = useState<"Authenticated" | "Loading" | "Unauthenticated">("Loading")

    const signIn = async (
        { email, password }: { email: string, password: string }
    ): Promise<{ ok: boolean, message?: string }> => {
        try {
            const res: { data: { user: UserInfo } } = await axios.post(
                `${API_URL}/auth/signin`,
                { email, password }
            )

            localStorage.setItem('accessToken', res.data.user.accessToken)
            setUserInfo(res.data.user)
            setStatus("Authenticated")

            return { ok: true }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 401) {
                    return { ok: false, message: "Credenciais inválidas!" }
                }
            }

            return { ok: false, message: "Erro ao logar. Tente novamente mais tarde!" }
        }
    }

    const signUp = async (
        { username, email, password }: { username: string, email: string, password: string }
    ): Promise<{ ok: boolean, message?: string }> => {
        try {
            await axios.post(
                `${API_URL}/auth/signup`,
                { username, email, password }
            )

            signIn({ email, password })

            return { ok: true }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 409) {
                    return { ok: false, message: "Este endereço de email já está registrado!" }
                }
            }

            return { ok: false, message: "Erro ao criar conta. Tente novamente mais tarde!" }
        }
    }

    const signOut = async (): Promise<{ ok: boolean }> => {
        try {
            localStorage.removeItem("accessToken")

            setStatus("Unauthenticated")
            setUserInfo(undefined)
            return { ok: true }
        } catch (error) {
            return { ok: false }
        }
    }

    const fetchUserData = async () => {
        try {
            const token: string | null = localStorage.getItem("accessToken")

            const res: { data: { user: UserInfo } } = await axios.get(
                `${API_URL}/auth/user/profile`,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setUserInfo(res.data.user)
            setStatus("Authenticated")
        } catch (error) {
            setStatus("Unauthenticated")
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <AuthContext.Provider value={{ userInfo, status, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
