import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    username: z.string().min(2).max(40),
    email: z.email().min(2).max(50),
    password: z.string().max(50)
})

export default function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Crie sua conta</CardTitle>
                <CardDescription>
                    Digite suas informações abaixo para criar sua nova conta
                </CardDescription>
                <CardAction>
                    <Link to="/auth/login">
                        <Button variant="link">Login</Button>
                    </Link>
                </CardAction>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome de usuário</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

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