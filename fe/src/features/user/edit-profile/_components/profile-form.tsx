import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui'
import { AvatarUpload } from './avatar-upload'
import { profileFormSchema, type ProfileFormType } from '../../model/profile-form'

interface ProfileFormProps {
  user: {
    firstName: string
    lastName: string
    email: string
    avatar?: string
    role: { slug: string }
    department?: { departmentName: string } | null
  }
  onSubmit: (data: ProfileFormType) => void
  isLoading?: boolean
}

export const ProfileForm = ({ user, onSubmit, isLoading }: ProfileFormProps) => {
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  })

  const userInitials = ((user.lastName?.[0] || '') + (user.firstName?.[0] || '')).toUpperCase()

  return (
    <Card className='mx-auto max-w-2xl'>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            {/* Avatar Upload */}
            <AvatarUpload
              form={form}
              currentAvatar={user.avatar}
              userInitials={userInitials}
            />

            {/* Profile Fields */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Read-only Info */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <FormLabel>Role</FormLabel>
                <Input
                  value={user.role.slug}
                  disabled
                />
              </div>

              {user.department && (
                <div>
                  <FormLabel>Department</FormLabel>
                  <Input
                    value={user.department.departmentName}
                    disabled
                  />
                </div>
              )}
            </div>

            <Button
              type='submit'
              className='w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
