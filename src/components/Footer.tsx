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
        <div className="block lg:hidden mb-12">
          <div className="flex flex-col space-y-8 text-center">
            <div>
              <h4 className="mb-6 text-lg font-semibold">Company</h4>
              <ul className="space-y-3">
                <li><a href="/about-us" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/community" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
                <li><a href="/affiliates" className="text-gray-300 hover:text-white transition-colors">Affiliate</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-semibold">Resources</h4>
              <ul className="space-y-3">
                <li><a href="/news" className="text-gray-300 hover:text-white transition-colors">Blogs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-semibold">Support</h4>
              <ul className="space-y-3">
                <li><a href="/contact-us" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="https://helpcenter.redotpay.com" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Services Row - Mobile/Tablet */}
        <div className="block lg:hidden mb-8">
          <h4 className="text-xl font-semibold mb-8 text-center">Our Services</h4>
          <div className="space-y-8">
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
            </div>
            <div className="text-center">
              <h5 className="text-lg font-semibold mb-4 text-blue-400">AI & Generative Technology</h5>
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
            </div>
            <div className="text-center">
              <h5 className="text-lg font-semibold mb-4 text-blue-400">Advanced Digital Marketing</h5>
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

      

        {/* Social Links */}
        <div className="flex justify-center gap-8 mb-10">
          <a href="https://x.com/redotpay" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/redotpayofficial" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/redotpay/" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.584.12 4.775.302 4.082.559c-.726.275-1.34.64-1.95 1.25-.61.61-.975 1.224-1.25 1.95C.802 4.275.62 5.084.567 6.29.514 7.496.5 7.896.5 11.517s.014 4.021.067 5.227c.053 1.206.235 2.015.492 2.708.275.726.64 1.34 1.25 1.95.61.61 1.224.975 1.95 1.25.693.257 1.502.439 2.708.492 1.206.053 1.606.067 5.227.067s4.021-.014 5.227-.067c1.206-.053 2.015-.235 2.708-.492.726-.275 1.34-.64 1.95-1.25.61-.61.975-1.224 1.25-1.95.257-.693.439-1.502.492-2.708.053-1.206.067-1.606.067-5.227s-.014-4.021-.067-5.227c-.053-1.206-.235-2.015-.492-2.708-.275-.726-.64-1.34-1.25-1.95-.61-.61-1.224-.975-1.95-1.25C19.725.802 18.916.62 17.71.567 16.504.514 16.104.5 12.483.5s-3.988.014-5.194.067c-1.206.053-2.015.235-2.708.492-.726.275-1.34.64-1.95 1.25-.61.61-.975 1.224-1.25 1.95C.802 4.275.62 5.084.567 6.29.514 7.496.5 11.117.5 11.117z"/>
              <path d="M12.017 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
              <circle cx="18.406" cy="5.594" r="1.44"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/RedotPayOfficial" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://t.me/primai" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-.633.335-1.787 1.122-.169.133-.322.198-.462.196-.152-.003-.446-.085-.663-.156-.267-.088-.48-.135-.461-.285.01-.078.125-.158.345-.24 1.353-.592 2.256-.987 2.708-1.183 1.29-.557 1.561-.654 1.738-.657z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-8 pb-12 text-center">
          <p className="text-gray-400 text-sm">Copyright © 2025 PrimAi All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
