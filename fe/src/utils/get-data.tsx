import React from 'react'
import { toast } from 'sonner'
import { tryCatch } from '@/utils'
export type ApiResponse<T> = {
  data: T
}

export const getData = async <T,>(
  apiCall: () => Promise<ApiResponse<T>>,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const { data, error } = await tryCatch(apiCall())

  if (error) {
    toast.error(error?.message)
    return null
  }
  setState(data?.data)
  return data?.data
}
