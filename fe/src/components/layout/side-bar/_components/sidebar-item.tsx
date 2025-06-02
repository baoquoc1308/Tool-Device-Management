import { LayoutDashboard, NotebookPen, Computer, SendToBack } from 'lucide-react'
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
      ],
    },
  ],
}
