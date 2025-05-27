import { Link } from 'react-router-dom'

export const LinkToSignUp = () => {
  return (
    <div className='text-muted-foreground mt-4 text-center text-xs sm:text-sm'>
      Don't have an account?{' '}
      <Link
        to='/signup'
        className='text-primary font-medium hover:underline'
      >
        Create account
      </Link>
    </div>
  )
}
