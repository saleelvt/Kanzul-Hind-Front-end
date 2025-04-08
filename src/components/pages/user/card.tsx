import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductForm {
  _id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number | "";
  unit: string;
  stock: number;
  isAvailable: boolean;
  images: (string | File)[];
}

interface ProductCardProps {
  product: ProductForm;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const GetProductById = async (id: string) => {
    try {
      if (id) {
        navigate("/productDetails", { state: { id } });
      }
    } catch (error) {
      console.log("id not owrk ", error);
    }
  };

  return (
    <div
      onClick={() => GetProductById(product?._id)}
      className="group relative w-full max-w-sm mt-4 border border-1 bg-white shadow-lg rounded-t-2xl  overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Product Image Placeholder */}
      <div className="relative h-56  bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={
              typeof product.images[0] === "string"
                ? (product.images[0] as string)
                : URL.createObjectURL(product.images[0] as File)
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}

        {/* Availability Badge */}
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${
            product.isAvailable
              ? "bg-customGreen text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {product.isAvailable ? "Available" : "Out of Stock"}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col  lg:h-36  ">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 pr-2 flex-grow">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1 text-yellow-700 flex-shrink-0 ml-2">
              <ShoppingCart size={18} />
              <span className="font-bold text-sm whitespace-nowrap">
                {typeof product.price === "number"
                  ? `SAR ${product.price.toFixed(2)}`
                  : "Price N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Swipe to Pay Button */}
        <div className="flex justify-between text-xs ">
          <button
            disabled={!product.isAvailable || product.stock === 0}
            className={`
       flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold 
      text-white transition-all duration-300 relative overflow-hidden
      ${
        product.isAvailable && product.stock > 0
          ? "bg-gradient-to-r from-green-500 to-green-800 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
    `}
          >
            <span className="absolute inset-0  bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
            Add 🛒
          </button>
          <button
          
            disabled={!product.isAvailable || product.stock === 0}
            className={`
       flex items-center justify-center gap-2  px-4 py-2  rounded-full font-semibold 
      text-white transition-all duration-300 relative overflow-hidden
      ${
        product.isAvailable && product.stock > 0
          ? "bg-gradient-to-r from-green-500 to-green-800 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
    `}
          >
            <span className="absolute inset-0  bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList: React.FC<{ products: ProductForm[] }> = ({ products }) => {
  return (
    <div className="container mx-auto px-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
