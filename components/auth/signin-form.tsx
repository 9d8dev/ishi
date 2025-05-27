"use client"

import * as React from "react"

// type imports
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { signInSchema as formSchema } from "@/lib/data/validation"

// UI Imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { useAction } from "next-safe-action/hooks"
import { parseActionError } from "@/lib/data/utils"
import { signIn } from "@/lib/auth/actions"
import Link from "next/link"

type values = z.infer<typeof formSchema>

const defaultValues: Partial<values> = {
  email: "",
  password: "",
}

export function SignInForm() {
  const { execute, isExecuting } = useAction(signIn, {
    onSuccess() {
      toast.success("You have been successfully logged in")
    },
    onError({ error }) {
      toast.error(parseActionError(error))
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit((values) => execute(values))}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jonny@apple.com" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter your email address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-1"
              type="submit"
              disabled={isExecuting}
            >
              Sign in
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
