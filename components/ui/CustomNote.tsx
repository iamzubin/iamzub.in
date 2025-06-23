import React from "react"

export default function CustomNote({ children }: { children: React.ReactNode }) {
  return (
    // <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', margin: '1.5rem 0' }}>
    <div className="p-1 bg-zinc-300 dark:bg-zinc-500 rounded-lg m-1.5 ">
      {children}
    </div>
  )
} 