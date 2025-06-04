import { LayoutDashboard, NotebookPen, Computer, SendToBack, PersonStanding } from 'lucide-react'
export const data = {
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
        },
        {
          title: 'Maintenance schedule',
          url: '/assets/maintenance-schedule',
        },
      ],
    },
    {
      title: 'Assignments',
      url: '/assignments',
      icon: NotebookPen,
      active: true,
      haveChildren: true,
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
        },
        {
          title: 'Create new request transfer',
          url: '/transfers/create-request-transfer',
        },
      ],
    },
    {
      title: 'User',
      url: '/user',
      icon: PersonStanding,
      active: true,
      haveChildren: true,
      items: [
        {
          title: 'Assign role',
          url: '/user/assign-role',
        },
      ],
    },
  ],
}
