"use client";

import { useState, useEffect } from "react";

const carouselData = [
  {
    category: "Crypto & Block chain",
    title: "Token Generation with WEb 3 page",
    description: "Launch tokenized projects with end-to-end token sale management.",
    gradient: ["#667eea", "#764ba2"]
  },
  {
    category: "Trading & Financial Tools",
    title: "Crypto Trading Bot ",
    description: "Automated trading strategies for crypto and financial markets.",
    gradient: ["#4facfe", "#00f2fe"]
  },
  {
    category: "Web3 based Education & Community",
    title: "Portfolio Website for Networking Professionals",
    description: "Affiliate-driven decentralized projects with multi-layer incentive structures.",
    gradient: ["#43e97b", "#38f9d7"]
  },
  {
    category: "Web3",
    title: "Business Webpage",
    description: "Rebuilt for the De-centralized era. Sleek, secure, and smart websites powered by Blockchain technology and AI automation.",
    gradient: ["#a8edea", "#fed6e3"]
  },
  {
    category: "AI",
    title: "AI Chatbot",
    description: "Intelligent conversational agents for customer support, onboarding, or engagement.",
    gradient: ["#f093fb", "#f5576c"]
  },
  {
    category: "Advance Digital Marketing",
    title: "Digital Marketing",
    description: "From performance analytics to predictive strategy — we help brands evolve, engage, and expand globally.",
    gradient: ["#fa709a", "#fee140"]
  }
];

export default function CoverflowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(10);

  useEffect(() => {
    const advanceInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
      setRemainingTime(10);
    }, 10000);

    const countdownInterval = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 10));
    }, 1000);

    return () => {
      clearInterval(advanceInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setRemainingTime(10);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    setRemainingTime(10);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    setRemainingTime(10);
  };

  return (
    <section className="py-16 md:py-[120px] px-4 md:px-10 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-[80px]">
          <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">Featured Projects</div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">Turning Imagination into impact</h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed md:leading-8 px-2">Discover how PrimAI transforms bold ideas into intelligent, real-world innovation through AI and blockchain.</p>
        </div>

        <div className="relative max-w-5xl mx-auto perspective-1200 pb-8 md:pb-[100px]">
          <div className="relative h-96 flex items-center justify-center">
            {carouselData.map((item, index) => {
              const position = index - currentIndex;
              let transformClass = "";
              let zIndex = 1;

              if (position === 0) {
                transformClass = "translate-x-0 translate-z-0 scale-100 rotate-y-0";
                zIndex = 10;
              } else if (position === 1 || position === -carouselData.length + 1) {
                transformClass = "translate-x-20 -translate-z-12 scale-75 -rotate-y-15";
                zIndex = 5;
              } else if (position === -1 || position === carouselData.length - 1) {
                transformClass = "-translate-x-20 -translate-z-12 scale-75 rotate-y-15";
                zIndex = 5;
              } else if (position === 2 || position === -carouselData.length + 2) {
                transformClass = "translate-x-40 -translate-z-20 scale-55 -rotate-y-22";
                zIndex = 2;
              } else if (position === -2 || position === carouselData.length - 2) {
                transformClass = "-translate-x-40 -translate-z-20 scale-55 rotate-y-22";
                zIndex = 2;
              } else {
                transformClass = "translate-x-0 -translate-z-32 scale-30";
                zIndex = 1;
              }

              return (
                <div
                  key={index}
                  className={`absolute w-72 md:w-80 h-96 rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out shadow-2xl preserve-3d ${transformClass}`}
                  style={{ zIndex }}
                  onClick={() => goToSlide(index)}
                >
                  <div
                    className="w-full h-full bg-gradient-to-br opacity-100 hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className={`flex justify-between items-start mb-4 ${position === 0 ? '' : 'hidden'}`}>
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wide">
                          {item.category}
                        </div>
                        <div className="w-12 h-12 relative">
                          <svg width="48" height="48" className="transform -rotate-90">
                            <circle
                              cx="24"
                              cy="24"
                              r="18"
                              stroke="#ffffff40"
                              strokeWidth="3"
                              fill="none"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="18"
                              stroke="#fff"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray={2 * Math.PI * 18}
                              strokeDashoffset={2 * Math.PI * 18 * (1 - remainingTime / 10)}
                              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                            {remainingTime}
                          </div>
                        </div>
                      </div>
                      {position !== 0 && (
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                          {item.category}
                        </div>
                      )}
                      <h3 className="text-2xl font-bold mb-2 leading-tight">{item.title}</h3>
                      <p className="text-sm text-white/90 leading-relaxed mb-4">{item.description}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        View Case Study
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-[60px]">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 hover:bg-indigo-600 hover:border-indigo-600 transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18L9 12L15 6"/>
              </svg>
            </button>

            <div className="flex gap-2">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex ? 'bg-indigo-600 w-8 rounded-md' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 hover:bg-indigo-600 hover:border-indigo-600 transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18L15 12L9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
