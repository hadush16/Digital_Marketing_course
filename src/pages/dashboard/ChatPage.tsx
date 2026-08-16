import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HiChatAlt2, HiPaperAirplane, HiUser } from 'react-icons/hi'
import { useAuth } from '@/hooks/useAuth'
import api from '@/services/api'
import { Link } from 'react-router-dom'

interface Message {
  id: string
  content: string
  senderId: string
  sender: { id: string; name: string; avatar: string | null }
  createdAt: string
}

interface Conversation {
  id: string
  participants: { id: string; name: string; avatar: string | null }[]
  messages: Message[]
}

export default function ChatPage() {
  const { isAuthenticated, user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConv, setActiveConv] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isAuthenticated) return
    fetchConversations()
  }, [isAuthenticated])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchConversations = async () => {
    try {
      const res = await api.get('/chat/conversations')
      setConversations(res.data?.data ?? [])
    } catch {
      setConversations([])
    } finally {
      setLoading(false)
    }
  }

  const openConversation = async (conv: Conversation) => {
    setActiveConv(conv)
    try {
      const res = await api.get(`/chat/conversations/${conv.id}/messages`)
      setMessages(res.data?.data ?? [])
    } catch {
      setMessages([])
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || !activeConv) return
    const content = input.trim()
    setInput('')
    try {
      const res = await api.post(`/chat/conversations/${activeConv.id}/messages`, { content })
      setMessages((prev) => [...prev, res.data.data])
    } catch {
      // Optionally show error
    }
  }

  const getOtherParticipant = (conv: Conversation) =>
    conv.participants.find((p) => p.id !== user?.id) ?? conv.participants[0]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="text-center">
          <HiChatAlt2 className="w-16 h-16 mx-auto text-light-muted dark:text-dark-muted opacity-40 mb-4" />
          <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">Sign in to access messages</h2>
          <Link to="/login" className="btn-primary btn-sm mt-4 inline-block">Sign In</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Messages — Ryoit</title>
        <meta name="description" content="Chat with sellers, instructors, and the Ryoit team through your messages inbox." />
      </Helmet>

      <div className="py-8 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom">
          <h1 className="text-3xl font-display font-bold text-light-text dark:text-dark-text flex items-center gap-3 mb-8">
            <HiChatAlt2 className="w-8 h-8 text-primary-500" />
            Messages
          </h1>

          <div className="glass-card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[600px]">
            {/* Sidebar */}
            <div className="border-r border-light-border dark:border-dark-border overflow-y-auto">
              <div className="p-4 border-b border-light-border dark:border-dark-border">
                <p className="text-sm font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">
                  Conversations
                </p>
              </div>

              {loading ? (
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-light-border dark:bg-dark-border" />
                      <div className="flex-1">
                        <div className="h-3 bg-light-border dark:bg-dark-border rounded w-2/3 mb-2" />
                        <div className="h-2 bg-light-border dark:bg-dark-border rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center text-light-muted dark:text-dark-muted text-sm">
                  No conversations yet
                </div>
              ) : (
                conversations.map((conv) => {
                  const other = getOtherParticipant(conv)
                  const isActive = activeConv?.id === conv.id
                  return (
                    <button
                      key={conv.id}
                      id={`conv-${conv.id}`}
                      onClick={() => openConversation(conv)}
                      className={`w-full flex items-center gap-3 p-4 text-left hover:bg-light-border/30 dark:hover:bg-dark-border/30 transition-colors ${
                        isActive ? 'bg-primary-500/10 border-r-2 border-primary-500' : ''
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 text-white font-bold text-sm uppercase">
                        {other?.avatar ? (
                          <img src={other.avatar} alt={other.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          other?.name?.[0] ?? <HiUser className="w-5 h-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-light-text dark:text-dark-text truncate">{other?.name}</p>
                        <p className="text-xs text-light-muted dark:text-dark-muted truncate">
                          {conv.messages[0]?.content ?? 'No messages yet'}
                        </p>
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col">
              {activeConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-light-border dark:border-dark-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                      {getOtherParticipant(activeConv)?.name?.[0] ?? '?'}
                    </div>
                    <p className="font-semibold text-light-text dark:text-dark-text">
                      {getOtherParticipant(activeConv)?.name}
                    </p>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => {
                      const isMine = msg.senderId === user?.id
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm ${
                              isMine
                                ? 'bg-primary-500 text-white rounded-br-none'
                                : 'bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text rounded-bl-none'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </motion.div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-light-border dark:border-dark-border flex items-center gap-3">
                    <input
                      id="chat-message-input"
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 rounded-xl bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      id="chat-send-btn"
                      disabled={!input.trim()}
                      className="w-11 h-11 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-50 transition-colors flex items-center justify-center text-white"
                    >
                      <HiPaperAirplane className="w-5 h-5 rotate-90" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-8">
                  <div>
                    <HiChatAlt2 className="w-16 h-16 mx-auto text-light-muted dark:text-dark-muted opacity-30 mb-4" />
                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-light-muted dark:text-dark-muted text-sm">
                      Choose a conversation from the sidebar to start messaging.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
