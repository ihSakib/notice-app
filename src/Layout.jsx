import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header className="bg-blue-500 text-white px-10 md:px-30 py-3 flex justify-between items-center">
        <h1 className=" text-xl md:text-2xl text-center font-bold">
          <Link to="/">Notice Board📍</Link>
        </h1>
        <nav className=" text-center">
          <Link to="/manage" className="text-white hover:underline">
            Manage
          </Link>
        </nav>
      </header>
      <main className="flex-grow p-4 ">
        <Outlet />
      </main>
      <footer className=" text-slate-600 mt-auto p-4 text-center">
        <p>
          Copyright © {new Date().getFullYear()} Notice App. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
