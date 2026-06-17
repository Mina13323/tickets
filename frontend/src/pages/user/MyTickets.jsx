import { useMyBookings } from '@/hooks/useBookings';
import { ErrorState } from '@/components/common/ErrorState';
import { Loader2, Calendar, MapPin, Compass, Award, Download, Map, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '@/store/authStore';
import { useState } from 'react';

export default function MyTickets() {
  const { data: bookings, isLoading, isError, refetch } = useMyBookings();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('stamps'); // 'stamps' | 'upcoming'

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="w-10 h-10 animate-spin text-egyptian-gold" />
      </div>
    );
  }

  if (isError) {
    return <div className="pt-24"><ErrorState message="Failed to load your passport" onRetry={refetch} /></div>;
  }

  const pastBookings = bookings?.filter(b => new Date(b.event_date) < new Date()) || [];
  const upcomingBookings = bookings?.filter(b => new Date(b.event_date) >= new Date()) || [];

  // Derived Stats
  const citiesExplored = new Set(pastBookings.map(b => b.venue_name?.split(',')[1]?.trim() || 'Cairo')).size;
  const eventsAttended = pastBookings.length;
  const categoriesExperienced = new Set(pastBookings.map(b => b.event_id)).size; // mock category count
  const completionPercent = Math.min(100, Math.round((eventsAttended / 10) * 100)); // 10 events = 100%

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-32 pb-32 text-white font-sans relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Passport Profile Section */}
        <div className="bg-[#0a0a0a] border-2 border-white/10 rounded-3xl p-8 md:p-12 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Subtle passport pattern background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-egyptian-gold to-transparent"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative z-10">
            {/* Avatar / Seal */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-egyptian-gold/30 bg-[#0a0a0a] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <span className="text-4xl font-heading text-egyptian-gold">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-egyptian-gold text-deep-charcoal w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#111] shadow-lg transform rotate-12">
                <Compass className="w-6 h-6" />
              </div>
            </div>

            {/* Profile Info & Stats */}
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
                <div>
                  <h3 className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-2">Official Document</h3>
                  <h1 className="text-4xl font-heading font-bold text-white mb-1">Experience Passport</h1>
                  <p className="text-white/60 font-light text-lg">Issued to {user?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono tracking-widest text-white/40 uppercase mb-2">Passport ID</p>
                  <p className="font-mono text-xl text-white tracking-widest bg-black/40 px-4 py-2 rounded-lg border border-white/10">
                    EH-{user?.id?.toString().padStart(6, '0') || '001024'}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/10 pt-8">
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center md:text-left">
                  <p className="text-2xl font-bold text-white mb-1">{eventsAttended}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-white/50 uppercase">
                    <Ticket className="w-3 h-3 text-egyptian-gold" /> Events Attended
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center md:text-left">
                  <p className="text-2xl font-bold text-white mb-1">{citiesExplored}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-white/50 uppercase">
                    <Map className="w-3 h-3 text-egyptian-gold" /> Cities Explored
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center md:text-left">
                  <p className="text-2xl font-bold text-white mb-1">{categoriesExperienced}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-white/50 uppercase">
                    <Award className="w-3 h-3 text-egyptian-gold" /> Categories
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center md:text-left relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 h-1 bg-egyptian-gold/30 w-full"></div>
                  <div className="absolute bottom-0 left-0 h-1 bg-egyptian-gold transition-all duration-1000" style={{ width: `${completionPercent}%` }}></div>
                  <p className="text-2xl font-bold text-white mb-1">{completionPercent}%</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-white/50 uppercase">
                    Journey Status
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passport Pages Tabs */}
        <div className="flex items-center justify-center gap-8 border-b border-white/10 mb-12">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 text-lg font-heading tracking-widest uppercase transition-colors relative ${activeTab === 'upcoming' ? 'text-egyptian-gold' : 'text-white/50 hover:text-white'}`}
          >
            Upcoming Journeys
            {activeTab === 'upcoming' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-egyptian-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"></motion.div>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('stamps')}
            className={`pb-4 text-lg font-heading tracking-widest uppercase transition-colors relative ${activeTab === 'stamps' ? 'text-egyptian-gold' : 'text-white/50 hover:text-white'}`}
          >
            Collected Stamps
            {activeTab === 'stamps' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-egyptian-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"></motion.div>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'upcoming' && (
            <motion.div 
              key="upcoming"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-24 bg-[#0a0a0a] border border-dashed border-white/10 rounded-2xl">
                  <Compass className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-xl font-heading text-white mb-2">No upcoming journeys</p>
                  <p className="text-white/50">Your next adventure awaits discovery.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="relative flex bg-[#0a0a0a] rounded-2xl border-2 border-white/10 overflow-hidden group shadow-xl">
                      {/* Left stub */}
                      <div className="w-1/3 bg-black/40 p-6 flex flex-col justify-between border-r-2 border-dashed border-white/10 relative">
                        <div className="absolute top-0 right-0 w-4 h-4 bg-[#0a0a0a] rounded-full translate-x-1/2 -translate-y-1/2 border-b-2 border-l-2 border-white/10"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#0a0a0a] rounded-full translate-x-1/2 translate-y-1/2 border-t-2 border-l-2 border-white/10"></div>
                        
                        <div>
                          <p className="text-[10px] text-egyptian-gold uppercase tracking-widest font-mono mb-1">Ticket No.</p>
                          <p className="font-mono text-sm text-white">{booking.id.substring(0, 8).toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono mb-1">Passes</p>
                          <p className="text-3xl font-heading font-bold text-white">{booking.quantity}</p>
                        </div>
                      </div>

                      {/* Right Main */}
                      <div className="w-2/3 p-8 relative">
                        <div className="absolute top-4 right-4 bg-egyptian-gold/10 text-egyptian-gold px-3 py-1 rounded border border-egyptian-gold/20 text-[10px] uppercase tracking-widest font-mono">
                          {booking.status}
                        </div>
                        
                        <h4 className="text-2xl font-heading font-bold text-white mb-6 pr-12 leading-tight">
                          {booking.event_title}
                        </h4>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono mb-1">Date & Time</p>
                            <p className="text-sm text-white flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-egyptian-gold" />
                              {new Date(booking.event_date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono mb-1">Location</p>
                            <p className="text-sm text-white flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-egyptian-gold" />
                              {booking.venue_name || 'TBA'}
                            </p>
                          </div>
                        </div>

                        {/* Hover actions */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <button className="bg-egyptian-gold text-deep-charcoal px-6 py-2 rounded font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white transition-colors">
                            <Download className="w-4 h-4" /> Download PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'stamps' && (
            <motion.div 
              key="stamps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {pastBookings.length === 0 ? (
                <div className="text-center py-24 bg-[#0a0a0a] border border-dashed border-white/10 rounded-2xl">
                  <Award className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-xl font-heading text-white mb-2">Your passport pages are empty</p>
                  <p className="text-white/50">Stamps will appear here after you attend experiences.</p>
                </div>
              ) : (
                <div className="bg-[#e8dac1] rounded-lg p-12 md:p-24 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  {/* Paper texture */}
                  <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16 relative z-10">
                    {pastBookings.map((booking, idx) => (
                      <motion.div 
                        key={booking.id}
                        initial={{ opacity: 0, scale: 2, rotate: -30 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: (idx % 2 === 0 ? -15 : 10) }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', damping: 15, delay: idx * 0.1 }}
                        className="relative"
                      >
                        {/* The Stamp */}
                        <div className="border-[4px] border-[#8a2be2] text-[#8a2be2] mix-blend-multiply opacity-80 p-4 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center shadow-inner relative">
                          {/* Inner circle */}
                          <div className="absolute inset-2 border-[2px] border-[#8a2be2] rounded-full border-dashed"></div>
                          
                          <Compass className="w-6 h-6 mb-1 opacity-70" />
                          <span className="font-heading font-bold text-[10px] leading-tight uppercase tracking-widest line-clamp-2 px-2">
                            {booking.event_title}
                          </span>
                          <span className="text-[9px] font-mono mt-2 border-t border-[#8a2be2] pt-1">
                            {new Date(booking.event_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                          
                          {/* Grungy overlay effect for the stamp ink */}
                          <div className="absolute inset-0 bg-white/20 rounded-full mix-blend-overlay"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
