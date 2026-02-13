"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../../../../components/ui/Input";

export default function BookingConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params.id;
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");

  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const service = {
    id,
    name: "Hair Color",
    price: 499,
    originalPrice: 699,
    duration: 45,
    salon: "Glow & Glam Studio",
    location: "Maryland City, MD, USA",
    rating: 4.9,
    image: "/services/salon-1.jpg",
  };

  const getDateString = () => {
    if (!selectedDate) return "";
    const date = new Date(selectedDate);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill in all required fields");
      return;
    }
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground mb-8">
              Your appointment has been successfully booked. A confirmation
              email will be sent to you shortly.
            </p>

            <Card className="p-8 bg-white mb-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 text-center mb-6">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-primary">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.salon}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-bold text-primary flex items-center gap-2 justify-center">
                      <Calendar className="w-4 h-4" />
                      {getDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                    <p className="font-bold text-primary flex items-center gap-2 justify-center">
                      <Clock className="w-4 h-4" />
                      {selectedTime}
                    </p>
                  </div>
                </div>

                <div className="py-4 flex items-center flex-col">
                  <p className="text-sm text-center flex items-center gap-1 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </p>
                  <p className="font-semibold text-primary flex items-center gap-2">
                    {service.location}
                  </p>
                </div>

                <div className="text-right pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    ₹{service.price}
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-2">
              <Link href="/my-bookings">
                <Button className="w-full bg-accent text-white hover:bg-accent/90 font-bold py-3">
                  View My Bookings
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="w-full border border-accent text-accent hover:bg-accent/90 hover:text-white font-bold py-3"
                >
                  Book Another Service
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Confirm Your Booking
          </h1>
          <p className="text-muted-foreground">
            Please provide your details to complete the booking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Details */}
                <div className="pb-6 border-b border-border">
                  <h2 className="text-lg font-bold text-primary mb-4">
                    Service Details
                  </h2>
                  <div className="flex gap-4">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-primary">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.salon}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {getDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Details */}
                <div>
                  <h2 className="text-lg font-bold text-primary mb-4">
                    Your Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName" className="text-primary">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-primary">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="email" className="text-primary">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="phone" className="text-primary">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2 justify-start">
                    <label htmlFor="notes" className="text-primary">
                      Special Notes or Requests
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special requests for your appointment..."
                      rows="4"
                      width={100}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent text-white hover:bg-accent/90 font-bold py-3"
                >
                  Confirm Booking
                </Button>
              </form>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 w-96 bg-white sticky top-24">
              <h3 className="font-bold text-lg text-primary mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-semibold text-primary">
                    {service.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-primary">
                    {service.duration} min
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold text-primary">
                    {getDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-semibold text-primary">
                    {selectedTime}
                  </span>
                </div>
              </div>

              <div className="my-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-semibold text-primary">
                    ₹{service.price}
                  </span>
                </div>
                <div className="flex justify-between text-accent text-sm">
                  <span>Discount (29%)</span>
                  <span>-₹{service.originalPrice - service.price}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">Total</span>
                  <span className="text-2xl font-bold text-accent">
                    ₹{service.price}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
