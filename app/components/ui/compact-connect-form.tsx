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
          <div className="flex items-center space-x-0">
            <Input
              type="email"
              placeholder="YOUR@EMAIL.COM"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1 border-r-0"
            />
            <div className="flex items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-6"
              >
                {isSubmitting ? "..." : "CONNECT"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={isSubmitting}
                className="h-10 w-10 p-0"
                onClick={() => setIsExpanded(true)}
              >
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                <span className="sr-only">Details</span>
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
                className="px-0"
                onClick={() => setIsExpanded(false)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>BACK</span>
              </Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs font-bold uppercase">
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
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs font-bold uppercase">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="message" className="text-xs font-bold uppercase">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="What would you like to discuss?"
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
} 