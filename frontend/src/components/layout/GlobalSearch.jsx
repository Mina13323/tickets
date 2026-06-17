import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Calendar, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Mock results for now
  const recentSearches = ['Cairo Jazz Fest', 'Giza', 'Music'];
  const trending = ['El Gouna Film Festival', 'Sound & Light Show', 'Bibliotheca Alexandrina'];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center pt-24 px-4 overflow-y-auto"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white hover:text-egyptian-gold transition-colors p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-3xl">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-egyptian-gold" />
              <input 
                type="text" 
                autoFocus
                placeholder="Search experiences, cities, or venues..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/10 text-3xl md:text-5xl font-heading text-white placeholder:text-white/30 focus:outline-none focus:border-egyptian-gold py-6 pl-20 transition-colors"
              />
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {!query ? (
                <>
                  <div>
                    <h3 className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-6">Recent Searches</h3>
                    <ul className="space-y-4">
                      {recentSearches.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/70 hover:text-egyptian-gold cursor-pointer transition-colors group">
                          <Search className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-6">Trending Now</h3>
                    <ul className="space-y-4">
                      {trending.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white hover:text-egyptian-gold cursor-pointer transition-colors group">
                          <Ticket className="w-4 h-4 text-egyptian-gold opacity-50 group-hover:opacity-100" />
                          <span className="text-lg font-bold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="col-span-2">
                  <h3 className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-6">Results for "{query}"</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#0a0a0a] rounded-xl border border-white/10 hover:border-egyptian-gold/50 cursor-pointer flex justify-between items-center group transition-colors">
                       <div>
                         <h4 className="text-xl font-heading text-white group-hover:text-egyptian-gold">Cairo Jazz Festival</h4>
                         <span className="text-sm text-white/50">Music • Cairo</span>
                       </div>
                       <MapPin className="w-5 h-5 text-egyptian-gold/50 group-hover:text-egyptian-gold" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
