import { FormField, FormItem, FormControl, Input, Button } from '@/components/ui'
import { FileText, Upload } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { CreateAssetFormType } from '../../create-new-asset'
import { Link } from 'react-router-dom'
export const FieldFile = ({
  form,
  fileAttachmentName,
  setFileAttachmentName,
}: {
  form: UseFormReturn<CreateAssetFormType>
  fileAttachmentName: string | null
  setFileAttachmentName: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileAttachmentName(URL.createObjectURL(file))
      form.setValue('file', file, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    }
  }

  return (
    <>
      <div className='flex flex-grow items-center justify-center space-y-4'>
        {fileAttachmentName && (
          <Link
            to={fileAttachmentName}
            download={true}
          >
            <div className='flex max-w-full items-center gap-3 rounded-md border p-3'>
              <FileText className='h-6 w-6 flex-shrink-0' />
              <div className='min-w-0 overflow-hidden'>
                <p
                  className='block max-w-[200px] truncate overflow-hidden font-medium break-all whitespace-nowrap'
                  title={fileAttachmentName}
                >
                  {fileAttachmentName}
                </p>
                <p className='text-muted-foreground text-sm'>Attached document</p>
              </div>
            </div>
          </Link>
        )}
      </div>

      <FormField
        control={form.control}
        name='file'
        render={() => (
          <FormItem>
            <FormControl>
              <div>
                <Input
                  type='file'
                  id='fileAttachment'
                  className='hidden'
                  onChange={handleFileUpload}
                />
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  onClick={() => document.getElementById('fileAttachment')?.click()}
                >
                  <Upload className='mr-2 h-4 w-4' />
                  {fileAttachmentName ? 'Change File' : 'Upload File'}
                </Button>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
