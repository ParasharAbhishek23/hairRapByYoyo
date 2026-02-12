'use client'

import React from "react"

import { useState, useRef, useEffect } from 'react'
import { Send, Plus, MessageSquare, Clock, User, Bot, Calendar, CreditCard } from 'lucide-react'
import Footer from './footer'
import { api } from '@/lib/api'
import { ChatMessage } from '@/lib/api'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isLoading?: boolean
}

interface Suggestion {
  id: string
  icon?: React.ReactNode
  label: string
  description: string
  action?: string
}

const SUGGESTIONS: Suggestion[] = [
  {
    id: '1',
    icon: <Calendar className="w-4 h-4" />,
    label: 'Book an Appointment',
    description: 'Browse services and book your slot',
    action: 'I want to book an appointment'
  },
  {
    id: '2',
    icon: <MessageSquare className="w-4 h-4" />,
    label: 'Service Recommendations',
    description: 'Get personalized service suggestions',
    action: 'Which service should I book?'
  },
  {
    id: '3',
    icon: <Clock className="w-4 h-4" />,
    label: 'Available Time Slots',
    description: 'Check today\'s availability',
    action: 'What slots are available today?'
  },
  {
    id: '4',
    icon: <CreditCard className="w-4 h-4" />,
    label: 'Pricing Information',
    description: 'Service prices and packages',
    action: 'What are your service prices?'
  },
  {
    id: '5',
    icon: <User className="w-4 h-4" />,
    label: 'My Bookings',
    description: 'View or manage your appointments',
    action: 'How do I view my bookings?'
  },
  {
    id: '6',
    icon: <MessageSquare className="w-4 h-4" />,
    label: 'Cancel Booking',
    description: 'Learn how to cancel appointments',
    action: 'How do I cancel my booking?'
  },
]

const CHAT_HISTORY: Suggestion[] = [
  {
    id: '7',
    label: 'Hair Spa Booking',
    description: 'Rejuvenating treatment session',
  },
  {
    id: '8',
    label: 'Haircut Consultation',
    description: 'Style & care advice',
  },
  {
    id: '9',
    label: 'Service Pricing',
    description: 'Cost and duration details',
  },
  {
    id: '10',
    label: 'Appointment Changes',
    description: 'Reschedule or cancel',
  },
  {
    id: '11',
    label: 'Salon Locations',
    description: 'Find nearest salon',
  },
  {
    id: '12',
    label: 'Special Offers',
    description: 'Current deals and packages',
  },
]

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Add loading message
    const loadingMessage: Message = {
      id: Math.random().toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    }
    setMessages(prev => [...prev, loadingMessage])

    try {
      // Call AI API
      const response = await api.sendChatMessage(messageText)
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading)
        return [...filtered, {
          id: Math.random().toString(),
          type: 'assistant',
          content: response,
          timestamp: new Date(),
        }]
      })
    } catch (error) {
      console.error('Error getting AI response:', error)
      // Remove loading message and add error response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading)
        return [...filtered, {
          id: Math.random().toString(),
          type: 'assistant',
          content: 'Sorry, I encountered an error. Please try again or contact support.',
          timestamp: new Date(),
        }]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (suggestion: Suggestion) => {
    if (suggestion.action) {
      handleSendMessage(suggestion.action)
    } else {
      handleSendMessage(suggestion.label)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <p className="text-sm text-muted-foreground mb-8">HAIR RAP BY YOYO - AI Assistant</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Chat History */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-primary">New Chat</h2>
              <button 
                onClick={() => setMessages([])}
                className="p-2 rounded-lg hover:bg-muted transition"
              >
                <Plus className="w-5 h-5 text-primary" />
              </button>
            </div>

            {/* Chat History */}
            <div className="space-y-2 mb-8">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Previous Conversations
              </h3>

              <div className="mb-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Today
                </p>
                <div className="space-y-2">
                  {CHAT_HISTORY.slice(0, 3).map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition truncate"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Yesterday
                </p>
                <div className="space-y-2">
                  {CHAT_HISTORY.slice(3).map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition truncate"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Help Topics
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-accent rounded-lg text-accent font-medium hover:bg-accent hover:text-white transition">
                <Plus className="w-4 h-4" />
                View All Topics
              </button>
            </div>
          </div>

          {/* Right Side - Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="bg-white rounded-xl shadow-sm flex flex-col h-full">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                      <MessageSquare className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      Hello! I'm your AI Assistant
                    </h2>
                    <p className="text-muted-foreground max-w-md mb-6">
                      I can help you book appointments, explore services, check availability, and answer any questions about our salon services.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online and ready to help</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.type === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div className={`flex items-end gap-2 max-w-xs lg:max-w-md ${
                          message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          {message.type === 'assistant' && (
                            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <div
                            className={`px-4 py-2 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-accent text-white rounded-br-none'
                                : 'bg-muted text-foreground rounded-bl-none'
                            }`}
                          >
                            {message.isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            ) : (
                              <p className="text-sm whitespace-pre-wrap">
                                {message.content}
                              </p>
                            )}
                          </div>
                          {message.type === 'user' && (
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions or Input Area */}
              {messages.length === 0 ? (
                <div className="p-6 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion.label}
                        onClick={() => handleQuickAction(suggestion)}
                        className="text-left p-3 border border-border rounded-lg hover:border-accent hover:bg-accent hover:bg-opacity-5 transition"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {suggestion.icon}
                          <p className="font-medium text-primary text-sm">
                            {suggestion.label}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {suggestion.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Input Area */}
              <div className="border-t border-border p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !input.trim()}
                    className="bg-accent text-white p-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
