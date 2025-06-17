import { Separator, SidebarTrigger } from '../../ui'
import { NumberNotification } from '@/features/notification'

const Header = () => {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mr-2 h-4'
        />
      </div>
      <div className='flex items-center gap-4 pr-4'>
        <NumberNotification />
      </div>
    </header>
  )
}

export default Header
