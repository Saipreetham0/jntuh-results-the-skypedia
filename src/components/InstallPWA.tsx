// 'use client'

// import { useState, useEffect } from 'react'
// import type { InstallPromptEvent } from '@/app/types'
// import { Button } from '@/components/ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'

// export function InstallPWA() {
//   const [deferredPrompt, setDeferredPrompt] = useState<InstallPromptEvent | null>(null)
//   const [showInstallButton, setShowInstallButton] = useState<boolean>(false)
//   const [isInstalled, setIsInstalled] = useState<boolean>(false)
//   const [isMobile, setIsMobile] = useState<boolean>(false)

//   useEffect(() => {
//     const handleInstallPrompt = (e: Event) => {
//       e.preventDefault()
//       setDeferredPrompt(e as InstallPromptEvent)
//       setShowInstallButton(true)
//     }

//     const handleAppInstalled = () => {
//       setIsInstalled(true)
//       setShowInstallButton(false)
//     }

//     const checkMobile = () => {
//       setIsMobile(window.matchMedia('(max-width: 768px)').matches)
//     }

//     // Check if app is already installed
//     if (window.matchMedia('(display-mode: standalone)').matches) {
//       setIsInstalled(true)
//     }

//     checkMobile()
//     window.addEventListener('resize', checkMobile)
//     window.addEventListener('beforeinstallprompt', handleInstallPrompt)
//     window.addEventListener('appinstalled', handleAppInstalled)

//     return () => {
//       window.removeEventListener('resize', checkMobile)
//       window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
//       window.removeEventListener('appinstalled', handleAppInstalled)
//     }
//   }, [])

//   const handleInstallClick = async () => {
//     if (!deferredPrompt) return

//     await deferredPrompt.prompt()
//     const choiceResult = await deferredPrompt.userChoice

//     if (choiceResult.outcome === 'accepted') {
//       console.log('User accepted the install prompt')
//       setIsInstalled(true)
//     }

//     setDeferredPrompt(null)
//     setShowInstallButton(false)
//   }

//   if (!showInstallButton || isInstalled || !isMobile) return null

//   return (
//     <Card className="fixed bottom-4 right-4 w-80 z-50">
//       <CardHeader>
//         <CardTitle>Install App</CardTitle>
//         <CardDescription>
//           Install our app for a better experience
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Button
//           onClick={handleInstallClick}
//           className="w-full"
//         >
//           Install Now
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }






'use client'

import { useState, useEffect } from 'react'
import type { InstallPromptEvent } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Download, X } from 'lucide-react'

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
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200/50 animate-fade-in">
      <Button
        onClick={handleInstallClick}
        size="sm"
        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 text-sm font-medium"
      >
        <Download size={16} />
        Install App
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-8 h-8"
        onClick={() => setShowInstallButton(false)}
        aria-label="Close"
      >
        <X size={16} className="text-gray-600" />
      </Button>
    </div>
  )
}