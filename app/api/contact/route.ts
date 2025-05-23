import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter } from '@/app/lib/rate-limiter'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || 'anonymous'
    const rateLimitResult = rateLimiter.isRateLimited(ip)

    if (rateLimitResult.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const data = await request.json()
    const { email, name, message } = data

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL environment variable is not configured')
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    const content = [
      `**New Contact Form Submission**`,
      `**Email:** ${email}`,
      name && `**Name:** ${name}`,
      message && `**Message:**\n${message}`,
    ]
      .filter(Boolean)
      .join('\n')

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        username: 'Contact Form',
        avatar_url: 'https://iamzub.in/favicon.ico',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Discord API Error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully',
        remaining: rateLimitResult.remaining
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 