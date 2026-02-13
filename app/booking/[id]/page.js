"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();

  const params = useParams();
  const id = params.id;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

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
    description: "Professional hair coloring service with expert stylists",
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      router.push(
        `/booking/${id}/confirm?date=${selectedDate}&time=${selectedTime}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">
                Select Date & Time
              </h1>
              <p className="text-muted-foreground">
                Choose your preferred appointment slot
              </p>
            </div>

            {/* Service Preview Card */}
            <Card className="mb-8 p-6 bg-white">
              <div className="flex gap-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-primary">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {service.salon}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {service.duration} minutes
                  </div>
                </div>
              </div>
            </Card>

            {/* Date Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-primary mb-4">
                Select Date
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[0, 1, 2, 3, 4, 5].map((day) => {
                  const date = new Date();
                  date.setDate(date.getDate() + day);
                  const dateStr = date.toISOString().split("T")[0];
                  const dayName = date.toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                  const dayNum = date.getDate();

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-4 rounded-lg border-2 transition ${
                        selectedDate === dateStr
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      <div className="font-semibold text-primary">
                        {dayName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {dayNum}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-4">
                  Select Time
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 transition font-medium text-sm ${
                        selectedTime === time
                          ? "border-accent bg-accent text-white"
                          : "border-border hover:border-accent text-primary"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white sticky top-24">
              <h3 className="font-bold text-lg text-primary mb-4">
                Booking Summary
              </h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-semibold text-primary">
                    {service.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-primary">
                    {service.duration} min
                  </span>
                </div>
                {selectedDate && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-semibold text-primary">
                        {new Date(selectedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-semibold text-primary">
                        {selectedTime || "-"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="text-lg font-bold text-primary">
                    ₹{service.price}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground line-through">
                    ₹{service.originalPrice}
                  </span>
                  <span className="text-accent font-semibold">
                    {Math.round(
                      ((service.originalPrice - service.price) /
                        service.originalPrice) *
                        100,
                    )}
                    % OFF
                  </span>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-accent text-white hover:bg-accent/90 font-bold py-3 disabled:opacity-50"
              >
                Continue
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                You can reschedule or cancel free before 24 hours
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
