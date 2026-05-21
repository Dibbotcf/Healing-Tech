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
    } else if (wasLoggedIn.current && !user) {
      // User WAS logged in and is now null — logout just happened
      window.location.replace('/admin/login')
    }
  }, [user])

  return null
}
