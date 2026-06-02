"use client"

import { useActionState } from "react"
import { Button, Input, Textarea } from "@/components/ui"
import { submitContactForm } from "@/lib/appwrite/actions"

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, {} as Record<string, any>)

  if (state.success) {
    return (
      <div className="mt-8 rounded-lg bg-green-50 p-6 text-center">
        <p className="text-lg font-semibold text-green-800">Thank you!</p>
        <p className="mt-2 text-green-700">
          Your message has been sent successfully. We will get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
          <Input id="name" name="name" required className="mt-1" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
          <Input id="email" name="email" type="email" required className="mt-1" placeholder="your@email.com" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
        <Input id="subject" name="subject" className="mt-1" placeholder="How can we help?" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message *</label>
        <Textarea id="message" name="message" required rows={5} className="mt-1" placeholder="Your message..." />
      </div>
      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
