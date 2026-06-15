'use client'

import { useAuth } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'

/**
 * LogoutRedirect — mounted inside the Payload admin shell via afterNavLinks.
 * Uses Payload's own useAuth() hook to watch the user state.
 * The moment user becomes null (logout happened), we hard-navigate to login.
 */
export function LogoutRedirect() {
  const { user } = useAuth()
  // Track whether the user was ever logged in during this session
  const wasLoggedIn = useRef(false)

  useEffect(() => {
    if (user) {
      wasLoggedIn.current = true
      return
    }
    if (!wasLoggedIn.current) return
    // Debounce: give in-flight Server Action requests ~2s to settle before navigating away
    const timer = setTimeout(() => {
      window.location.replace('/admin/login')
    }, 2000)
    return () => clearTimeout(timer)
  }, [user])

  return null
}
