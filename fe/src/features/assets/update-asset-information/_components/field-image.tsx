import { FormField, FormItem, FormControl, Input, Button } from '@/components/ui'
import { ImageIcon, Upload } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { CreateAssetFormType } from '../../create-new-asset'
export const FieldImage = ({
  form,
  imagePreview,
  setImagePreview,
}: {
  form: UseFormReturn<CreateAssetFormType>
  imagePreview: string
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      form.setValue('image', file, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    }
  }
  return (
    <>
      <div className='flex flex-grow items-center justify-center space-y-4'>
        {imagePreview ? (
          <div className='flex-grow overflow-hidden'>
            <img
              src={imagePreview}
              alt='Asset preview'
              className='m-auto max-h-[300px] rounded-md object-contain p-8'
            />
          </div>
        ) : (
          <div className='flex h-40 items-center justify-center rounded-md border border-dashed'>
            <ImageIcon className='text-muted-foreground h-10 w-10' />
          </div>
        )}
      </div>

      <FormField
        control={form.control}
        name='image'
        render={() => (
          <FormItem>
            <FormControl>
              <div>
                <Input
                  type='file'
                  accept='image/*'
                  id='imageUpload'
                  className='hidden'
                  onChange={handleImageUpload}
                />
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  onClick={() => document.getElementById('imageUpload')?.click()}
                >
                  <Upload className='mr-2 h-4 w-4' />
                  {imagePreview ? 'Change Image' : 'Upload Image'}
                </Button>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
