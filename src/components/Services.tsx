"use client";

import { useState, useEffect } from 'react';
import { useScrollAnimation } from "@/lib/useScrollAnimation";

// Service slides data
const serviceSlides = [
  {
    badge: "BLOCKCHAIN",
    badgeColor: "from-blue-500 to-purple-600",
    title: "Crypto & Blockchain Solutions",
    description: "Secure, scalable blockchain ecosystems for the decentralized future",
    features: [
      "Centralized Exchange (CEX)",
      "ICO (Initial Coin Offering)",
      "RWA Tokenization",
      "Layer 1 & Layer 2 Development",
      "Custodian & Non-Custodian Wallets",
      "Digital Identity on Blockchain"
    ],
    illustration: (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/blockchain-service.jpeg" 
          alt="Blockchain Services" 
          className="w-full h-full object-contain transition-transform duration-1000 ease-out transform hover:scale-105" 
        />
      </div>
    )
  },
  {
    badge: "TRADING",
    badgeColor: "from-green-500 to-teal-500",
    title: "Trading & Financial Tools",
    description: "AI-powered trading solutions for intelligent financial markets",
    features: [
      "AI-Powered Trading Bot",
      "P2P Trading Platform",
      "Carbon Marketing Solutions"
    ],
    illustration: (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/trading-service.jpeg" 
          alt="Trading Services" 
          className="w-full h-full object-contain transition-transform duration-1000 ease-out transform hover:scale-105" 
        />
      </div>
    )
  },
  {
    badge: "AI",
    badgeColor: "from-pink-500 to-yellow-500",
    title: "AI & Generative Technology",
    description: "Advanced AI solutions that think, adapt, and evolve",
    features: [
      "Gen AI Bot",
      "AI Chatbot"
    ],
    illustration: (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/ai-service.jpeg" 
          alt="AI Services" 
          className="w-full h-full object-contain transition-transform duration-1000 ease-out transform hover:scale-105" 
        />
      </div>
    )
  },
  {
    badge: "LEARN & EARN",
    badgeColor: "from-teal-400 to-pink-500",
    title: "Education & Community",
    description: "A growing hub for innovators, learners, and creators. Uniting people through knowledge, mentorship, and collaboration.",
    features: [
      "Web3 Educational Platform",
      "MLM-Based Web3 Projects",
    ],
    illustration: (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/learn-service.jpeg" 
          alt="Learn & Earn Services" 
          className="w-full h-full object-contain transition-transform duration-1000 ease-out transform hover:scale-105" 
        />
      </div>
    )
  },
  {
    badge: "MARKETING",
    badgeColor: "from-orange-500 to-red-500",
    title: "Advanced Digital Marketing",
    description: "From performance analytics to predictive strategy — we help brands evolve, engage, and expand globally.",
    features: [
      "AI-Powered Content Creation",
      "Web3 & Blockchain Growth Marketing",
      "Crypto Influencer & Community Campaigns",
      "Predictive Ad Optimization & Automation",
      "AI-Driven Education & Funnel Marketing",
      "SEO, Social Media Marketing, Google Ads, Branding",
    ],
    illustration: (
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src="/marketing-service.jpeg" 
          alt="Marketing Services" 
          className="w-full h-full object-contain transition-transform duration-1000 ease-out transform hover:scale-105" 
        />
      </div>
    )
  }
];

// Mobile-first service cards
const mobileServices = [
  {
    id: "blockchain",
    title: "Crypto & Blockchain Solutions",
    description: "Secure, scalable blockchain ecosystems for the decentralized future",
    icon: "🔗",
    gradient: "from-blue-500 to-purple-600",
    features: [
      "Centralized Exchange (CEX)",
      "ICO (Initial Coin Offering)",
      "RWA Tokenization",
      "Layer 1 & Layer 2 Development",
      "Custodian & Non-Custodian Wallets",
      "Digital Identity on Blockchain"
    ]
  },
  {
    id: "trading",
    title: "Trading & Financial Tools",
    description: "AI-powered trading solutions for intelligent financial markets",
    icon: "📈",
    gradient: "from-green-500 to-teal-500",
    features: [
      "AI-Powered Trading Bot",
      "P2P Trading Platform",
      "Carbon Marketing Solutions"
    ]
  },
  {
    id: "ai",
    title: "AI & Generative Technology",
    description: "Advanced AI solutions that think, adapt, and evolve",
    icon: "🤖",
    gradient: "from-pink-500 to-yellow-500",
    features: [
      "Gen AI Bot",
      "AI Chatbot"
    ]
  },
  {
    id: "education",
    title: "Education & Community",
    description: "Web3 educational platforms and community-driven projects",
    icon: "🎓",
    gradient: "from-teal-500 to-pink-500",
    features: [
      "Web3 Educational Platform",
      "MLM-Based Web3 Projects"
    ]
  },
  {
    id: "marketing",
    title: "Advanced Digital Marketing",
    description: "Performance-driven marketing solutions for global brands",
    icon: "📊",
    gradient: "from-orange-500 to-red-500",
    features: [
      "AI-Powered Content Creation",
      "Web3 & Blockchain Growth Marketing",
      "Crypto Influencer Campaigns",
      "Predictive Ad Optimization",
      "AI-Driven Education & Funnel Marketing",
      "SEO, Social Media, Google Ads, Branding"
    ]
  }
];

