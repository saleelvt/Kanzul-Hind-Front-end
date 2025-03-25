/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "../../../global.css";
import { ProductForm } from "../../../interfaces/admin/Iproduct";
import "../../../css/userHome.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { GetProductsAction } from "../../../reduxKit/actions/admin/ProductActions";
import Swal from "sweetalert2";
import NavbarPage from "./navbar";
import CarouselCustomNavigation from "./carousal";



const UserHomePage: React.FC = () => {
  const [products,setProducts]=useState<ProductForm[]>([])
  const dispatch=useDispatch<AppDispatch>()

 


  useEffect(()=>{
    const fetchProducts=async ()=>{
      try {       
        const response = await dispatch(GetProductsAction())
        if (     response.payload.success) {
          console.log("my response on the product fetching : ", response.payload);
          await setProducts(response.payload.data)
        }
      } catch (error:any) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text:error.message,
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
    }
    fetchProducts()

  },[dispatch])

  if(products){
  console.log("data data ", products);
    
  }

  return (
  <div className="">

    <NavbarPage/>
    <CarouselCustomNavigation/>
  </div> 
  );
};

export default UserHomePage;


