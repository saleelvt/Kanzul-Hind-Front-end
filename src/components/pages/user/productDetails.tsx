/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { GetProductByIdAction } from "../../../reduxKit/actions/admin/ProductActions";
import { ProductForm } from "../../../interfaces/admin/Iproduct";
import { SaudiRiyal } from "lucide-react";
import NavbarPage from "./navbar";
import "../../../global.css";
import "../../../css/userHome.css";
import { AddToCartAction } from "../../../reduxKit/actions/admin/cart";

// Custom Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-customGreen text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Custom Select Component
const CustomSelect: React.FC<{
  value: number;
  onChange: (value: number) => void;
  max: number;
}> = ({ value, onChange, max }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-24"
      >
        {value}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-24 bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto">
          {[...Array(max)].map((_, i) => (
            <li
              key={i + 1}
              onClick={() => {
                onChange(i + 1);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {i + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const id = location.state?.id;
  const { loading } = useSelector((state: RootState) => state.product);
  const { userLanguage } = useSelector(
    (state: RootState) => state.userLanguage
  );
  const [product, setProduct] = useState<ProductForm>();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isQuantityError, setIsQuantityError] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();


  const handleOrder = async () => {
    try {
      if (quantity > (product?.stock || 0)) {
        setIsQuantityError(true);
        return;
      }
  
      const CurrentPrice = quantity * (product?.price || 0);
      const ProductName = product?.name || "Unknown Product";
      const ProductQuantity = quantity;
      const ProductImage = product?.images?.[0] || ""; // Ensure there's an image URL
      const unit = product?.unit || "";
  
      // ✅ Create WhatsApp message link
      const phoneNumber = "919947400278"; // No "+" needed
      const message = ` ORDER DETAILS 
      🛍 *Product:* ${ProductName}%0A
      🔢 *Quantity:* ${ProductQuantity} ${unit}%0A
      💰 *Total Price:* SAR ${CurrentPrice}%0A
      🖼 *Product Image:* ${ProductImage}`;
  
      // ✅ Construct WhatsApp URL
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
      // ✅ Open WhatsApp in new tab
      window.open(whatsappURL, "_blank");
  
    } catch (error) {
      console.log("Error while adding to the cart:", error);
    }
  };
  
  

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await dispatch(GetProductByIdAction(id));
        const fetchedProduct = response.payload.data;
        setProduct(fetchedProduct);
        // Set first image as selected by default
        if (fetchedProduct.images && fetchedProduct.images.length > 0) {
          setSelectedImage(
            typeof fetchedProduct.images[0] === "string"
              ? fetchedProduct.images[0]
              : URL.createObjectURL(fetchedProduct.images[0])
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductById();
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    try {
      if (quantity > (product?.stock || 0)) {
        setIsQuantityError(true);
        return;
      }
      // Implement your add to cart logic here
      console.log(`Added ${quantity} to cart`);
      const cartData = {
        quantity,
        product,
      };

      const respose = await dispatch(AddToCartAction(cartData));
      console.log("the response is : ", respose);
    } catch (error) {
      console.log("error while adding to the cart ", error);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    setIsQuantityError(newQuantity > (product?.stock || 0));
  };

  if (!id) {
    return <p className="text-center text-gray-500">No ID found.</p>;
  }

  return (
    <div className="bg-white min-h-screen">
      <NavbarPage />

      <div className="max-w-6xl mx-auto p-6 mt-20">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-[500px] bg-gray-300 rounded-md"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              {/* Large Selected Image */}
              <div className="border-2 border-customGreen rounded-lg overflow-hidden mb-4 transition-all duration-300 transform hover:scale-105">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected Product"
                    className="w-full h-[350px] object-cover"
                  />
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {product?.images?.map((img: any, index: number) => {
                  const imgSrc =
                    typeof img === "string" ? img : URL.createObjectURL(img);
                  return (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`Product thumbnail ${index + 1}`}
                      className={`
                        w-20 h-20 object-cover rounded-md cursor-pointer 
                        transition-all duration-300 
                        ${
                          selectedImage === imgSrc
                            ? "border-2 border-customGreen opacity-100"
                            : "opacity-60 hover:opacity-100"
                        }
                      `}
                      onClick={() => setSelectedImage(imgSrc)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {userLanguage === "ar" ? product?.nameAr : product?.name}
              </h1>

              <p className="text-gray-600">
                {userLanguage === "ar"
                  ? product?.descriptionAr
                  : product?.description}
              </p>

              <div className="flex  items-center ">
                <SaudiRiyal />
                <p className="text-2xl font-semibold  text-customGreen">
                  {product?.price}.00{" "}
                  <span className="text-black font-bold text-[17px]">
                    {product?.unit}
                  </span>
                </p>
              </div>
              <p className="text-gray-600 text-sm font-bold">
                Stock: {product?.stock}
              </p>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4">
                <CustomSelect
                  value={quantity}
                  onChange={handleQuantityChange}
                  max={Math.min(10, product?.stock || 0)}
                />

                <button
                  onClick={handleAddToCart}
                  className="bg-customGreen text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
              <div className="flex justify-center ">
                <button
                  onClick={handleOrder}
                  className="bg-customGreen w-full text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quantity Limit Modal */}
      <Modal isOpen={isQuantityError} onClose={() => setIsQuantityError(false)}>
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-600">
            Quantity Limit Exceeded
          </h2>
          <p className="text-gray-600">
            Sorry, the selected quantity exceeds available stock. Please choose
            a quantity less than or equal to {product?.stock}.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
