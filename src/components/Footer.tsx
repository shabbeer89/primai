"use client";

import { useState } from "react";
import { ChevronDown, QrCode } from "lucide-react";

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-white pt-12 sm:pt-20 lg:pt-26">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Heading */}
        <h3 className="px-4 text-sm font-medium sm:text-center sm:text-4xl sm:leading-[60px] mb-1">
Start your Amazing journey into the Web3 revolution with PrimAI        </h3>
        <h2 className="px-4 text-[26px] font-semibold sm:text-center sm:text-4xl sm:leading-[60px] mb-8">
          Innovate<span className="text-blue-500">.</span> Automate<span className="text-blue-500">.</span> Accelerate<span className="text-blue-500">.</span>
        </h2>

        <div className="hidden lg:block mb-12">
          {/* Top Row: Company Links */}
          <div className="flex justify-center gap-16 mb-12">
            <div className="text-center">
              <h4 className="mb-6 text-lg font-semibold">Company</h4>
              <ul className="space-y-3">
                <li><a href="/about-us" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/community" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
                <li><a href="/affiliates" className="text-gray-300 hover:text-white transition-colors">Affiliate</a></li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="mb-6 text-lg font-semibold">Resources</h4>
              <ul className="space-y-3">
                <li><a href="/news" className="text-gray-300 hover:text-white transition-colors">Blogs</a></li>
                <li><a href="/admin/login" className="text-gray-300 hover:text-white transition-colors">Administration</a></li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="mb-6 text-lg font-semibold">Support</h4>
              <ul className="space-y-3">
                <li><a href="/contact-us" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="https://helpcenter.redotpay.com" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          {/* Our Services Heading */}
          <h4 className="text-2xl font-semibold mb-8 text-center">Our Services</h4>

          {/* Services Grid: 3 columns for better balance */}
          <div className="grid grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <h5 className="text-lg font-semibold mb-4 text-blue-400">Crypto & Blockchain Solutions</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/centralized-exchange" className="hover:text-white transition-colors">Centralized Exchange (CEX)</a></li>
                <li><a href="/ico-offering" className="hover:text-white transition-colors">ICO (Initial Coin Offering)</a></li>
                <li><a href="/rwa-tokenization" className="hover:text-white transition-colors">RWA Tokenization (Real-World Asset)</a></li>
                <li><a href="/blockchain-development" className="hover:text-white transition-colors">Layer 1 & Layer 2 Blockchain Development</a></li>
                <li><a href="/wallets" className="hover:text-white transition-colors">Custodian & Non-Custodian Wallets</a></li>
                <li><a href="/digital-identity" className="hover:text-white transition-colors">Digital Identity on Blockchain</a></li>
              </ul>
            </div>
            <div className="text-center">
              <h5 className="text-lg font-semibold mb-4 text-blue-400">Trading & Financial Tools</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/trading-bot" className="hover:text-white transition-colors">AI-Powered Trading Bot</a></li>
                <li><a href="/p2p-platform" className="hover:text-white transition-colors">P2P Trading Platform</a></li>
                <li><a href="/carbon-marketing" className="hover:text-white transition-colors">Carbon Marketing Solutions</a></li>
              </ul>
              <h5 className="text-lg font-semibold mb-4 mt-8 text-blue-400">AI & Generative Technology</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/gen-ai-bot" className="hover:text-white transition-colors">Gen AI Bot</a></li>
                <li><a href="/ai-chatbot" className="hover:text-white transition-colors">AI Chatbot</a></li>
              </ul>
            </div>
            <div className="text-center">
              <h5 className="text-lg font-semibold mb-4 text-blue-400">Education & Community</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/web3-education" className="hover:text-white transition-colors">Web3 Educational Platform</a></li>
                <li><a href="/mlm-web3" className="hover:text-white transition-colors">MLM-Based Web3 Projects</a></li>
              </ul>
              <h5 className="text-lg font-semibold mb-4 mt-8 text-blue-400">Advanced Digital Marketing</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/content-creation" className="hover:text-white transition-colors">AI-Powered Content Creation</a></li>
                <li><a href="/web3-growth-marketing" className="hover:text-white transition-colors">Web3 & Blockchain Growth Marketing</a></li>
                <li><a href="/crypto-influencer" className="hover:text-white transition-colors">Crypto Influencer & Community Campaigns</a></li>
                <li><a href="/ad-optimization" className="hover:text-white transition-colors">Predictive Ad Optimization & Automation</a></li>
                <li><a href="/education-funnel" className="hover:text-white transition-colors">AI-Driven Education & Funnel Marketing</a></li>
                <li><a href="/seo-marketing" className="hover:text-white transition-colors">SEO, Social Media Marketing, Google Ads, Branding</a></li>
              </ul>
            </div>
          </div>
        </div>

       

        {/* Company/Links Section - Mobile/Tablet */}
        <div className="block lg:hidden mb-4">
          <div className="flex flex-col space-y-4 text-center">
            <div>
              <button
                onClick={() => toggleAccordion('company')}
                className="w-full flex items-center justify-center mb-4 text-lg font-semibold hover:text-blue-400 transition-colors"
              >
                Company
                <ChevronDown
                  className={`ml-2 w-5 h-5 transition-transform ${
                    openAccordion === 'company' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'company' && (
                <ul className="space-y-3">
                  <li><a href="/about-us" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/community" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
                  <li><a href="/affiliates" className="text-gray-300 hover:text-white transition-colors">Affiliate</a></li>
                </ul>
              )}
            </div>
            <div>
              <button
                onClick={() => toggleAccordion('resources')}
                className="w-full flex items-center justify-center mb-4 text-lg font-semibold hover:text-blue-400 transition-colors"
              >
                Resources
                <ChevronDown
                  className={`ml-2 w-5 h-5 transition-transform ${
                    openAccordion === 'resources' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'resources' && (
                <ul className="space-y-3">
                  <li><a href="/news" className="text-gray-300 hover:text-white transition-colors">Blogs</a></li>
                  <li><a href="/admin/login" className="text-gray-300 hover:text-white transition-colors">Administration</a></li>
                </ul>
              )}
            </div>
            <div>
              <button
                onClick={() => toggleAccordion('support')}
                className="w-full flex items-center justify-center mb-4 text-lg font-semibold hover:text-blue-400 transition-colors"
              >
                Support
                <ChevronDown
                  className={`ml-2 w-5 h-5 transition-transform ${
                    openAccordion === 'support' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'support' && (
                <ul className="space-y-3">
                  <li><a href="/contact-us" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="https://helpcenter.redotpay.com" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</a></li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Services Row - Mobile/Tablet */}
        <div className="block lg:hidden mb-8">
          <h4 className="text-xl font-semibold mb-8 text-center">Our Services</h4>
          <div className="space-y-6">
            <div className="text-center">
              <button
                onClick={() => toggleAccordion('crypto-blockchain')}
                className="w-full flex items-center justify-center mb-4 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Crypto & Blockchain Solutions
                <ChevronDown
                  className={`ml-2 w-5 h-5 transition-transform ${
                    openAccordion === 'crypto-blockchain' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'crypto-blockchain' && (
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/centralized-exchange" className="hover:text-white transition-colors">Centralized Exchange (CEX)</a></li>
                  <li><a href="/ico-offering" className="hover:text-white transition-colors">ICO (Initial Coin Offering)</a></li>
                  <li><a href="/rwa-tokenization" className="hover:text-white transition-colors">RWA Tokenization (Real-World Asset)</a></li>
                  <li><a href="/blockchain-development" className="hover:text-white transition-colors">Layer 1 & Layer 2 Blockchain Development</a></li>
                  <li><a href="/wallets" className="hover:text-white transition-colors">Custodian & Non-Custodian Wallets</a></li>
                  <li><a href="/digital-identity" className="hover:text-white transition-colors">Digital Identity on Blockchain</a></li>
                </ul>
              )}
            </div>
            <div className="text-center">
              <button
                onClick={() => toggleAccordion('trading-tools')}
                className="w-full flex items-center justify-center mb-4 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Trading & Financial Tools
                <ChevronDown
                  className={`ml-2 w-5 h-5 transition-transform ${
                    openAccordion === 'trading-tools' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'trading-tools' && (
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/trading-bot" className="hover:text-white transition-colors">AI-Powered Trading Bot</a></li>
                  <li><a href="/p2p-platform" className="hover:text-white transition-colors">P2P Trading Platform</a></li>
                  <li><a href="/carbon-marketing" className="hover:text-white transition-colors">Carbon Marketing Solutions</a></li>
                </ul>
              )}
            </div>
            <div className="text-center">
              <button
                onClick={() => toggleAccordion('ai-tech')}
                className="w-full flex items-center justify-center mb-4 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                AI & Generative Technology
                <ChevronDown
                  className={`ml-2 w-5 h-5 transition-transform ${
                    openAccordion === 'ai-tech' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'ai-tech' && (
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/gen-ai-bot" className="hover:text-white transition-colors">Gen AI Bot</a></li>
                  <li><a href="/ai-chatbot" className="hover:text-white transition-colors">AI Chatbot</a></li>
                </ul>
              )}
            </div>
            <div className="text-center">
              <button
                onClick={() => toggleAccordion('education')}
                className="w-full flex items-center justify-center mb-4 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Education & Community
                <ChevronDown
                  className={`ml-2 w-5 h-5 transition-transform ${
                    openAccordion === 'education' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'education' && (
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/web3-education" className="hover:text-white transition-colors">Web3 Educational Platform</a></li>
                  <li><a href="/mlm-web3" className="hover:text-white transition-colors">MLM-Based Web3 Projects</a></li>
                </ul>
              )}
            </div>
            <div className="text-center">
              <button
                onClick={() => toggleAccordion('marketing')}
                className="w-full flex items-center justify-center mb-4 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Advanced Digital Marketing
                <ChevronDown
                  className={`ml-2 w-5 h-5 transition-transform ${
                    openAccordion === 'marketing' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'marketing' && (
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/content-creation" className="hover:text-white transition-colors">AI-Powered Content Creation</a></li>
                  <li><a href="/web3-growth-marketing" className="hover:text-white transition-colors">Web3 & Blockchain Growth Marketing</a></li>
                  <li><a href="/crypto-influencer" className="hover:text-white transition-colors">Crypto Influencer & Community Campaigns</a></li>
                  <li><a href="/ad-optimization" className="hover:text-white transition-colors">Predictive Ad Optimization & Automation</a></li>
                  <li><a href="/education-funnel" className="hover:text-white transition-colors">AI-Driven Education & Funnel Marketing</a></li>
                  <li><a href="/seo-marketing" className="hover:text-white transition-colors">SEO, Social Media Marketing, Google Ads, Branding</a></li>
                </ul>
              )}
            </div>
          </div>
        </div>

      

       

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-8 pb-12 text-center">
           {/* Social Links */}
        <div className="flex justify-center gap-8 mb-10">
          <a href="https://x.com/Official_PrimAI" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/73039070/admin/dashboard/" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
       
        </div>
          <p className="text-gray-400 text-sm">Copyright © 2025 PrimAi All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
