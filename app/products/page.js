"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Clock, Star, Package } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span>Products</span>
        </div>

        {/* Coming Soon Content */}
        <div className="text-center py-16">
          <div className="mb-8">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-accent" />
            </div>
            <h1 className="text-5xl font-bold text-primary mb-4">
              Products Coming Soon
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              We're working hard to bring you the best hair care, beard care, and styling products. 
              Stay tuned for our exclusive collection!
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Curated selection of professional-grade products
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Expert Recommended</h3>
              <p className="text-sm text-muted-foreground">
                Products trusted by our salon professionals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Quick shipping to your doorstep
              </p>
            </div>
          </div>

          {/* Notify Me Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Get Notified
            </h2>
            <p className="text-muted-foreground mb-6">
              Be the first to know when our products launch!
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                Notify
              </button>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-12">
            <Link href="/">
              <button className="text-accent hover:text-accent/80 font-medium transition">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
