import { Card, CardContent, CardFooter, CardHeader, CardTitle, Button } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const NoAsset = ({ id }: { id: string }) => {
  const navigate = useNavigate()
  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='border-destructive'>
        <CardHeader>
          <CardTitle className='text-destructive'>Asset Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We couldn't find the asset with ID: {id}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Assets
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
