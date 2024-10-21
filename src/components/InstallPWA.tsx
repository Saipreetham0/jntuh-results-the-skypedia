'use client'

import { useState, useEffect } from 'react'
import type { InstallPromptEvent } from '@/app/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<InstallPromptEvent | null>(null)
  const [showInstallButton, setShowInstallButton] = useState<boolean>(false)
  const [isInstalled, setIsInstalled] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as InstallPromptEvent)
      setShowInstallButton(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallButton(false)
    }

    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    const choiceResult = await deferredPrompt.userChoice

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt')
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (!showInstallButton || isInstalled || !isMobile) return null

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50">
      <CardHeader>
        <CardTitle>Install App</CardTitle>
        <CardDescription>
          Install our app for a better experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleInstallClick}
          className="w-full"
        >
          Install Now
        </Button>
      </CardContent>
    </Card>
  )
}