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
import { parseActionError } from "@/lib/data/safe"
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
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => execute(values))}
            className="space-y-8"
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
            <Button type="submit" disabled={isExecuting}>
              Sign in
            </Button>
          </form>
        </Form>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
