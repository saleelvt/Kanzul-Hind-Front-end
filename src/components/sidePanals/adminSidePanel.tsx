import  { useState } from "react";
import { NavLink } from "react-router-dom";


import {
  FaHome,
  FaUser,
  FaCog,
  FaPlusSquare,
  FaList ,
  FaTimes,

} from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { to: "/admin/dashboard", icon: FaHome, label: "Dashboard" },
    { to: "/adminAddProduct", icon: FaPlusSquare, label: "Add Product" },
    { to: "/adminProductList", icon: FaList, label: "Product  List" },
    { to: "/admin/profile", icon: FaUser, label: "Profile" },
    { to: "/admin/settings", icon: FaCog, label: "Settings" }
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white fixed lg:static h-screen shadow-lg transition-all duration-300 z-20
          ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-64 lg:translate-x-0'}
        `}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute -right-10 top-4 p-2 bg-white rounded-tr-lg rounded-br-lg shadow-lg lg:hidden
            ${!isOpen && 'hidden'}
          `}
        >
          <FaTimes className="h-6 w-6 text-gray-600" />
        </button>
        {/* Profile Section */}
        <div className={`p-4 ${!isOpen && 'lg:block hidden  '}`}>
          <div className="  to-gray-700  hover:text-white font-semibold focus:ring-2 focus:ring-gray-400 transition duration-300 transform hover:scale-105 rounded-lg p-4">
            <div className="flex items-center gap-3 ">
             
              <div className="text-black font-mono ">
               
                <p className=" opacity-80">kanzhulhind@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className={` px-3 ${!isOpen && 'lg:block   hidden h-full '}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `
                flex items-center  gap-4 px-4 py-4 rounded-lg mb-1
                transition-colors duration-200
                ${isActive 
                  ? 'bg-gray-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <link.icon />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>


      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 lg:hidden z-10"
          onClick={toggleSidebar}
        />
      )}
      <main className="flex-1 ">
        {/* <header className="bg-purple-100 shadow-sm p-4">
          <div className="flex items-center ">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <FaBars className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-xl  font-semibold text-gray-800 ml-4">
              Admin Dashboard
            </h1>
          </div>
        </header> */}

        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Welcome to Admin Panel
            </h2>
            <p className="text-gray-600">
              This is your admin dashboard where you can manage your application.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSidebar;