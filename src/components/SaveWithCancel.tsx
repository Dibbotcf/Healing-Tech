'use client'

import React from 'react'
import { SaveButton } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useDocumentInfo } from '@payloadcms/ui'

/**
 * Renders the default Payload Save button + a Cancel button that
 * navigates back to the current collection's list view.
 *
 * Registered as admin.components.edit.SaveButton on every collection.
 */
export function SaveWithCancel() {
  const router = useRouter()
  const { collectionSlug } = useDocumentInfo()

  const handleCancel = () => {
    if (collectionSlug) {
      router.push(`/admin/collections/${collectionSlug}`)
    } else {
      router.back()
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Cancel — styled to match Payload's dark admin theme */}
      <button
        type="button"
        onClick={handleCancel}
        style={{
          padding: '0 16px',
          height: '38px',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.07)',
          color: 'rgba(255,255,255,0.75)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          transition: 'background 0.15s, border-color 0.15s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget
          btn.style.background = 'rgba(255,255,255,0.12)'
          btn.style.borderColor = 'rgba(255,255,255,0.3)'
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget
          btn.style.background = 'rgba(255,255,255,0.07)'
          btn.style.borderColor = 'rgba(255,255,255,0.15)'
        }}
      >
        Cancel
      </button>

      {/* Default Payload Save button */}
      <SaveButton />
    </div>
  )
}
