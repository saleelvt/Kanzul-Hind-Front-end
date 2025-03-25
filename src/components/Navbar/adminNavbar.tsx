/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reduxKit/store";
import Swal from "sweetalert2";
import { MdOutlineLogout } from "react-icons/md"; // New Logout Icon
import { adminLogout } from "../../reduxKit/actions/auth/authAction";
import logoImag from "../../assets/images/logo black.svg"; 

export const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await dispatch(adminLogout()).unwrap();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
      }).then(() => {
        navigate("/adminLogin");
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
        showConfirmButton: true,
        text: error.data,
      });
    }
  };

  return (
    <nav className="p-3 bg-[#5c9478] shadow-md">
      <div className="container  flex items-center justify-between py-2">
        {/* Logo and Heading */}
        <div className="flex items-center space-x-3 ">
          <img src={logoImag} alt="Logo" className=" h-12" />
          <h1 className="text-4xl font-serif font-bold ">Kanzul Hind</h1>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button className="focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`lg:flex lg:items-center   ${isOpen ? "block" : "hidden"}`}
        >
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-gray-500 to-black text-white font-bold py-2 px-4 rounded-md flex items-center transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <MdOutlineLogout className="mr-2 text-lg" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
