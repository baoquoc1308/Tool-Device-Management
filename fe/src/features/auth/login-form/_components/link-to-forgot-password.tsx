import { Link } from 'react-router-dom'

export const LinkToForgetPassword = () => {
  return (
    <Link
      to='/forget-password'
      className='text-primary text-xs hover:underline'
    >
      Forgot password?
    </Link>
  )
}
