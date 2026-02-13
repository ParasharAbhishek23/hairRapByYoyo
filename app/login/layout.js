import { FloatingChat } from "@/components/floating-chat";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <FloatingChat />
    </div>
  );
}
