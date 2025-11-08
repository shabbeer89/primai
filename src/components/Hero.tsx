"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [isVisible] = useState(true);
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/get-started');
  };

  return (
    <section className="min-h-screen flex items-center pt-16 pb-8 px-4 md:pt-20 md:pb-20 md:px-10 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-bg.png" alt="Hero Background" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Mobile Layout - Centered */}
        <div className="flex flex-col justify-center md:hidden">
          {/* Hero Content - Mobile */}
          <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-indigo-600/20 text-white rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6 opacity-0 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
            <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse"></div>
            <span>Delivering Web3 Innovation</span>
          </div>

          <h1 className={`text-base md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6 text-white opacity-0 transition-all duration-600 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
            <span className="block">Build the Future with</span>
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI, Blockchain & Web3</span>
          </h1>

          <p className={`text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-10 max-w-2xl mx-auto md:mx-0 opacity-0 transition-all duration-600 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
            Enterprise-grade blockchain solutions, AI-powered automation, and Web3 infrastructure to transform your vision into reality.
          </p>

          <div className={`flex flex-col gap-3 md:flex-row md:gap-4 opacity-0 transition-all duration-600 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
            <button
              onClick={handleGetStarted}
              className="bg-indigo-600 text-white px-6 py-4 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-h-[44px] text-base"
            >
              Get Started
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="bg-purple-500 text-white border-2 border-gray-200 px-6 py-4 md:px-8 md:py-4 rounded-xl font-semibold hover:border-indigo-600 hover:text-indigo-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 min-h-[44px] text-base">
              Get A Demo
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" fill="currentColor"/>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>      
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-20 md:items-center">
          {/* Hero Content - Desktop Left */}
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 text-white rounded-full text-sm font-semibold mb-6 opacity-0 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
              <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse"></div>
              <span>Delivering Web3 Innovation</span>
            </div>

            <h1 className={`text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-white opacity-0 transition-all duration-600 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
              <span className="block whitespace-nowrap">Build the Future with</span>
              <span className="block whitespace-nowrap bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI, Blockchain & Web3</span>
            </h1>

            <p className={`text-xl text-gray-300 leading-relaxed mb-10 opacity-0 transition-all duration-600 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
              Enterprise-grade blockchain solutions, AI-powered automation, and Web3 infrastructure to transform your vision into reality.
            </p>

            <div className={`flex gap-4 opacity-0 transition-all duration-600 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
              <button
                onClick={handleGetStarted}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-h-[44px]"
              >
                Get Started
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="bg-purple-500 text-white border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-indigo-600 hover:text-indigo-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 min-h-[44px]">
                Get A Demo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" fill="currentColor"/>
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
