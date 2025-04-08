import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from "../../../assets/images/navigation.png"
import img2 from "../../../assets/images/11473310.png"

// Define the slide type
interface Slide {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  discount?: string;
}

const ProductCarousel: React.FC = () => {
  // Slides data based on the images you provided
  const slides: Slide[] = [
    {
      image: `${img1}`,
      title: 'Flat 5% OFF',
      subtitle: 'On All Products',
      buttonText: 'Shop Now',
      discount: '5% OFF'
    },
    {
      image: `${img2}`, 
      title: 'The Malabar Coffee & Snack Box',
      subtitle: 'South Indian coffee, cardamom cookies, banana chips, coconut sugar + coffee filter',
      buttonText: 'Order Now',
      discount: "World's First"
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex justify-center items-center mt-12 ">
    <div className="relative w-full max-w-8xl mt-12 shadow-xl rounded-sm mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-[450px] flex overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute w-full h-full transition-transform duration-500 ease-in-out
              flex items-center justify-between px-8 
              ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            {/* Left Side - Image */}
            <div className="w-2/3 h-full  flex items-center justify-center">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="max-h-full max-w-full  object-contain"
              />
            </div>

            {/* Right Side - Content */}
            <div className="w-2/3 pl-8 space-y-4">
              {slide.discount && (
                <div className="text-2xl font-bold text-orange-600">
                  {slide.discount}
                </div>
              )}
              <h2 className="text-4xl font-bold">{slide.title}</h2>
              <p className="text-xl text-gray-600">{slide.subtitle}</p>
              <button className="bg-customGreen text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */} 
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 rounded-full border p-2 hover:bg-white/75 transition"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 rounded-full border p-2 hover:bg-white/75 transition"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-colors duration-300
              ${index === currentSlide ? 'bg-green-600' : 'bg-gray-300'}
            `}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductCarousel;