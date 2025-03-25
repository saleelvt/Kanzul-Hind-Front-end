/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "../../../global.css";
import "../../../css/userHome.css";
import { FiSearch,   } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import logoImg from "../../../assets/images/logo black.svg"

const NavbarPage: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4  shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logoImg} alt="Logo" className="h-10 md:h-12 w-auto cursor-pointer transition-transform duration-300 hover:scale-105" />
      </div>
      
      {/* Icons */}
      <div className="flex items-center space-x-6 text-xl ">
        <FiSearch className="cursor-pointer transition-transform duration-300 hover:scale-110" />
       
        <FaWhatsapp className="cursor-pointer transition-transform duration-300 hover:scale-110" />
        <div className="relative cursor-pointer transition-transform duration-300 hover:scale-110">
          <HiOutlineShoppingCart />
          <span className="absolute -top-2 -right-3 border  bg-white text-customGreen text-xs font-bold rounded-full px-1">0</span>
        </div>
       
      </div>
    </nav>
  );
};

export default NavbarPage;
