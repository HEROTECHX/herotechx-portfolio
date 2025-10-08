/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react'

export type NetworkStrength = 'excellent' | 'good' | 'fair' | 'poor' | 'offline'

interface NetworkStatus {
  isOnline: boolean
  strength: NetworkStrength
  effectiveType: string | null
  downlink: number | null
  rtt: number | null
}

export function useOnline() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    strength: 'good',
    effectiveType: null,
    downlink: null,
    rtt: null
  })

  const getNetworkStrength = useCallback((): NetworkStrength => {
    if (!navigator.onLine) return 'offline'

    // Check if Network Information API is available
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection

    if (connection) {
      const { effectiveType, downlink, rtt } = connection

      // Based on effectiveType
      if (effectiveType === '4g' && downlink > 5) return 'excellent'
      if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 2)) return 'good'
      if (effectiveType === '3g' || effectiveType === '2g') return 'fair'
      if (rtt > 500 || downlink < 0.5) return 'poor'

      return 'good'
    }

    // Fallback: perform a simple speed test
    return 'good' // Default when API not available
  }, [])

  const updateNetworkStatus = useCallback(() => {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection

    const strength = getNetworkStrength()
    
    setNetworkStatus({
      isOnline: navigator.onLine,
      strength,
      effectiveType: connection?.effectiveType || null,
      downlink: connection?.downlink || null,
      rtt: connection?.rtt || null
    })
  }, [getNetworkStrength])

  useEffect(() => {
    // Set initial state
    updateNetworkStatus()

    const handleOnline = () => {
      console.log('🌐 App is back online')
      updateNetworkStatus()
    }

    const handleOffline = () => {
      console.log('📴 App is offline')
      setNetworkStatus(prev => ({
        ...prev,
        isOnline: false,
        strength: 'offline'
      }))
    }

    const handleConnectionChange = () => {
      console.log('📶 Connection changed')
      updateNetworkStatus()
    }

    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    if (connection) {
      connection.addEventListener('change', handleConnectionChange)
    }

    // Check network status every 30 seconds
    const interval = setInterval(updateNetworkStatus, 30000)

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange)
      }
      clearInterval(interval)
    }
  }, [updateNetworkStatus])

  return networkStatus
}

// Helper function to get emoji based on strength
export function getNetworkEmoji(strength: NetworkStrength): string {
  const emojiMap: Record<NetworkStrength, string> = {
    excellent: '📶',
    good: '📶',
    fair: '📡',
    poor: '⚠️',
    offline: '📴'
  }
  return emojiMap[strength]
}

// Helper function to get color based on strength
export function getNetworkColor(strength: NetworkStrength): string {
  const colorMap: Record<NetworkStrength, string> = {
    excellent: '#22c55e',
    good: '#3b82f6',
    fair: '#eab308',
    poor: '#f97316',
    offline: '#ef4444'
  }
  return colorMap[strength]
}