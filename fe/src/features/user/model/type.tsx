export type UserType = {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
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
