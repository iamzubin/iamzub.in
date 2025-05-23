import { z } from 'zod'

const envSchema = z.object({
  DISCORD_WEBHOOK_URL: z.string().url(),
})

export const env = envSchema.parse({
  DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
} 