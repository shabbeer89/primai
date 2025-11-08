"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-[10px] border-b border-black/6 z-50 py-3 px-4 md:py-4 md:px-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/primai-logo.png"
            alt="PrimAI Logo"
            width={68}
            height={60}
            className="h-20 w-auto md:h-12"
          />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop navigation */}
        <ul className="hidden md:flex gap-10 list-none items-center">

          <li><Link href="/contact-us" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Contact Us</Link></li>
          <li><Link href="/affiliate" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:bg-indigo-700 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">Earn with PrimAI</Link></li>
        </ul>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <ul className="space-y-4">
            <li><Link href="#solutions" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>Solutions</Link></li>
            <li><Link href="#products" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
            <li><Link href="#company" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>Company</Link></li>
            <li><Link href="#resources" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>Resources</Link></li>
            <li><Link href="/contact-us" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact Us</Link></li>
            <li><Link href="/affiliate" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>Earn with PrimAI</Link></li>
            <li className="pt-2">
              <Link
                href="#contact"
                className="block bg-indigo-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
