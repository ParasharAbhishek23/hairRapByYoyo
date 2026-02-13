// import { FloatingChat } from "@/components/floating-chat";
import FloatingChat from "../../components/floating-chat";

export default function ChatLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <FloatingChat />
    </div>
  );
}
