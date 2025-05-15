// import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className='flex h-[100dvh] w-full flex-col bg-[#edf2f7]'>
      <div>Header</div>
      <main className='flex-1 overflow-x-hidden overflow-y-scroll'>
        <div>Main part</div>
      </main>
    </div>
  )
}

export default Layout
