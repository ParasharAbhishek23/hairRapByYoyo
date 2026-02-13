import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingChat from "../components/floating-chat";

export const metadata = {
  title: "HAIR RAP BY YOYO - Book Hair Services Online",
  description:
    "Book hair coloring, cutting, styling, and spa services online. Find best salons near you with instant booking and AI assistant.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1d1f2d",
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Header />
        {children}
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
