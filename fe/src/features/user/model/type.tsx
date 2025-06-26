export type UserType = {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  isActivate: boolean
  role: {
    id: number
    slug: string
  }
  department?: {
    id: number
    departmentName: string
  }
}
