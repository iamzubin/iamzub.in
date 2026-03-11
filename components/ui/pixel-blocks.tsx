'use client'

import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

interface PixelBlocksProps {
  className?: string
  color?: string
  rows?: number
  cols?: number
  density?: number
}

export function PixelBlocks({
  className,
  color = 'currentColor',
  rows = 10,
  cols = 10,
  density = 0.4,
}: PixelBlocksProps) {
  const blocks = Array.from({ length: rows * cols }).map(() => Math.random() < density)

  return (
    <div
      className={cn('grid h-fit w-fit gap-[1px]', className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {blocks.map((active, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.8 }}
          transition={{
            duration: 0.1,
            delay: i * 0.005,
          }}
          className="h-4 w-4"
          style={{ backgroundColor: active ? color : 'transparent' }}
        />
      ))}
    </div>
  )
}

export function PixelatedCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative p-4 border border-brutalist-fg/20 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]", className)}>
      <div className="absolute -top-[1px] -left-[1px] h-2 w-2 bg-brutalist-fg dark:bg-zinc-100" />
      <div className="absolute -bottom-[1px] -right-[1px] h-2 w-2 bg-brutalist-fg dark:bg-zinc-100" />
      {children}
    </div>
  )
}
