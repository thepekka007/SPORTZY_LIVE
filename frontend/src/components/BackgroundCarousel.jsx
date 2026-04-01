import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import bg1 from "../assets/images/bg1.jpg";
import bg2 from "../assets/images/bg2.jpg";
import bg3 from "../assets/images/bg3.jpg";

const images = [bg1, bg2, bg3];

const BackgroundCarousel = () => {
  const [current, setCurrent] = useState(0);

  // ✅ Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3 sec

    return () => clearInterval(interval);
  }, []);

  // ✅ Manual controls
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${images[current]})`,
        }}
      ></div>

      {/* Overlay (optional dark layer) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content on top */}
     <div className="absolute inset-0 flex items-center">
  <div className="max-w-2xl ml-10 md:ml-20 text-left">
    
    <h2 className="text-white text-2xl md:text-4xl font-bold leading-snug drop-shadow-lg font-sans">
      “At times, it seemed like a huge mistake. I wasn't starting and I wanted to quit and go back home.”
    </h2>

    <h1 className="text-orange-300 text-lg md:text-2xl mt-4 font-semibold">
      — Angel Di Maria
    </h1>

  </div>
</div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 text-white text-3xl"
      >
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 text-white text-3xl"
      >
      </button>



{/* 🔥 Bottom Right Animated Card */}
<motion.div
  initial={{ opacity: 0, x: 100, y: 100 }}
  animate={{ opacity: 1, x: 0, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
  className="absolute bottom-6 right-6 w-[300px] p-5 rounded-2xl 
             bg-white/10 backdrop-blur-lg border border-white/20 
             shadow-xl text-white"
>
  <h2 className="text-xl font-bold mb-2">🔥 Live Match</h2>

  <p className="text-sm text-gray-200 mb-3">
    Team A vs Team B
  </p>

  <div className="flex justify-between items-center mb-3">
    <span className="text-lg font-semibold">120/3</span>
    <span className="text-sm text-green-400">Over 15.2</span>
  </div>

  <button className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-lg font-semibold">
    Watch Now
  </button>
</motion.div>




    </div>






  );
};

export default BackgroundCarousel;