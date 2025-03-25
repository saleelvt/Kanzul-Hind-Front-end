import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      image: '/api/placeholder/600/400',
      title: 'Flat 5% OFF',
      subtitle: 'On All Products',
      buttonText: 'Shop Now',
      discount: '5% OFF'
    },
    {
      image: '/api/placeholder/600/400',
      title: 'Halwa Stuffed Dates',
      subtitle: 'Delicious Calicut Halwa Stuffed inside Medjool Dates',
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
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-[400px] flex overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute w-full h-full transition-transform duration-500 ease-in-out
              flex items-center justify-between px-8 bg-gray-100
              ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            {/* Left Side - Image */}
            <div className="w-1/3 h-full flex items-center justify-center">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="max-h-full max-w-full object-contain"
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
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */} 
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
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
  );
};

export default ProductCarousel;