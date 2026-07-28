import { useState } from 'react'
import { HiChatAlt2, HiMail, HiSearch, HiCheck, HiUser } from 'react-icons/hi'

const MOCK_INQUIRIES = [
  {
    id: 'inq-1',
    buyerName: 'Abebe Bikila',
    buyerEmail: 'abebe@example.com',
    buyerPhone: '+251 911 234 567',
    listingTitle: 'Facebook Page — 50K Followers (Ethiopia)',
    message: 'Hello, I am interested in buying this Facebook page for my retail business. Can we verify stats over Telegram?',
    sentAt: '2 hours ago',
    unread: true,
  },
  {
    id: 'inq-2',
    buyerName: 'Sara Yonas',
    buyerEmail: 'sara@example.com',
    buyerPhone: '+251 922 889 900',
    listingTitle: 'Professional Logo Design Package',
    message: 'Hi! Do you support Amharic calligraphy logos in your design package?',
    sentAt: '1 day ago',
    unread: false,
  },
  {
    id: 'inq-3',
    buyerName: 'Dawit Solomon',
    buyerEmail: 'dawit@example.com',
    listingTitle: 'YouTube Channel — 10K Subscribers + Monetized',
    message: 'What is the current monthly revenue of this channel? Please send AdSense screenshot proof.',
    sentAt: '3 days ago',
    unread: false,
  },
]

export default function MessagesPage() {
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES)
  const [selectedId, setSelectedId] = useState<string>(MOCK_INQUIRIES[0].id)
  const [replyText, setReplyText] = useState('')

  const activeInquiry = inquiries.find((i) => i.id === selectedId) || inquiries[0]

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setInquiries(
      inquiries.map((i) => (i.id === id ? { ...i, unread: false } : i))
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-light-text dark:text-dark-text flex items-center gap-2">
          <HiChatAlt2 className="text-primary-500" /> Buyer Inquiries & Messages
        </h1>
        <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
          Direct messages and offers received from potential marketplace buyers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start h-[600px] rounded-3xl overflow-hidden glass-card border border-light-border dark:border-dark-border">
        {/* Inbox List */}
        <div className="lg:col-span-1 border-r border-light-border dark:border-dark-border h-full flex flex-col">
          <div className="p-4 border-b border-light-border dark:border-dark-border">
            <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text uppercase tracking-wider">
              Inbox ({inquiries.filter((i) => i.unread).length} Unread)
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-light-border dark:divide-dark-border/40">
            {inquiries.map((inq) => (
              <button
                key={inq.id}
                onClick={() => handleSelect(inq.id)}
                className={`w-full text-left p-4 transition-colors flex items-start gap-3 ${
                  selectedId === inq.id
                    ? 'bg-primary-500/10'
                    : inq.unread
                    ? 'bg-secondary-500/5'
                    : 'hover:bg-light-border/20 dark:hover:bg-dark-border/20'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold shrink-0">
                  {inq.buyerName[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-light-text dark:text-dark-text truncate">
                      {inq.buyerName}
                    </span>
                    <span className="text-[10px] text-light-muted dark:text-dark-muted shrink-0">
                      {inq.sentAt}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-500 font-semibold truncate mt-0.5">
                    {inq.listingTitle}
                  </p>
                  <p className="text-xs text-light-muted dark:text-dark-muted truncate mt-1">
                    {inq.message}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Details Panel */}
        <div className="lg:col-span-2 h-full flex flex-col p-6">
          {activeInquiry ? (
            <>
              {/* Header */}
              <div className="pb-4 border-b border-light-border dark:border-dark-border mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text">
                      {activeInquiry.buyerName}
                    </h3>
                    <p className="text-xs text-light-muted dark:text-dark-muted">
                      {activeInquiry.buyerEmail} {activeInquiry.buyerPhone && `• ${activeInquiry.buyerPhone}`}
                    </p>
                  </div>
                  <span className="badge-secondary badge text-xs">
                    {activeInquiry.sentAt}
                  </span>
                </div>
                <div className="mt-3 p-2.5 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-xs">
                  <span className="text-light-muted dark:text-dark-muted">Re Listing:</span>{' '}
                  <strong className="text-light-text dark:text-dark-text">{activeInquiry.listingTitle}</strong>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border max-w-xl">
                  <p className="text-sm text-light-text dark:text-dark-text leading-relaxed">
                    {activeInquiry.message}
                  </p>
                </div>
              </div>

              {/* Reply Box */}
              <div className="pt-4 border-t border-light-border dark:border-dark-border space-y-3">
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response email / message..."
                  className="input resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setReplyText('')}
                    className="btn-primary btn-sm"
                  >
                    Send Response
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-light-muted">
              Select an inquiry to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
