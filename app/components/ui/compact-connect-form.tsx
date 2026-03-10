"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ArrowLeft } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Textarea } from "./textarea"
import { toast } from "sonner"

export function CompactConnectForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!email.trim()) {
      toast.error("Please enter your email address")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          message: message.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(isExpanded ? "Your detailed message has been sent!" : "You're connected! I'll be in touch soon.")
        setEmail("")
        setName("")
        setMessage("")
        setIsExpanded(false)
      } else if (response.status === 429) {
        toast.error("Too many requests. Please wait a some time before trying again.", {
          duration: 5000,
          description: "This helps prevent spam and ensures everyone can use the form."
        })
      } else {
        toast.error(data.error || "Failed to send message. Please try again later.")
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isExpanded ? (
          <div className="flex items-center space-x-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1 rounded-sm border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
            <div className="flex items-center">
              <div className="h-4 w-px bg-zinc-800" />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-1 rounded-sm bg-zinc-100 px-3 py-1.5 text-sm font-bold text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                {isSubmitting ? "Sending..." : "Connect"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-1 rounded-sm px-3 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                onClick={() => setIsExpanded(true)}
              >
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                <span className="sr-only">Add more details</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center">
              <Button
                type="button"
                variant="ghost"
                disabled={isSubmitting}
                className="rounded-sm px-3 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                onClick={() => setIsExpanded(false)}
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                <span>Back</span>
              </Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-[10px] uppercase font-bold text-zinc-500">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="rounded-sm border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="name" className="text-[10px] uppercase font-bold text-zinc-500">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="rounded-sm border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="message" className="text-[10px] uppercase font-bold text-zinc-500">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="What would you like to discuss?"
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="min-h-[80px] rounded-sm border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-sm bg-zinc-100 px-3 py-1.5 text-sm font-bold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
} 