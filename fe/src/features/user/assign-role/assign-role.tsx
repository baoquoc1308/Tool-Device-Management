import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  Form,
  FormSelect,
  FormButtonSubmit,
} from '@/components/ui'
import { Shield, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getData, tryCatch } from '@/utils'
import { assignRoleForUser, getAllRoles, getAllUsers } from '../api'
import type { UserType } from '../model'
import type { Roles } from './model'
import { type AssignRoleType, assignRoleSchema } from './model/schema'
import { toast } from 'sonner'

export const AssignRole = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isLoadingRoles, setIsLoadingRoles] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [roles, setRoles] = useState<Roles[]>()

  const form = useForm<AssignRoleType>({
    resolver: zodResolver(assignRoleSchema),
    defaultValues: {
      userId: '',
      role: '',
    },
  })

  const fetchUsers = async () => {
    setIsLoadingUsers(true)
    await getData(getAllUsers, setUsers)
    setIsLoadingUsers(false)
  }
  const fetchRoles = async () => {
    setIsLoadingRoles(true)
    await getData(getAllRoles, setRoles)
    setIsLoadingRoles(false)
  }

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const onSubmit = async (values: AssignRoleType) => {
    setIsSubmitting(true)
    const data = await tryCatch(assignRoleForUser(values.role, values.userId))
    console.log('Role assigned successfully:', data)
    if (data.error) {
      toast.error(data.error.message || 'Failed to assign role to user')
      setIsSubmitting(false)
      return
    }

    toast.success(`Role ${values.role} assigned to user ${values.userId} successfully`)
    form.reset()
    setIsSubmitting(false)
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <Card className='mx-auto w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-2xl'>
            <Shield className='h-6 w-6' />
            Assign User Role
          </CardTitle>
          <CardDescription>Select a user and assign them an appropriate role in the system</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <CardContent className='flex items-center justify-evenly space-y-4'>
              {isLoadingUsers ? (
                <div className='flex items-center gap-2 py-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span>Loading users...</span>
                </div>
              ) : (
                <FormSelect
                  name='userId'
                  label='User'
                  placeholder='Select a user'
                  data={users}
                />
              )}

              {isLoadingRoles ? (
                <div className='flex items-center gap-2 py-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span>Loading roles...</span>
                </div>
              ) : (
                <div>
                  <FormSelect
                    name='role'
                    label='Role'
                    placeholder='Select a role'
                    data={roles || []}
                  />
                  {form.watch('role') && (
                    <div className='text-muted-foreground mt-2 flex items-center gap-2 text-sm'>
                      {roles?.find((r) => r.slug === form.watch('role'))?.description || 'No description available'}
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            <CardFooter className='flex justify-end space-x-2 border-t pt-4'>
              <FormButtonSubmit
                isPending={isSubmitting}
                className='flex items-center gap-2'
                Icon={isSubmitting ? Loader2 : Shield}
                type='Submit'
                onSubmit={onSubmit}
              />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
