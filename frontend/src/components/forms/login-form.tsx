import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../providers/auth/auth-provider"

const formSchema = z.object({
    email: z.email().min(2).max(50),
    password: z.string().max(50)
})

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const { signIn } = useAuthContext()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (isPending) return
        setIsPending(true)

        const res = await signIn(values)

        if (!res.ok) {
            setError(res.message!)
            return setIsPending(false)
        }

        setError(null)
        return setIsPending(false)
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Conecte-se em sua conta</CardTitle>
                <CardDescription>
                    Digite seu email e sua senha abaixo para logar em sua conta
                </CardDescription>
                <CardAction>
                    <Link to="/auth/register">
                        <Button variant='link'>Registrar</Button>
                    </Link>
                </CardAction>
            </CardHeader>

            <CardContent>
                {error && (
                    <div className="mb-2">
                        <span className="text-red-400">{error}</span>
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-3">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="email@exemplo.com" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="cursor-pointer mt-2">Login</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}