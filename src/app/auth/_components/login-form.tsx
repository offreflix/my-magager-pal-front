'use client'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'
import AuthService from '@/services/auth/auth-service'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { LoadingButton } from '@/components/loading-button'
import { AxiosError } from 'axios'

export function LoginForm() {
  const mutation = useMutation<any, AxiosError, z.infer<typeof schema>>({
    mutationFn: AuthService.signIn,
    onSuccess: (response) => {
      console.log(response.data.access_token)

      toast.success('Login successful')
    },
    onError: (e) => {
      const error = e as AxiosError<{ message: string }>
      console.error(error?.response?.data?.message)
      toast.error(error.message)
    },
  })

  const schema = z
    .object({
      username: z.string(),
      password: z.string(),
    })
    .required()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutation.mutate(data)
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                href="/auth/forgot-password"
                className="inline-block text-sm underline w-full text-right"
              >
                Forgot your password?
              </Link>
            </div>
            {mutation.isPending ? (
              <LoadingButton text="Login" />
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}

            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
