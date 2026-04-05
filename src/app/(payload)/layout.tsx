// @ts-nocheck
/* eslint-disable react/no-children-prop */
import configPromise from '@/payload.config'
import '@payloadcms/next/css'
import { RootLayout, ServerFunction } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap.js'

const serverFunction: ServerFunction = async function (args) {
  'use server'
  const { handleServerFunction } = await import('@payloadcms/next/utilities')
  return handleServerFunction({
    ...args,
    config: configPromise,
    importMap,
  })
}

type Args = {
  children: React.ReactNode
}

export default function Layout({ children }: Args) {
  return <RootLayout config={configPromise} serverFunction={serverFunction} importMap={importMap}>{children}</RootLayout>
}
