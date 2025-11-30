
"use client";

import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const ContactUs: NextPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Head>
          <title>Contact Us - PrimAI</title>
          <meta name="description" content="Get in touch with PrimAI - Let's build the future together" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Hero Section */}
        <section className="relative pt-32 md:pt-28 pb-16 px-4 md:px-10 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-left mb-16">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 text-indigo-300 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-indigo-500/20 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <span>Contact Us</span>
              </div>

              {/* Main Title */}
              <h1 className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 transition-all duration-600 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="block text-white mb-2">⭐ PrimAI —</span>
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Let's Build the Future, Together
                </span>
              </h1>

              {/* Description */}
              <div className={`max-w-3xl mx-auto transition-all duration-600 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
                  Whether you're shaping an idea, scaling a product, or exploring what's next in AI and Web3—we're right here to make it happen.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  We're more than a tech team. We're partners in building meaningful products that solve real problems and spark real growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <section className="pb-20 px-4 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Talk to Us Card */}
              <div className={`bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📪</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Talk to Us</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We reply within minutes — no bots, just people who care about your vision.
                </p>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span>Direct email communication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>WhatsApp support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Phone consultations</span>
                  </div>
                </div>
              </div>

              {/* Live Call Card */}
              <div className={`bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 group delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Live Strategy Call</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Sometimes one call says more than a hundred messages. Book a free 15-minute strategy session.
                </p>
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg p-4 border border-indigo-500/20">
                  <p className="text-indigo-300 font-semibold">⏳ Free 15-minute call</p>
                  <p className="text-sm text-gray-400">Get clarity, feedback, and a custom plan</p>
                </div>
              </div>

              {/* Global Presence Card */}
              <div className={`bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10 group delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Global & Remote-First</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We're global and remote-first, with roots on the ground and vision in the cloud.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-green-400">🏢</span>
                    <span>Home Base: Vijayawada, India</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-blue-400">🌍</span>
                    <span>Global Hubs: Dubai, UAE</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-purple-400">⚡️</span>
                    <span>24/7 Availability</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="pb-20 px-4 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-600 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Why Choose <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">PrimAI</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Because your ideas deserve a team that can turn them into impact. Here's what we bring to the table:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: "📊",
                  title: "Custom AI Tools & Automation",
                  description: "Intelligent solutions that streamline your operations and boost productivity"
                },
                {
                  icon: "🔗",
                  title: "Blockchain & Web3 Development",
                  description: "Next-generation decentralized applications and smart contract solutions"
                },
                {
                  icon: "🧠",
                  title: "Strategy & Product Scaling",
                  description: "Expert consulting to grow your business and scale your products effectively"
                },
                {
                  icon: "🎓",
                  title: "Education & Community Building",
                  description: "Empowering communities through knowledge sharing and collaborative growth"
                }
              ].map((service, index) => (
                <div key={index} className={`bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${400 + index * 100}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg md:text-xl">{service.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="pb-20 px-4 md:px-10">
          <div className="max-w-4xl mx-auto">
            <div className={`bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-indigo-500/20 text-center transition-all duration-600 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                🔗 Follow Our Journey
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                We're building in the open. Join our ecosystem and stay updated with the latest developments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { platform: "LinkedIn", handle: "@primai_official", icon: "💼" },
                  { platform: "Twitter", handle: "@primaihq", icon: "🐦" },
                  { platform: "Instagram", handle: "@primai_web3", icon: "📸" }
                ].map((social, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 md:p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <div className="text-2xl md:text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{social.icon}</div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-1">{social.platform}</h4>
                    <p className="text-sm md:text-base text-indigo-300">{social.handle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-20 px-4 md:px-10">
          <div className="max-w-4xl mx-auto">
            <div className={`bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white transition-all duration-600 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                🌟 Ready to Start Building?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Not sure where to begin? No worries. Just start the conversation—we'll help you figure out the rest.
              </p>
              <div className="flex flex-col gap-4 justify-center items-center max-w-md mx-auto w-full">
                {/* Email Button */}
                <div className="group relative w-full h-16 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/20">
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                    <span className="text-lg font-semibold flex items-center gap-2">📧 Drop us an email</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <a href="mailto:contact@primai.in" className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all font-medium shadow-lg">
                      <span>contact@primai.in</span>
                    </a>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="group relative w-full h-16 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/20">
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                    <span className="text-lg font-semibold flex items-center gap-2">💬 Send a WhatsApp</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <a href="https://wa.me/971528815259" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center px-4 py-1 bg-green-600/80 hover:bg-green-500 rounded-lg transition-colors border border-green-400/30">
                      <span className="text-xs font-bold text-green-100">UAE</span>
                      <span className="text-sm font-medium">+971 52 881 5259</span>
                    </a>
                    <a href="https://wa.me/918333947726" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center px-4 py-1 bg-green-600/80 hover:bg-green-500 rounded-lg transition-colors border border-green-400/30">
                      <span className="text-xs font-bold text-green-100">India</span>
                      <span className="text-sm font-medium">+91 83 339 47726</span>
                    </a>
                  </div>
                </div>

                {/* Call Button */}
                <div className="group relative w-full h-16 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                    <span className="text-lg font-semibold flex items-center gap-2">📞 Book a call</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <a href="tel:+971528815259" className="flex flex-col items-center justify-center px-4 py-1 bg-purple-600/80 hover:bg-purple-500 rounded-lg transition-colors border border-purple-400/30">
                      <span className="text-xs font-bold text-purple-100">UAE</span>
                      <span className="text-sm font-medium">+971 52 881 5259</span>
                    </a>
                    <a href="tel:+918333947726" className="flex flex-col items-center justify-center px-4 py-1 bg-purple-600/80 hover:bg-purple-500 rounded-lg transition-colors border border-purple-400/30">
                      <span className="text-xs font-bold text-purple-100">India</span>
                      <span className="text-sm font-medium">+91 83 339 47726</span>
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-lg mt-8 opacity-80">
                Driven by curiosity. Built with integrity. Focused on real-world outcomes.<br />
                Let's collaborate. Let's create. Let's lead the next wave of digital transformation—together.
              </p>
              <p className="text-2xl mt-6 font-bold">
                Your future is calling. Let's make it real. 🚀
              </p>
            </div>
          </div>
        </section>
      </div>
      <FloatingWhatsAppButton />
    </div>
  );
};

export default ContactUs;
