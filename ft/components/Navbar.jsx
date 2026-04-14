"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold italic">AD Transfer</h1>

      {/* Menu */}
      <ul className="hidden md:flex gap-6 items-center">
        <li className="hover:underline cursor-pointer">Discover ▾</li>
        <li className="hover:underline cursor-pointer">Offers and prices ▾</li>
        <li className="hover:underline cursor-pointer">Apps ▾</li>
        <li className="hover:underline cursor-pointer">Developers ▾</li>
        <li className="hover:underline cursor-pointer">Resources ▾</li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-3 items-center">
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
          Sign in
        </button>
        <button className="bg-indigo-800 px-4 py-2 rounded-lg font-medium hover:bg-indigo-900">
          Try for free
        </button>
      </div>
    </nav>
  );
}