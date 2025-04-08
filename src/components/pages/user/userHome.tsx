/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "../../../global.css";
import { ProductForm } from "../../../interfaces/admin/Iproduct";
import "../../../css/userHome.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { GetProductsAction } from "../../../reduxKit/actions/admin/ProductActions";
import Footer from "./footer";
import Swal from "sweetalert2";
import NavbarPage from "./navbar";
import CarouselCustomNavigation from "./carousal";
import ProductList from "./card";
import SubSection from "./subSection";

const UserHomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductForm[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await dispatch(GetProductsAction());
        if (response.payload.success) {
          console.log(
            "my response on the product fetching : ",
            response.payload
          );
          await setProducts(response.payload.data);
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
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
    };
    fetchProducts();
  }, [dispatch]);

  if (products) {
    console.log("data data ", products);
  }

  return (
    <div className="">
      <NavbarPage />
      <CarouselCustomNavigation />
      <div className="text-4xl px-6 mt-8 font-bold  text-customGreen">
        <h1>All Selections. What’s you like </h1>
      </div>
      <ProductList products={products} />
      <SubSection />
      <Footer />
    </div>
  );
};

export default UserHomePage;
