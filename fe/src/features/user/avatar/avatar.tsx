import { Avatar, AvatarFallback, AvatarImage } from '@/components'
import { useAppSelector } from '@/hooks'
import Cookies from 'js-cookie'
const UserAvatar = () => {
  const user = useAppSelector((state) => state.auth.user)
  const firstName = Cookies.get('firstName') || user.firstName
  const lastName = Cookies.get('lastName') || user.lastName
  return (
    <Avatar className='h-8 w-8 rounded-lg'>
      <AvatarImage alt={firstName + lastName} />
      <AvatarFallback className='rounded-lg'>{lastName[0] + firstName[0]}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
