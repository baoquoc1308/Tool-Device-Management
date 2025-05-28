import { Button, LoadingSpinner } from '@/components/ui'
import { useFormContext } from 'react-hook-form'

export const FormButtonSubmit = ({
  isPending,
  type,
  Icon,
  className,
  onSubmit,
}: {
  isPending: boolean
  Icon?: React.ElementType
  type: string
  className?: string
  onSubmit: (value: any) => void
}) => {
  const { formState, handleSubmit } = useFormContext()
  return (
    <Button
      disabled={!formState.isDirty || !formState.isValid || isPending}
      type='submit'
      className={className}
      onClick={handleSubmit(onSubmit)}
    >
      {isPending ? (
        <LoadingSpinner className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <>
          {Icon && <Icon className='h-4 w-4 sm:h-5 sm:w-5' />}
          {type}
        </>
      )}
    </Button>
  )
}
