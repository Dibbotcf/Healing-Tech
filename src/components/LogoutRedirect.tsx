'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * LogoutRedirect — mounted inside the Payload admin shell.
 * It listens to the admin's custom `payload-logout` event that Payload fires
 * after a successful logout API call, then hard-navigates to /admin/login.
 *
 * We also poll every second: if the auth cookie disappears while the admin
 * shell is still showing the dashboard, we redirect automatically.
 */
export function LogoutRedirect() {
  const router = useRouter()

  useEffect(() => {
    function goToLogin() {
      window.location.replace('/admin/login')
    }

    // Payload dispatches this event after a successful logout
    window.addEventListener('payload-logout', goToLogin)

    // Fallback: poll for the cookie every second
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch('/api/users/me', {
          credentials: 'include',
          cache: 'no-store',
        })
        if (res.status === 401) {
          clearInterval(intervalId)
          goToLogin()
        }
      } catch {
        // ignore network errors
      }
    }, 1500)

    return () => {
      window.removeEventListener('payload-logout', goToLogin)
      clearInterval(intervalId)
    }
  }, [router])

  return null
}
