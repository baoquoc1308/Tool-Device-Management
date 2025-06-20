import { LayoutDashboard, NotebookPen, Computer, SendToBack, PersonStanding } from 'lucide-react'
import { useAppSelector } from '@/hooks'

export const SidebarNav = () => {
  const user = useAppSelector((state) => state.auth.user)
  const role = user.role.slug
  const canCreateAsset = role === 'admin' || (role === 'assetManager' && 'limited scope')
  const canUpdateSchedule = role === 'admin' || role === 'assetManager' || role === 'departmentHead'
  const canCreateSchedule = role === 'admin' || role === 'assetManager'
  const canTransferRequests = role === 'admin' || role === 'assetManager'
  const canViewAssignments = role === 'admin' || role === 'assetManager'
  const canCreateRequestTransfer = role === 'departmentHead'
  const data = {
    navMain: [
      {
        title: 'Dashboard',
        url: '/',
        icon: LayoutDashboard,
        haveChildren: false,
      },
      {
        title: 'Assets',
        url: '/assets',
        icon: Computer,
        active: true,
        haveChildren: true,
        items: [
          {
            title: 'All assets',
            url: '/assets',
          },
          {
            title: 'Create assets',
            url: '/assets/create-asset',
            show: canCreateAsset,
          },
          {
            title: 'Maintenance schedule',
            url: '/assets/maintenance-schedule',
            show: canUpdateSchedule,
          },
          {
            title: 'Create maintenance schedule',
            url: '/assets/maintenance-schedule/create',
            show: canCreateSchedule,
          },
        ].filter((item) => item.show !== false),
      },
      {
        title: 'Assignments',
        url: '/assignments',
        icon: NotebookPen,
        active: true,
        haveChildren: true,
        show: canViewAssignments,
        items: [
          {
            title: 'All assignments',
            url: '/assignments',
          },
        ],
      },
      {
        title: 'Transfers',
        url: '/transfers',
        icon: SendToBack,
        active: true,
        haveChildren: true,
        items: [
          {
            title: 'All transfers',
            url: '/transfers',
            show: canTransferRequests,
          },
          {
            title: 'Create new request transfer',
            url: '/transfers/create-request-transfer',
            show: canCreateRequestTransfer,
          },
        ].filter((item) => item.show !== false),
      },
      {
        title: 'User',
        url: '/user',
        icon: PersonStanding,
        active: true,
        haveChildren: true,
        show: user.role.slug === 'admin',
        items: [
          {
            title: 'Assign role',
            url: '/user/assign-role',
          },
        ],
      },
    ],
  }
  return data
}
