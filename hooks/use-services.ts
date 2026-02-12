'use client'

import { useState, useEffect } from 'react'
import { Service, api } from '@/lib/api'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getServices()
      setServices(data)
    } catch (err) {
      setError('Failed to fetch services')
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  const getServiceById = async (id: string) => {
    try {
      return await api.getServiceById(id)
    } catch (err) {
      setError('Failed to fetch service')
      console.error('Error fetching service:', err)
      return null
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return {
    services,
    loading,
    error,
    getServiceById,
    refetch: fetchServices,
  }
}
