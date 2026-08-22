import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, X, Send } from 'lucide-react';

const QA_DATABASE = [
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'help', 'morning', 'afternoon'],
    answer: "Hello! How can we help you with your vehicle today? You can ask about our hours, location, pricing, or specific services."
  },
  {
    keywords: ['hour', 'time', 'open', 'close', 'when'],
    answer: "We are open Monday to Friday from 8:00 AM to 6:00 PM, and Saturday from 8:00 AM to 2:00 PM. Walk-ins are always welcome!"
  },
  {
    keywords: ['location', 'address', 'where', 'map', 'directions'],
    answer: "We are located at 336 Hilton Drive, Stoney Creek, ON L8E 2N3."
  },
  {
    keywords: ['contact', 'phone', 'number', 'call', 'email', 'reach'],
    answer: "You can reach us by phone at +1 (289) 834-2838. We're always happy to help!"
  },
  {
    keywords: ['appointment', 'book', 'schedule'],
    answer: "No appointment is needed! We operate on a first-come, first-served basis. You can just walk in during our regular business hours."
  },
  {
    keywords: ['price', 'cost', 'much', 'oil'],
    answer: "Our full synthetic oil changes start at $79.99, which includes a premium filter and a free 21-point vehicle check."
  },
  {
    keywords: ['tire', 'tyre', 'flat', 'winter', 'summer'],
    answer: "We offer complete tire services including repairs, rotations, seasonal changeovers (starting at $39.99), and brand new tire sales."
  },
  {
    keywords: ['brake', 'pad', 'rotor', 'squeak'],
    answer: "We provide comprehensive brake services, including pad and rotor replacements. We'll do a full inspection and give you an honest quote before any work."
  }
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm the Primetech Auto Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text, isBot: false }]);
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let foundAnswer = "I'm not quite sure about that. Please call us at +1 (289) 834-2838 or visit our shop for more details!";
      
      for (const qa of QA_DATABASE) {
        if (qa.keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(lowerText))) {
          foundAnswer = qa.answer;
          break;
        }
      }
      
      setMessages(prev => [...prev, { text: foundAnswer, isBot: true }]);
    }, 600);
  };

  const predefinedQuestions = [
    "What are your hours?",
    "Where are you located?",
    "Do I need an appointment?",
    "How much is an oil change?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[90vw] sm:w-[350px] bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[500px]"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary-foreground">
                <Car className="w-5 h-5" />
                <span className="font-display font-bold">Primetech Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-black/20 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-zinc-950/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[90%] p-3 rounded-2xl ${msg.isBot ? 'bg-zinc-800 text-zinc-100 rounded-tl-sm' : 'bg-primary text-primary-foreground rounded-tr-sm'}`}>
                    <p className="text-sm font-body leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-3 bg-zinc-900 border-t border-white/5 flex flex-wrap gap-2">
                {predefinedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-left text-xs bg-zinc-800 hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-2 rounded-full text-zinc-300 border border-white/5"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-card border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Type a message..."
                className="flex-1 bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary text-white"
              />
              <button 
                onClick={() => handleSend(input)}
                className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-zinc-900 text-white text-xs font-display tracking-wider font-bold px-3 py-1.5 rounded-full border border-zinc-700 shadow-lg mb-2 mr-1 shadow-primary/20"
          >
            Ask AI
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary/90 text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Car className="w-7 h-7" />}
      </button>
    </div>
  );
};
