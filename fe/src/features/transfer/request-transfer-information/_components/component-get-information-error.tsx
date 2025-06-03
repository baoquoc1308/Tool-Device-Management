import { Card, CardContent, Button } from '@/components/ui'
import { FileText, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export const ComponentGetInformationError = () => {
  const navigate = useNavigate()
  return (
    <div className='container mx-auto px-4 py-6'>
      <Card className='w-full'>
        <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
          <FileText className='text-muted-foreground mb-4 h-12 w-12' />
          <h3 className='text-lg font-medium'>Transfer Request Not Found</h3>
          <p className='text-muted-foreground mt-2'>
            The transfer request you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate('/transfers')}
            variant='outline'
            className='mt-4'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Requests
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
