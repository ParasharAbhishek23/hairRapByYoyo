export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Product */}
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Case studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Getting started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Server status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Report a bug
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Chat support
                </a>
              </li>
            </ul>
          </div>

          {/* For Provider */}
          <div>
            <h3 className="font-bold text-lg mb-4">For Provider</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Faq's
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Getting started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Other Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Report a bug
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Chat support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">SignUp For Subscription</h3>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="w-full bg-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition">
                Subscribe
              </button>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-black text-white px-3 py-2 rounded text-xs font-bold">
                  App Store
                </button>
                <button className="flex-1 bg-black text-white px-3 py-2 rounded text-xs font-bold">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mb-8 text-sm">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:opacity-80 transition"
          >
            f
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white hover:opacity-80 transition"
          >
            📷
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition"
          >
            𝕏
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white hover:opacity-80 transition"
          >
            💬
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:opacity-80 transition"
          >
            ▶️
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:opacity-80 transition"
          >
            📌
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:opacity-80 transition"
          >
            in
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:opacity-80 transition"
          >
            🔗
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-300">
              © 2024 HAIR RAP BY YOYO. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                Terms of Service
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">🌐 English</span>
              <span className="text-gray-300">💵 USD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// export default function Footer() {
//   return (
//     <footer className="bg-primary text-white mt-16">
//       {/* Main Footer */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
//           {/* Product */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Product</h3>
//             <ul className="space-y-2 text-sm text-primary-foreground/80">
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   Features
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   Pricing
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Company</h3>
//             <ul className="space-y-2 text-sm text-primary-foreground/80">
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   Careers
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   Press
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Support</h3>
//             <ul className="space-y-2 text-sm text-primary-foreground/80">
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   Contact
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   FAQ
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   Help Center
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Legal */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Legal</h3>
//             <ul className="space-y-2 text-sm text-primary-foreground/80">
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition">
//                   Cookie Policy
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Follow Us */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Follow Us</h3>
//             <div className="flex gap-4">
//               <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
//                 <span className="text-primary">f</span>
//               </a>
//               <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
//                 <span className="text-primary">t</span>
//               </a>
//               <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
//                 <span className="text-primary">in</span>
//               </a>
//               <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
//                 <span className="text-primary">📧</span>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-primary/20 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
//             <div className="text-sm text-primary-foreground/80">
//               © 2024 HAIR RAP BY YOYO. All rights reserved.
//             </div>
//             <div className="flex gap-6">
//               <a href="#" className="text-sm text-primary-foreground/80 hover:text-white transition">
//                 Privacy Policy
//               </a>
//               <a href="#" className="text-sm text-primary-foreground/80 hover:text-white transition">
//                 Terms of Service
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }
