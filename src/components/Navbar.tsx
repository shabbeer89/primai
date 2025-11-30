"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { isAdminAuthenticated } from "@/lib/auth";
import { Settings } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminAuthenticated());
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white backdrop-blur-[10px] border-b border-black/6 z-50 py-3 px-4 md:py-4 md:px-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/primai-logo.png"
              alt="PrimAI Logo"
              width={68}
              height={60}
              className="h-20 w-auto md:h-12"
              loading="eager"
            />
          </Link>
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
        <ul className="hidden md:flex gap-6 list-none items-center">
          <li><Link href="/blog" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Blog</Link></li>
          <li><Link href="/contact-us" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Contact Us</Link></li>
          <li><Link href="/affiliate" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:bg-indigo-700 hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-sm">Earn with PrimAI</Link></li>
          {isAdmin && (
            <>
              <li className="border-l border-gray-300 pl-6">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center text-purple-700 hover:text-purple-800 font-medium transition-colors"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/blog"
                  className="flex items-center text-purple-700 hover:text-purple-800 font-medium transition-colors"
                >
                  Blog Admin
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <ul className="space-y-4">
            <li><Link href="/blog" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-center" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
            <li><Link href="/contact-us" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-center" onClick={() => setIsMenuOpen(false)}>Contact Us</Link></li>
            <li><Link href="/affiliate" className="block bg-indigo-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg" onClick={() => setIsMenuOpen(false)}>Earn with PrimAI</Link></li>
            {isAdmin && (
              <>
                <li className="border-t border-gray-200 pt-4">
                  <Link href="/admin/dashboard" className="flex items-center justify-center text-purple-700 hover:text-purple-800 font-medium py-3 px-2 rounded-lg hover:bg-purple-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin/blog" className="block text-purple-700 hover:text-purple-800 font-medium py-3 px-2 rounded-lg hover:bg-purple-50 transition-colors text-center" onClick={() => setIsMenuOpen(false)}>
                    Blog Management
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )
      }
    </nav >
  );
}
