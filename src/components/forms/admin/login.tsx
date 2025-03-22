/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useFormik } from "formik";
import { ValidationLogin } from "../../../validation/admin/adminLogin";
import { IAdminLogin } from "../../../interfaces/admin/login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { loginAdmin } from "../../../reduxKit/actions/auth/authAction";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logoImag from "../../../assets/images/comp black.svg";

export const AdminLogin = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const initialValues: IAdminLogin = {
    email: "",
    password: "",
  };

  const formik = useFormik<IAdminLogin>({
    initialValues,
    validationSchema: ValidationLogin,
    onSubmit: async (values) => {
      try {
        await dispatch(loginAdmin(values)).unwrap();
        navigate("/adminHomepage");
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          timer: 3000,
          toast: true,
          showConfirmButton: false,
          background: "#fff",
          color: "#5c9478",
          iconColor: "#f44336",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Welcome Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#5c9478] text-white p-8">
          <img src={logoImag} alt="Admin Logo" className="w-24 h-24 mb-4" />
          <h2 className="text-4xl font-bold font-serif mb-4 animate-pulse">Welcome Admin</h2>
          <p className="text-lg text-center">
            Securely log in to access the dashboard and manage your services.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-[#5c9478] text-center mb-6">Admin Login</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:outline-none transition duration-300"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5c9478] focus:outline-none transition duration-300"
              />
              <span
                className="absolute inset-y-0 mt-9 right-4 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223a11.055 11.055 0 00-1.66 3.656C2.453 12.11 4.825 16.5 12 16.5c2.245 0 4.09-.5 5.5-1.217M21 21l-1.682-1.682M3.98 8.223L21 21M9.878 9.878a3 3 0 014.244 4.244" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.432 5 12 5c3.87 0 7.07 2.43 8.542 5.458A10.97 10.97 0 0112 19.5a10.97 10.97 0 01-9.542-7.5z" />
                  </svg>
                )}
              </span>
            </div>

            {/* Login Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full p-3 rounded-lg bg-gradient-to-r from-[#5c9478] to-gray-700 text-white font-semibold focus:ring-2 focus:ring-[#5c9478] transition duration-300 transform hover:scale-105"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
