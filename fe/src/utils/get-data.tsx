import React from 'react'
import { toast } from 'sonner'
import { tryCatch } from '@/utils'

export const getData = async (apiCall: () => Promise<any>, setState: React.Dispatch<React.SetStateAction<any>>) => {
  const response = await tryCatch(apiCall())
  if (response.error) {
    toast.error(response.error?.message)
    return null
  }

  setState(response.data.data)
  return response.data.data
}
