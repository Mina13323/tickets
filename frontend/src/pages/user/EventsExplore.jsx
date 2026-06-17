import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Calendar, X, Filter, ChevronDown, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEvents } from '@/hooks/useEvents';

const CATEGORIES = ['All', 'Cultural', 'Music', 'Cinema', 'Adventure', 'Art'];
const CITIES = ['All', 'Cairo', 'Alexandria', 'Luxor', 'Aswan', 'Gouna'];
const ORGANIZERS = ['All', 'EventHub Originals', 'Cairo Jazz Club', 'GFF', 'Opera House'];

export default function EventsExplore() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    city: 'All',
    organizer: 'All',
    date: ''
  });

  // Fetch events
  const { data: events, isLoading } = useEvents();

  // Basic client-side filtering since API might not have all filters implemented yet
  const filteredEvents = events?.filter(event => {
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.category !== 'All' && !event.category?.includes(filters.category)) return true; // mocking as we might not have category in db
    if (filters.city !== 'All' && !event.location?.includes(filters.city)) return false;
    return true;
  }) || [];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-32 pb-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-egyptian-gold/10 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">Discover Egypt</h1>
            <p className="text-white/60 font-light text-lg">Find your next unforgettable experience.</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input 
                type="text" 
                placeholder="Search experiences..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-egyptian-gold/50 transition-colors"
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="bg-[#0a0a0a] border border-white/10 p-3 rounded-full hover:border-egyptian-gold hover:text-egyptian-gold transition-colors flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-[#0a0a0a] h-[400px] rounded-2xl animate-pulse"></div>
            ))
          ) : filteredEvents.length === 0 ? (
            <div className="col-span-full py-24 text-center border border-white/10 rounded-2xl bg-black/40">
              <Compass className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-2xl font-heading text-white">No experiences found</h3>
              <p className="text-white/50">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            filteredEvents.map(event => (
              <Link to={`/events/${event.id}`} key={event.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-egyptian-gold/30 transition-all duration-500 h-[450px]"
                >
                  <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                       style={{ backgroundImage: `url(${event.image_url || 'https://images.unsplash.com/photo-1539650116574-8efeb43e2b50?q=80&w=1000'})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/40 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-egyptian-gold" />
                    <span className="text-xs font-mono text-white">{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 text-white/60 mb-2 text-sm">
                      <MapPin className="w-4 h-4 text-egyptian-gold" />
                      {event.location}
                    </div>
                    <h3 className="text-2xl font-heading text-white mb-2 group-hover:text-egyptian-gold transition-colors">{event.title}</h3>
                    <p className="text-sm text-white/50 line-clamp-2">{event.description}</p>
                    
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs font-mono tracking-widest uppercase text-egyptian-gold flex items-center gap-2">
                      View Details <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Advanced Filter Drawer (Glassmorphism) */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            ></motion.div>
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-heading text-white flex items-center gap-2">
                    <Filter className="w-6 h-6 text-egyptian-gold" /> Filter Journeys
                  </h2>
                  <button onClick={() => setIsFilterOpen(false)} className="text-white/50 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Category */}
                  <div>
                    <label className="text-xs font-mono tracking-widest text-white/50 uppercase block mb-3">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map(cat => (
                        <button 
                          key={cat}
                          onClick={() => setFilters({...filters, category: cat})}
                          className={`px-4 py-2 rounded-full text-sm transition-all border ${filters.category === cat ? 'bg-egyptian-gold text-deep-charcoal border-egyptian-gold font-bold' : 'bg-transparent border-white/10 text-white hover:border-egyptian-gold/50'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-xs font-mono tracking-widest text-white/50 uppercase block mb-3">City / Region</label>
                    <div className="relative">
                      <select 
                        value={filters.city}
                        onChange={(e) => setFilters({...filters, city: e.target.value})}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:border-egyptian-gold/50"
                      >
                        {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  {/* Organizer */}
                  <div>
                    <label className="text-xs font-mono tracking-widest text-white/50 uppercase block mb-3">Visionary / Organizer</label>
                    <div className="relative">
                      <select 
                        value={filters.organizer}
                        onChange={(e) => setFilters({...filters, organizer: e.target.value})}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:border-egyptian-gold/50"
                      >
                        {ORGANIZERS.map(org => <option key={org} value={org}>{org}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-8 border-t border-white/10 flex gap-4">
                    <button 
                      onClick={() => setFilters({ category: 'All', city: 'All', organizer: 'All', date: '' })}
                      className="w-1/3 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-mono tracking-widest uppercase text-xs font-bold"
                    >
                      Reset
                    </button>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="w-2/3 py-4 rounded-xl bg-egyptian-gold text-deep-charcoal font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
