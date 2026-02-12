'use client'

import { useState } from 'react'
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react'
import Link from 'next/link'

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Link
          href="/chat"
          className="fixed bottom-6 right-6 z-50 bg-accent text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Link>
      )}

      {/* Chat Window */}
      {isOpen && (
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
              <div className="p-4 h-[480px] overflow-y-auto">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageCircle className="w-12 h-12 text-gray-300 mb-4" />
                  <h4 className="font-semibold text-gray-700 mb-2">Chat with AI Assistant</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Get help with bookings, services, and more
                  </p>
                  <Link
                    href="/chat"
                    onClick={() => setIsOpen(false)}
                    className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-sm font-medium"
                  >
                    Open Full Chat
                  </Link>
                </div>
              </div>
              
              {/* Quick Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    readOnly
                    onClick={() => {
                      setIsOpen(false)
                      window.location.href = '/chat'
                    }}
                  />
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      window.location.href = '/chat'
                    }}
                    className="bg-accent text-white p-2 rounded-lg hover:bg-opacity-90 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
