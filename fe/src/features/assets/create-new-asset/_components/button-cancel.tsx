import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'

export const ButtonCancel = ({ isPending }: { isPending: boolean }) => {
  const navigate = useNavigate()
  return (
    <Button
      variant='outline'
      onClick={() => navigate('/assets')}
      disabled={isPending}
    >
      Cancel
    </Button>
  )
}
