"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="border-2 border-primary px-3 py-1 rounded">
              <span className="text-sm font-bold text-primary">
                HAIR RAP BY YOYO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-accent transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-foreground hover:text-accent transition font-medium"
            >
              Services
            </Link>
            <Link
              href="/chat"
              className="text-foreground hover:text-accent transition font-medium"
            >
              AI Chatbot
            </Link>
            <Link
              href="/my-bookings"
              className="text-foreground hover:text-accent transition font-medium"
            >
              My Bookings
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-accent transition font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-accent transition font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Auth Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-foreground hover:text-accent transition flex items-center gap-2"
            >
              <span>🔒</span> Login
            </Link>
            <Link
              href="/register"
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-foreground hover:text-accent transition font-medium"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-foreground hover:text-accent transition font-medium"
              >
                Services
              </Link>
              <Link
                href="/chat"
                className="text-foreground hover:text-accent transition font-medium"
              >
                AI Chatbot
              </Link>
              <Link
                href="/my-bookings"
                className="text-foreground hover:text-accent transition font-medium"
              >
                My Bookings
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-accent transition font-medium"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-accent transition font-medium"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="text-foreground hover:text-accent transition font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium inline-block"
              >
                Register
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// 'use client'

// import Link from 'next/link'
// import { useState } from 'react'
// import { Menu, X } from 'lucide-react'

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-lg">Y</span>
//             </div>
//             <span className="text-xl font-bold text-primary hidden sm:inline">
//               HAIR RAP
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             <Link href="/" className="text-foreground hover:text-accent transition">
//               Services
//             </Link>
//             <Link href="/my-bookings" className="text-foreground hover:text-accent transition">
//               My Bookings
//             </Link>
//             <Link href="/chat" className="text-foreground hover:text-accent transition">
//               AI Assistant
//             </Link>
//             <Link href="/about" className="text-foreground hover:text-accent transition">
//               About Us
//             </Link>
//             <Link href="/contact" className="text-foreground hover:text-accent transition">
//               Contact
//             </Link>
//           </nav>

//           {/* Auth Links */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link
//               href="/login"
//               className="text-foreground hover:text-accent transition"
//             >
//               Login
//             </Link>
//             <Link
//               href="/register"
//               className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium"
//             >
//               Register
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//           >
//             {isOpen ? (
//               <X className="w-6 h-6 text-primary" />
//             ) : (
//               <Menu className="w-6 h-6 text-primary" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <nav className="md:hidden py-4 border-t border-border">
//             <div className="flex flex-col gap-4">
//               <Link
//                 href="/"
//                 className="text-foreground hover:text-accent transition"
//               >
//                 Services
//               </Link>
//               <Link
//                 href="/my-bookings"
//                 className="text-foreground hover:text-accent transition"
//               >
//                 My Bookings
//               </Link>
//               <Link
//                 href="/chat"
//                 className="text-foreground hover:text-accent transition"
//               >
//                 AI Assistant
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-foreground hover:text-accent transition"
//               >
//                 About Us
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-foreground hover:text-accent transition"
//               >
//                 Contact
//               </Link>
//               <Link
//                 href="/login"
//                 className="text-foreground hover:text-accent transition"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/register"
//                 className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-medium inline-block"
//               >
//                 Register
//               </Link>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   )
// }
