import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react'

export const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi there! 👋 I'm the Primetech AI Assistant. How can I help you today? (e.g., 'What are your hours?', 'Where are you located?', 'I need an oil change')"
    }
  ])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: Date.now(), sender: 'user', text: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.text)
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponse }])
    }, 600)
  }

  const generateAIResponse = (text) => {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('hour') || lowerText.includes('time') || lowerText.includes('open') || lowerText.includes('close')) {
      return "We are open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 9:00 AM to 4:00 PM. We are closed on Sundays! 🕒"
    }
    
    if (lowerText.includes('where') || lowerText.includes('location') || lowerText.includes('address')) {
      return "We are located at 336 Hilton Drive, Stoney Creek, ON L8E 2N3. Come on by! 📍"
    }

    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('how much')) {
      return "Our pricing depends on your vehicle and the specific service needed. For example, oil changes start at $49.99. I recommend booking an appointment or calling us at +1 (289) 834-2838 for an accurate quote! 💵"
    }

    if (lowerText.includes('book') || lowerText.includes('appointment') || lowerText.includes('schedule')) {
      return "You can book an appointment right here on our website! Just click the 'Book Appointment' button at the top of the page, or scroll down to our booking form. 📅"
    }

    if (lowerText.includes('phone') || lowerText.includes('call') || lowerText.includes('number')) {
      return "You can reach us directly at +1 (289) 834-2838! 📞"
    }

    if (lowerText.includes('service') || lowerText.includes('oil') || lowerText.includes('brake') || lowerText.includes('tire') || lowerText.includes('engine')) {
      return "We offer a wide range of services including Oil Changes, Brake Repair, Tire Replacements, Engine Diagnostics, and more! You can see our full list in the Services section above. 🔧"
    }

    // Default fallback
    return "I'm still learning, but I can help you with our hours, location, contact info, and booking an appointment! For complex questions, please call us at +1 (289) 834-2838. 🚗"
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[320px] sm:w-[380px] h-[500px] max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            {/* Header */}
            <div className="bg-card border-b border-border p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center relative">
                  <Bot className="w-6 h-6 text-secondary" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground leading-none">Primetech AI</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-secondary" /> Always here to help
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm font-body ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                        : 'bg-card border border-border text-foreground rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4 ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors relative ${
          isOpen ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground'
        }`}
        style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-6 h-6 fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-background animate-pulse"></span>
        )}
      </motion.button>
    </div>
  )
}
