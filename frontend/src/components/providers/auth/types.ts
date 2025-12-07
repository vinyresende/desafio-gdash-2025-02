export interface AuthContextType {
    userInfo?: UserInfo
    status: "Authenticated" | "Loading" | "Unauthenticated"
    signIn: ({ email, password }: { email: string, password: string }) => Promise<{ ok: boolean, message?: string }>
    signUp: ({username, email, password}: { username: string, email: string, password: string }) => Promise<{ ok: boolean, message?: string }>
    signOut: () => Promise<{ ok: boolean }>
}

export interface UserInfo {
    _id: string
    username: string
    email: string
    accessToken: string
    __v: number
}