import { cn } from '@/shadcn/lib/utils'
import React from 'react'
import styles from "./styles.module.scss"

export default function Indicator({ className, status }) {
  return (
    <main className={cn("", className)}>
      {status === "available" ? (
        <div
          className={`${styles.available} ${styles.statusIndicator}`}
        >
          <span class="rounded-full size-2 bg-green-500 shadow-md shadow-black"></span>{" "}
          AVAILABLE
        </div>
      ) : status === "booked" ? (
        <div
          className={`${styles.booked} ${styles.statusIndicator}`}
        >
          <span class="rounded-full size-2 bg-red-600 shadow-sm shadow-black"></span>{" "}
          BOOKED
        </div>
      ) : (
        <div
          className={`${styles.pending} ${styles.statusIndicator}`}
        >
          <span class="rounded-full size-2 bg-neutral-600 shadow-sm shadow-black"></span>{" "}
          PENDING
        </div>
      )}
    </main>
  )
}
