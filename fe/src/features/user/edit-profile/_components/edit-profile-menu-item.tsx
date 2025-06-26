import { useNavigate } from 'react-router-dom'
import { Pencil } from 'lucide-react'

const EditProfileMenuItem = () => {
  const navigate = useNavigate()

  const handleEditProfile = () => {
    navigate('/user/edit-profile')
  }

  return (
    <div
      onClick={handleEditProfile}
      className='flex w-full cursor-pointer items-center gap-2 rounded-md p-1 text-sm'
    >
      <Pencil />
      Edit Profile
    </div>
  )
}

export default EditProfileMenuItem
