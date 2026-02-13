"use client";

import React from "react";
import Link from "next/link";
import { Star, MapPin, Clock, Users, Heart } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ServiceDetailsPage({ params }) {
  const { id } = React.use(params);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);

  // Sample service data
  const service = {
    id: parseInt(id),
    name: "Hair Color",
    category: "Hair Color",
    price: 499,
    originalPrice: 699,
    location: "Maryland City, MD, USA",
    rating: 4.9,
    reviews: 125,
    duration: 45,
    salon: "Glow & Glam Studio",
    salonRating: 4.8,
    description:
      "Professional hair coloring service with premium products. Our expert colorists will help you achieve the perfect shade while maintaining your hair health.",
    highlights: [
      "Premium quality products",
      "Expert colorists",
      "Hair care consultation",
      "Custom color mixing",
      "Eco-friendly options",
    ],
    image: "/services/salon-1.jpg",
  };

  const availableTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-accent">
            Services
          </Link>
          <span>/</span>
          <span>{service.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Service Image and Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">
                    {service.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-secondary text-secondary" />
                      <span className="font-bold text-primary">
                        {service.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({service.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      {service.location}
                    </div>
                  </div>
                </div>
                <button className="p-3 rounded-full border border-border hover:bg-gray-100 transition">
                  <Heart className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-700 mb-6">{service.description}</p>

              {/* Service Highlights */}
              <div className="grid grid-cols-2 gap-4">
                {service.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Salon Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary mb-4">
                About Salon
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {service.salon.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">
                    {service.salon}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="text-sm font-bold">
                      {service.salonRating}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Professional hair and beauty salon with experienced staff
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* Price Section */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="text-3xl font-bold text-primary mb-2">
                  ₹{service.price}
                </div>
                <div className="text-sm text-muted-foreground line-through">
                  ₹{service.originalPrice}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-foreground">
                    {service.duration} minutes
                  </span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="font-bold text-primary mb-3">Select Date</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[0, 1, 2, 3, 4, 5].map((offset) => {
                    const date = new Date();
                    date.setDate(date.getDate() + offset);
                    const dateStr = date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                    return (
                      <button
                        key={offset}
                        onClick={() => setSelectedDate(offset)}
                        className={`py-2 px-3 rounded-lg border transition font-medium text-sm ${
                          selectedDate === offset
                            ? "bg-accent text-white border-accent"
                            : "border-border text-foreground hover:border-accent"
                        }`}
                      >
                        {dateStr}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate !== null && (
                <div className="mb-6">
                  <h3 className="font-bold text-primary mb-3">Select Time</h3>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-2 rounded-lg border transition font-medium text-xs ${
                          selectedTime === time
                            ? "bg-accent text-white border-accent"
                            : "border-border text-foreground hover:border-accent"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Now Button */}
              <Link href={`/booking/${service.id}`}>
                <button className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                  Book Now
                </button>
              </Link>

              <button className="w-full mt-3 border border-accent text-accent py-3 rounded-lg font-bold hover:bg-accent hover:text-white transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// "use client";

// import React from "react";
// import Link from "next/link";
// import { Star, MapPin, Clock, Users, Heart } from "lucide-react";
// import Header from "@/components/header";
// import Footer from "@/components/footer";

// export default function ServiceDetailsPage({ params }) {
//   const { id } = React.use(params);
//   const [selectedDate, setSelectedDate] = React.useState(null);
//   const [selectedTime, setSelectedTime] = React.useState(null);

//   // Sample service data
//   const service = {
//     id: parseInt(id),
//     name: "Hair Color",
//     category: "Hair Color",
//     price: 499,
//     originalPrice: 699,
//     location: "Maryland City, MD, USA",
//     rating: 4.9,
//     reviews: 125,
//     duration: 45,
//     salon: "Glow & Glam Studio",
//     salonRating: 4.8,
//     description:
//       "Professional hair coloring service with premium products. Our expert colorists will help you achieve the perfect shade while maintaining your hair health.",
//     highlights: [
//       "Premium quality products",
//       "Expert colorists",
//       "Hair care consultation",
//       "Custom color mixing",
//       "Eco-friendly options",
//     ],
//     image: "/services/salon-1.jpg",
//   };

//   const availableTimes = [
//     "09:00",
//     "09:30",
//     "10:00",
//     "10:30",
//     "11:00",
//     "11:30",
//     "14:00",
//     "14:30",
//     "15:00",
//     "15:30",
//     "16:00",
//     "16:30",
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
//           <Link href="/" className="hover:text-accent">
//             Home
//           </Link>
//           <span>/</span>
//           <Link href="/services" className="hover:text-accent">
//             Services
//           </Link>
//           <span>/</span>
//           <span>{service.name}</span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left - Service Image and Details */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
//               <img
//                 src={service.image}
//                 alt={service.name}
//                 className="w-full h-96 object-cover"
//               />
//             </div>

//             {/* Service Info */}
//             <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h1 className="text-3xl font-bold text-primary mb-2">
//                     {service.name}
//                   </h1>
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <Star className="w-5 h-5 fill-secondary text-secondary" />
//                       <span className="font-bold text-primary">
//                         {service.rating}
//                       </span>
//                       <span className="text-muted-foreground">
//                         ({service.reviews} reviews)
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <MapPin className="w-5 h-5" />
//                       {service.location}
//                     </div>
//                   </div>
//                 </div>
//                 <button className="p-3 rounded-full border border-border hover:bg-gray-100 transition">
//                   <Heart className="w-6 h-6 text-gray-400" />
//                 </button>
//               </div>

//               <p className="text-gray-700 mb-6">{service.description}</p>

//               {/* Service Highlights */}
//               <div className="grid grid-cols-2 gap-4">
//                 {service.highlights.map((highlight, idx) => (
//                   <div key={idx} className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-accent rounded-full"></div>
//                     <span className="text-sm text-foreground">{highlight}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Salon Info */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-xl font-bold text-primary mb-4">
//                 About Salon
//               </h2>
//               <div className="flex items-start gap-4">
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
//                   {service.salon.charAt(0)}
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-primary mb-1">
//                     {service.salon}
//                   </h3>
//                   <div className="flex items-center gap-2 mb-2">
//                     <Star className="w-4 h-4 fill-secondary text-secondary" />
//                     <span className="text-sm font-bold">
//                       {service.salonRating}
//                     </span>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     Professional hair and beauty salon with experienced staff
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right - Booking Section */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
//               {/* Price Section */}
//               <div className="mb-6 pb-6 border-b border-border">
//                 <div className="text-3xl font-bold text-primary mb-2">
//                   ₹{service.price}
//                 </div>
//                 <div className="text-sm text-muted-foreground line-through">
//                   ₹{service.originalPrice}
//                 </div>
//                 <div className="mt-2 flex items-center gap-2 text-sm">
//                   <Clock className="w-4 h-4 text-accent" />
//                   <span className="text-foreground">
//                     {service.duration} minutes
//                   </span>
//                 </div>
//               </div>

//               {/* Date Selection */}
//               <div className="mb-6">
//                 <h3 className="font-bold text-primary mb-3">Select Date</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {[0, 1, 2, 3, 4, 5].map((offset) => {
//                     const date = new Date();
//                     date.setDate(date.getDate() + offset);
//                     const dateStr = date.toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                     });
//                     return (
//                       <button
//                         key={offset}
//                         onClick={() => setSelectedDate(offset)}
//                         className={`py-2 px-3 rounded-lg border transition font-medium text-sm ${
//                           selectedDate === offset
//                             ? "bg-accent text-white border-accent"
//                             : "border-border text-foreground hover:border-accent"
//                         }`}
//                       >
//                         {dateStr}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Time Selection */}
//               {selectedDate !== null && (
//                 <div className="mb-6">
//                   <h3 className="font-bold text-primary mb-3">Select Time</h3>
//                   <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
//                     {availableTimes.map((time) => (
//                       <button
//                         key={time}
//                         onClick={() => setSelectedTime(time)}
//                         className={`py-2 px-2 rounded-lg border transition font-medium text-xs ${
//                           selectedTime === time
//                             ? "bg-accent text-white border-accent"
//                             : "border-border text-foreground hover:border-accent"
//                         }`}
//                       >
//                         {time}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Book Now Button */}
//               <Link
//                 href={`/booking/confirm?serviceId=${service.id}&date=${selectedDate}&time=${selectedTime}`}
//               >
//                 <button
//                   disabled={selectedDate === null || selectedTime === null}
//                   className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Book Now
//                 </button>
//               </Link>

//               <button className="w-full mt-3 border border-accent text-accent py-3 rounded-lg font-bold hover:bg-accent hover:text-white transition">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
