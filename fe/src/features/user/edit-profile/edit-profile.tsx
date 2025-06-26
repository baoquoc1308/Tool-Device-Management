import { useState } from 'react'
import { ProfileForm } from './_components/profile-form'
import type { ProfileFormType } from '../model/profile-form'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { tryCatch } from '@/utils'
import { updateInformation } from '../api'
import { toast } from 'sonner'

export const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()

  const handleSubmit = async (data: ProfileFormType) => {
    setIsLoading(true)
    const response = await tryCatch(updateInformation(data))
    console.log(response)
    if (response.error) {
      toast.error(response.error?.message || 'Failed to update profile')
      return
    }
    toast.success('Profile updated successfully')
    setIsLoading(false)
  }

  return (
    <div className='container mx-auto py-6'>
      <ProfileForm
        user={user}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}

export default EditProfile