export default function Services() {
  const { elementRef: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.1 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeService, setActiveService] = useState(mobileServices[0].id);
  const [isAnimating, setIsAnimating] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);

  useEffect(() => {
    const advanceInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % serviceSlides.length);
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

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setRemainingTime(10);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + serviceSlides.length) % serviceSlides.length);
    setRemainingTime(10);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % serviceSlides.length);
    setRemainingTime(10);
  };

  return (
    <section ref={servicesRef} className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-purple-50 to-purple-100 relative overflow-hidden">
      {/* Background decoration */}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-3 md:mb-4">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight transition-all duration-600 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>PrimAI Innovation Suite</h2>
          <p className={`text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-7 px-4 md:px-6 transition-all duration-600 delay-200 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Comprehensive Solutions for the Decentralized Future</p>
        </div>

        {/* Mobile-First Service Cards */}
        <div className="space-y-4 md:hidden">
          {mobileServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer min-h-[80px]"
              onClick={() => setActiveService(activeService === service.id ? '' : service.id)}
            >
              {/* Service Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white text-base`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{service.title}</h3>
                    <p className="text-xs text-gray-600">{service.description}</p>
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${activeService === service.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Expandable Features */}
              {activeService === service.id && (
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <span className="text-indigo-600 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-3 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 rounded-lg font-medium text-xs min-h-[36px] hover:shadow-lg transition-all">
                    Explore Solutions
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Auto-Scrolling Carousel */}
        <div className="hidden md:block">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="overflow-hidden relative">
              <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {serviceSlides.map((slide, index) => (
                  <div key={index} className="min-w-0 flex flex-col md:flex-row md:items-stretch md:justify-center gap-6 px-6 py-6 flex-shrink-0 w-full overflow-x-hidden">
                    <div className="flex-1 max-w-full md:max-w-[450px] space-y-0 order-2 md:order-1 px-0 flex flex-col min-h-[400px]">
                      {/* Fixed header section */}
                      <div className="mb-6">
                        <div className={`flex justify-between items-center mb-4 ${index === currentSlide ? '' : ''}`}>
                          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${slide.badgeColor} text-white rounded-full text-sm font-bold uppercase tracking-wider ${isAnimating && currentSlide === index ? 'animate-pulse' : ''}`}>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            {slide.badge}
                          </div>
                          {index === currentSlide && (
                            <div className="w-12 h-12 relative rounded-full flex items-center justify-center">
                              <svg width="48" height="48" className="transform -rotate-90">
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  stroke="#1e40af80"
                                  strokeWidth="2"
                                  fill="none"
                                />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  stroke="#1e40af"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeDasharray={2 * Math.PI * 20}
                                  strokeDashoffset={2 * Math.PI * 20 * (1 - remainingTime / 10)}
                                  style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                                />
                              </svg>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-sm font-bold text-blue-900">
                                {remainingTime}
                              </div>
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">{slide.title}</h3>
                        <p className="text-base text-gray-700 leading-relaxed">{slide.description}</p>
                      </div>

                      {/* Scrollable content section */}
                      <div className="flex-1 overflow-y-auto mb-4 overflow-x-hidden">
                        <ul className="space-y-2">
                          {slide.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className={`flex items-start gap-3 text-gray-700 font-medium transition-all duration-700 ease-out ${
                                currentSlide === index && !isAnimating
                                  ? 'translate-x-0 opacity-100'
                                  : '-translate-x-12 opacity-0'
                              }`}
                              style={{
                                transitionDelay: currentSlide === index && !isAnimating ? `${idx * 100}ms` : '0ms'
                              }}
                            >
                              <span className="text-indigo-600 mt-0.5">•</span>
                              <span className="flex-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Fixed footer section */}
                      <div className="mt-auto flex justify-end">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                          Explore Solutions
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 max-w-full md:max-w-[450px] flex items-center justify-center order-1 md:order-2 px-0">
                      <div className="w-full h-72 md:h-80 relative flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden">
                        <div className={`transition-all duration-1000 ease-out ${isAnimating && currentSlide === index ? 'scale-100 opacity-100 rotate-0' : 'scale-90 opacity-80 rotate-2'}`}>
                          {slide.illustration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-100 ease-linear" style={{ width: `${((currentSlide + 1) / serviceSlides.length) * 100}%` }}></div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            {/* Left Arrow */}
            <button
              onClick={goToPrevSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center shadow-sm hover:shadow-md min-h-[44px] min-w-[44px]"
              aria-label="Previous slide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {serviceSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all min-h-[36px] min-w-[36px] md:min-h-0 md:min-w-0 flex items-center justify-center ${
                    index === currentSlide
                      ? 'bg-indigo-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNextSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center shadow-sm hover:shadow-md min-h-[44px] min-w-[44px]"
              aria-label="Next slide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
