import React, { useState } from "react";

 import img1 from "../../../assets/images/IMG-20250324-WA0003.jpg"
 import img2 from "../../../assets/images/IMG-20250324-WA0004.jpg"
 import img3 from "../../../assets/images/IMG-20250324-WA0006.jpg"


const SubSection: React.FC = React.memo(()=>{

    const [hoveredCard, setHoveredCard] = useState(null);
  
    const products = [
      {
        id: 1,
        name: "The Oudh & Attar Royal Box",
        price: "SAR 990.00",
        image: `${img1}`,
        color: "amber-50"
      },
      {
        id: 2,
        name: "The Malabar Coffee & Snack Box",
        price: "SAR 949.00",
        image: `${img2}`,
        color: "amber-100"
      },
      {
        id: 3,
        name: "The Saffron Luxe Box",
        price: " SAR 490.00",
        image: `${img3}`,
        color: "red-400"
      }
    ];
  
    // Custom green color matching the image
    const customGreen = "#2A8D46";
  
    return (
      <div className="flex flex-col md:flex-row  mt-12  items-center justify-between w-full max-w-6xl mx-auto p-6 gap-8">
        {/* Product Cards Section */}
        <div className="relative w-full md:w-1/2 h-96">
          {products.map((product, index) => (
            <div
              key={product.id} 
              className={`absolute rounded-lg overflow-hidden shadow-lg transition-all duration-500 bg-white ${
                hoveredCard === product.id
                  ? "scale-110 z-30"
                  : index === 0
                  ? "top-18 left-6 rotate-[-8deg] z-10"
                  : index === 1
                  ? "top-9 left-3 rotate-[-4deg] z-30"
                  : "top-0 left-0 rotate-0 z-20"
              }`}
              style={{
                transformOrigin: 'center',
                width: '90%',
              }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative p-3 rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>


              <div className="p-3 bg-white">
                <h3 className="font-medium text-sm mb-2 truncate">
                  {product.name}
                </h3>
                <p className="font-bold">{product.price}</p>
              </div>
              <div 
                className={`absolute top-2 right-2 bg-white p-1 rounded-full shadow-md transform scale-0 transition-transform duration-00 ${
                  hoveredCard === product.id ? "scale-100" : ""
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={customGreen}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          ))}
        </div>
  
        {/* Text Content Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="overflow-hidden">
            <h1 className="text-4xl font-bold mb-1">
              Discover the Essence of{" "}
              <span 
                className="inline-block relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1"
                style={{ color: customGreen }}
              >
                Tradition
              </span>{" "}
              in Every Bite
            </h1>
          </div>
          
          <p className="text-gray-600">
            Explore our range of authentic Boxes, carefully crafted by skilled
            artisans and passed down through generations. From the rich
            flavours of Mixed special boxes, each Boxes tells a story of heritage
            and tradition.
          </p>
          
          <button 
            className="px-6 py-3 bg-customGreen text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-green-200/50 hover:scale-105"
        
          >
            Shop Now
          </button>
        </div>
      </div>
    );

})

export default  SubSection