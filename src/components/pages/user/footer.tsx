import React from "react";
import logoImg from "../../../assets/images/logo black.svg";
import { FaInstagram, FaThreads, FaFacebook, FaXTwitter, FaYoutube, FaLinkedin } from "react-icons/fa6";
import "../../../global.css"

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-10 px-6 lg:px-16 mt-14">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Logo & Social Icons */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logoImg} alt="Logo" className="h-12 mb-4" />
          <div className="flex space-x-4 text-customGreen text-xl">
            <FaInstagram />
            <FaThreads />
            <FaFacebook />
            <FaXTwitter />
            <FaYoutube />
            <FaLinkedin />
          </div>
          <p className="text-sm text-gray-600 mt-4">© 2024 Kanzul Hind Private Limited</p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 md:mt-0 text-sm">
          <div>
            <h3 className="font-semibold text-[18px] mb-2">Categories</h3>
            <ul className="space-y-1 text-[14px]">
              <li>Assorted</li>
              <li>Unbeatable Deal</li>
              <li>Combo</li>
              <li>Fruit</li>
              <li>Single Variety</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[18px]  mb-2">Resources</h3>
            <ul className="space-y-1 text-[14px]">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Articles</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[18px]  mb-2">Company</h3>
            <ul className="space-y-1 text-[14px]">
              <li>Home</li>
              <li>About</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[18px]  mb-2">My Account</h3>
            <ul className="space-y-1 text-[14px]">
              <li>Profile</li>
              <li>Favorites</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="mt-12 text-center text-sm text-gray-600 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6">
        <span>Privacy Policy</span>
        <span>Refund & Return Policy</span>
        <span>Shipping Policy</span>
        <span>Terms of Service</span>
        <span>@BrankBik Creatives</span>
      </div>
    </footer>
  );
};

export default Footer;
