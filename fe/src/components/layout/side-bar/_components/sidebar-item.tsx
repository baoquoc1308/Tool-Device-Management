import { LayoutDashboard, Computer } from 'lucide-react'
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
      ],
    },
  ],
}
