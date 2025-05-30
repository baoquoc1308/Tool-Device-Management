import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button } from '@/components'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export const AssignmentError = ({ id }: { id: string }) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='border-destructive'>
        <CardHeader>
          <CardTitle className='text-destructive'>Assignment Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We couldn't find the assignment with ID: {id}</p>
        </CardContent>
        <CardFooter>
          <Link to='/assignments'>
            <Button>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Assignments
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
