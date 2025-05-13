// import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-[#edf2f7] w-full flex flex-col h-[100dvh]">
      <div>Header</div>
      <main className="flex-1 overflow-y-scroll overflow-x-hidden">
        <div>Main part</div>
      </main>
    </div>
  );
};

export default Layout;
