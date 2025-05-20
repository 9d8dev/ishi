"use client"

import * as React from "react"

// type imports
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { inviteUserSchema as formSchema } from "@/lib/data/validation"

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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useAction } from "next-safe-action/hooks"
import { parseActionError } from "@/lib/data/safe"
import { inviteUser } from "@/lib/data/organization"

type values = z.infer<typeof formSchema>

const defaultValues: Partial<values> = {
  email: "",
  role: "member",
  organizationId: "",
}

export function InviteUserForm({ organizationId }: { organizationId: string }) {
  const { execute, isExecuting } = useAction(inviteUser, {
    onSuccess() {
      toast.success("User invited successfully")
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
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) =>
          execute({ ...values, organizationId })
        )}
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="sr-only">
                Select the user's role
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-1" type="submit" disabled={isExecuting}>
          Invite User
        </Button>
      </form>
    </Form>
  )
}
