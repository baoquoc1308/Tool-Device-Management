import { Button } from '@/components'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export const ButtonCreateNewAssets = () => {
  const navigate = useNavigate()
  return (
    <Button
      size='sm'
      onClick={() => navigate('/assets/create')}
    >
      <Plus className='mr-2 h-4 w-4' />
      Create New Asset
    </Button>
  )
}
