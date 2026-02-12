export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Product */}
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
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
            <ul className="space-y-2 text-sm text-primary-foreground/80">
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
                  Faq's
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Getting started
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
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h3 className="font-bold text-lg mb-4">For Providers</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-white transition">
                  For Provider
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Other Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Subscribe
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-primary-foreground/80 mb-3">
              Subscribe to get updates on our latest features
            </p>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full px-4 py-2 rounded-lg text-primary placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-secondary rounded-lg" />
            <span className="text-sm text-primary-foreground/80">
              Chat support
            </span>
          </div>

          <p className="text-sm text-primary-foreground/80">
            Copyright © 2025 - All Rights Reserved SalonWala
          </p>

          <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
            <select className="bg-transparent border border-primary-foreground/20 rounded px-2 py-1 hover:border-white transition">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <select className="bg-transparent border border-primary-foreground/20 rounded px-2 py-1 hover:border-white transition">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-center gap-6 text-sm text-primary-foreground/70">
          <a href="#" className="hover:text-white transition">
            Terms and Conditions
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
