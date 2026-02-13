'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Minimize2, Maximize2, Send, Mic } from 'lucide-react'

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How can I assist you today? 🤗",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const message = userMessage.toLowerCase()
    
    // Booking-related responses
    if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) {
      return {
        text: `I'd be happy to help you book an appointment! 💈\n\nWhat service are you looking for?\n\n• Haircut & Styling\n• Hair Color & Highlights\n• Hair Spa & Treatment\n• Beard Grooming\n• Makeup Services\n\nOr would you like to see all available services first?`,
        quickActions: ['Show All Services', 'Book Haircut', 'Book Hair Color', 'Book Spa Treatment']
      }
    }
    
    // Service-related responses
    if (message.includes('service') || message.includes('price') || message.includes('cost')) {
      return {
        text: `Here are our popular services and prices: 💰\n\n• Basic Haircut - ₹399\n• Premium Haircut - ₹699\n• Hair Color - ₹499\n• Hair Spa - ₹569\n• Makeup - ₹749\n• Nails - ₹459\n\nAll services include expert consultation. Would you like to book any of these?`,
        quickActions: ['Book Haircut', 'Book Hair Color', 'See All Services']
      }
    }
    
    // Time-related responses
    if (message.includes('time') || message.includes('available') || message.includes('when')) {
      return {
        text: `We have flexible timing to suit your schedule! ⏰\n\nAvailable slots:\n• Monday - Saturday: 9 AM to 8 PM\n• Sunday: 10 AM to 6 PM\n\nPopular time slots:\n• Morning: 9 AM - 12 PM\n• Afternoon: 12 PM - 4 PM\n• Evening: 4 PM - 8 PM\n\nWhat time works best for you?`,
        quickActions: ['Book Morning Slot', 'Book Evening Slot', 'Show Available Today']
      }
    }
    
    // Location-related responses
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return {
        text: `We have multiple locations for your convenience! 📍\n\n• Maryland City, MD, USA\n• New Jersey, USA\n• California, USA\n• Texas, USA\n\nWhich location would you prefer? I can show you available slots at each location.`,
        quickActions: ['Maryland Location', 'New Jersey Location', 'All Locations']
      }
    }
    
    // My bookings
    if (message.includes('my booking') || message.includes('my appointment') || message.includes('reschedule')) {
      return {
        text: `You can manage all your bookings in one place! 📅\n\n• View upcoming appointments\n• Reschedule if needed\n• Cancel bookings\n• Booking history\n\nWould you like me to take you to your bookings page?`,
        quickActions: ['View My Bookings', 'Reschedule Booking', 'Cancel Booking']
      }
    }
    
    // Help and support
    if (message.includes('help') || message.includes('support') || message.includes('contact')) {
      return {
        text: `I'm here to help you with anything! 🤝\n\nI can assist with:\n• Booking appointments\n• Service information\n• Pricing and packages\n• Location details\n• Managing bookings\n• General questions\n\nWhat would you like help with?`,
        quickActions: ['Book Appointment', 'Service Info', 'Contact Support']
      }
    }
    
    // Fallback response
    return {
      text: `Thanks for your message! 😊\n\nI'm here to help with:\n• Booking appointments\n• Service information and pricing\n• Available time slots\n• Managing your bookings\n• Location details\n\nCould you please let me know what specific information you need?`,
      quickActions: ['Book Appointment', 'Show Services', 'View My Bookings']
    }
  }

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await generateAIResponse(text)
      const botMessage = {
        id: messages.length + 2,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        quickActions: response.quickActions || []
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment. 🙏",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action) => {
    handleSendMessage(action)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-accent text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:scale-110 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with AI Assistant
        </span>
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-xl border border-gray-200 ${
      isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'
    } transition-all duration-300`}>
      {/* Chat Header */}
      <div className="bg-accent text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs opacity-90">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="h-[480px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-accent text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  
                  {/* Quick Actions */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.quickActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(action)}
                          className="w-full text-left px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-xs transition"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                  }
                }}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="bg-accent text-white p-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Mic className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
