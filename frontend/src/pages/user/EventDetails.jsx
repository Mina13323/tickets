import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Calendar, MapPin, Loader2, ArrowRight, Clock, Info, Star, Compass, User as UserIcon } from 'lucide-react';
import { useEvent } from '@/hooks/useEvents';
import { useTicketTypesByEvent } from '@/hooks/useTicketTypes';
import { useCreateBooking } from '@/hooks/useBookings';
import { ErrorState } from '@/components/common/ErrorState';
import useAuthStore from '@/store/authStore';

// Simple countdown component
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 mt-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-lg min-w-[70px]">
          <span className="text-2xl font-bold text-egyptian-gold font-mono">{String(value).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase tracking-widest text-white/70">{unit}</span>
        </div>
      ))}
    </div>
  );
}

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: event, isLoading, isError, refetch } = useEvent(id);
  const { data: ticketTypes, isLoading: ttLoading } = useTicketTypesByEvent(id);
  const createBooking = useCreateBooking();
  const { isAuthenticated } = useAuthStore();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const heroRef = useRef(null);
  const successModalRef = useRef(null);
  const ticketLeftRef = useRef(null);
  const ticketRightRef = useRef(null);
  const stampRef = useRef(null);
  const perforationRef = useRef(null);

  useEffect(() => {
    if (event && !isLoading) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, scale: 1.05 }, 
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
      );
    }
  }, [event, isLoading]);

  useEffect(() => {
    if (bookingSuccess) {
      // 10. Booking Success & Ticket Tear sequence
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => navigate('/my-tickets'), 500);
        }
      });

      // Show ticket
      tl.fromTo(successModalRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
      );

      // Glow + Perforation lights up
      tl.to(successModalRef.current, { boxShadow: "0 0 50px rgba(212,175,55,0.6)", duration: 0.5 });
      tl.to(perforationRef.current, { borderColor: "#D4AF37", opacity: 1, duration: 0.3 });

      // Wax stamp "APPROVED" appears
      tl.fromTo(stampRef.current,
        { opacity: 0, scale: 3, rotation: -30 },
        { opacity: 1, scale: 1, rotation: -10, duration: 0.5, ease: "back.out(2)" }
      );

      // Wait a moment
      tl.to({}, { duration: 1 });

      // Ticket Tear
      tl.to(ticketLeftRef.current, { x: "-100%", rotation: -15, opacity: 0, duration: 0.8, ease: "power2.inOut" }, "tear");
      tl.to(ticketRightRef.current, { x: "100%", rotation: 15, opacity: 0, duration: 0.8, ease: "power2.inOut" }, "tear");
      tl.to(successModalRef.current, { boxShadow: "0 0 0px rgba(212,175,55,0)", duration: 0.2 }, "tear");
      tl.to(perforationRef.current, { opacity: 0, duration: 0.1 }, "tear");
    }
  }, [bookingSuccess, navigate]);

  const handleBook = () => {
    if (!selectedTicket) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    createBooking.mutate(
      { ticket_type_id: selectedTicket.id, quantity },
      {
        onSuccess: () => {
          setBookingSuccess(true);
        },
      }
    );
  };

  const getAvailable = (tt) => tt.quantity - (tt.sold || 0);

  // Derived mock data to enrich the story if missing from db
  const totalTickets = ticketTypes?.reduce((acc, curr) => acc + curr.quantity, 0) || 0;
  const totalSold = ticketTypes?.reduce((acc, curr) => acc + (curr.sold || 0), 0) || 0;
  const ticketsLeft = totalTickets - totalSold;

  const minPrice = ticketTypes?.length ? Math.min(...ticketTypes.map(t => Number(t.price))) : 0;
  const maxPrice = ticketTypes?.length ? Math.max(...ticketTypes.map(t => Number(t.price))) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="w-10 h-10 animate-spin text-egyptian-gold" />
      </div>
    );
  }

  if (isError || !event) {
    return <div className="pt-24"><ErrorState message="Experience not found" onRetry={refetch} /></div>;
  }

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen pb-32">
      {/* 1. Cinematic Hero Cover */}
      <section className="relative h-screen w-full overflow-hidden" ref={heroRef}>
        {/* Placeholder video overlay logic - we'll just use the image with a subtle zoom animation for now */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: `url(${event.image_url || 'https://images.unsplash.com/photo-1539650116574-8efeb43e2b50?q=80&w=2070'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/40 to-black/30"></div>
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1 bg-egyptian-gold/20 border border-egyptian-gold/50 rounded-full text-egyptian-gold text-xs font-mono tracking-widest uppercase">
                Premium Experience
              </span>
              <span className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-egyptian-gold" />
                {event.location}
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-6 leading-[1.1] drop-shadow-2xl">
              {event.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light mb-8">
              A once-in-a-lifetime journey. Discover the untold story waiting for you at {event.venue_name}.
            </p>

            {/* Countdown & Meta */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-fit">
              <div>
                <p className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-1">Time Remaining</p>
                <CountdownTimer targetDate={event.event_date} />
              </div>
              <div className="hidden md:block w-px h-16 bg-white/10"></div>
              <div className="flex gap-8">
                <div>
                  <p className="text-sm font-mono tracking-widest text-white/50 uppercase mb-2">Availability</p>
                  <p className="text-2xl font-bold text-white">{ticketsLeft > 0 ? `${ticketsLeft} Left` : 'Sold Out'}</p>
                </div>
                <div>
                  <p className="text-sm font-mono tracking-widest text-white/50 uppercase mb-2">Price Range</p>
                  <p className="text-2xl font-bold text-white">${minPrice} - ${maxPrice}</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left Column: Story Content */}
        <div className="lg:col-span-2 space-y-24">
          
          {/* About Experience */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <Compass className="w-8 h-8 text-egyptian-gold" />
              <h2 className="text-4xl font-heading text-white">About the Experience</h2>
            </div>
            <div className="prose prose-invert prose-lg text-white/70 font-light leading-relaxed max-w-none">
              <p className="text-2xl text-white font-heading leading-snug mb-8 border-l-4 border-egyptian-gold pl-6">
                "Step into a world where history and modern luxury intertwine, creating unforgettable memories."
              </p>
              <p>{event.description}</p>
              <p>
                Join us for an exclusive gathering that celebrates the rich heritage and vibrant energy of Egypt. 
                This experience is meticulously crafted for those who seek not just an event, but a story to tell.
              </p>
            </div>
          </section>

          {/* What To Expect */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <Star className="w-8 h-8 text-egyptian-gold" />
              <h2 className="text-4xl font-heading text-white">What To Expect</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'VIP Access', desc: 'Skip the lines with priority entrance.' },
                { title: 'Curated Ambiance', desc: 'Immersive lighting and world-class sound design.' },
                { title: 'Exclusive Networking', desc: 'Meet like-minded individuals and visionaries.' },
                { title: 'Premium Services', desc: 'Dedicated concierge and host services throughout.' }
              ].map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl hover:border-egyptian-gold/30 transition-colors">
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-white/60 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Venue & Organizer Stories */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/40 border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-egyptian-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <MapPin className="w-6 h-6 text-egyptian-gold mb-6" />
              <h3 className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-2">The Stage</h3>
              <h4 className="text-3xl font-heading text-white mb-4">{event.venue_name}</h4>
              <p className="text-white/60 font-light mb-6">
                {event.venue_address}
                <br /><br />
                A legendary architectural masterpiece designed to amplify every emotion and note.
              </p>
            </div>

            <div className="bg-black/40 border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-egyptian-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <UserIcon className="w-6 h-6 text-egyptian-gold mb-6" />
              <h3 className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-2">The Visionary</h3>
              <h4 className="text-3xl font-heading text-white mb-4">EventHub Originals</h4>
              <p className="text-white/60 font-light mb-6">
                Curating the most extraordinary moments across Egypt. Our team transforms spaces into living stories.
              </p>
            </div>
          </section>

        </div>

        {/* Right Column: Ticket Selection Sticky Bar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-egyptian-gold via-white to-egyptian-gold"></div>
            
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Secure Your Passport</h3>
            <p className="text-sm text-white/50 mb-8 font-light">Select a tier to begin your journey.</p>
            
            {ttLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-egyptian-gold mx-auto" />
            ) : !ticketTypes || ticketTypes.length === 0 ? (
              <p className="text-white/50">Passes currently unavailable.</p>
            ) : (
              <div className="space-y-4">
                {ticketTypes.map((tt) => {
                  const available = getAvailable(tt);
                  const isSelected = selectedTicket?.id === tt.id;
                  
                  return (
                    <div
                      key={tt.id}
                      onClick={() => available > 0 && setSelectedTicket(tt)}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                        isSelected 
                          ? 'border-egyptian-gold bg-egyptian-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                          : 'border-white/10 hover:border-egyptian-gold/50 bg-black/40'
                      } ${available <= 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-egyptian-gold transform rotate-45 translate-x-8 -translate-y-8 flex items-end justify-center pb-1">
                          <Star className="w-4 h-4 text-deep-charcoal -rotate-45 mb-1" />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-2 pr-4">
                        <h4 className={`font-bold text-lg ${isSelected ? 'text-egyptian-gold' : 'text-white'}`}>{tt.name}</h4>
                        <span className="text-white font-mono font-bold text-xl">${Number(tt.price).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-white/50 tracking-wide font-light">
                        {available > 0 ? `${available} Passes Remaining` : 'Sold Out'}
                      </p>
                    </div>
                  );
                })}

                <AnimatePresence>
                  {selectedTicket && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-8 mt-8 border-t border-white/10"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-white/70 font-mono text-sm tracking-widest uppercase">Select Seats</span>
                        <div className="flex items-center gap-6 bg-black/40 rounded-full px-6 py-2 border border-white/10">
                          <button 
                            className="text-white/50 hover:text-egyptian-gold transition-colors text-2xl font-light"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >-</button>
                          <span className="text-white font-mono font-bold text-lg w-6 text-center">{quantity}</span>
                          <button 
                            className="text-white/50 hover:text-egyptian-gold transition-colors text-2xl font-light"
                            onClick={() => setQuantity(Math.min(quantity + 1, getAvailable(selectedTicket)))}
                          >+</button>
                        </div>
                      </div>

                      <div className="flex justify-between items-end mb-8 bg-black/40 p-4 rounded-xl border border-white/10">
                        <span className="text-white/50 uppercase tracking-widest text-xs">Total Investment</span>
                        <span className="text-3xl font-heading font-bold text-egyptian-gold drop-shadow-md">
                          ${(Number(selectedTicket.price) * quantity).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={handleBook}
                        disabled={createBooking.isPending}
                        className="w-full bg-egyptian-gold text-deep-charcoal font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center justify-center group"
                      >
                        {createBooking.isPending ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <>
                            Checkout Now
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Success Ticket Tear Overlay */}
      <AnimatePresence>
        {bookingSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-2xl p-4 perspective-1000">
            <div className="mb-48 absolute top-24 text-center">
               <h2 className="text-4xl font-heading font-bold text-egyptian-gold mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Your Journey Begins</h2>
               <p className="text-white/70 tracking-widest uppercase text-sm">Passport Stamp Approved</p>
            </div>
            
            <div ref={successModalRef} className="relative flex max-w-2xl w-full bg-transparent shadow-[0_0_20px_rgba(0,0,0,0.8)] rounded-xl opacity-0 mt-20">
              {/* Left Ticket Half */}
              <div ref={ticketLeftRef} className="w-1/3 bg-[#0a0a0a] p-6 flex flex-col justify-between border-2 border-r-0 border-egyptian-gold/30 rounded-l-2xl relative shadow-2xl">
                <span className="text-[10px] uppercase text-egyptian-gold/50 tracking-widest font-mono" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  EventHub Passport
                </span>
                <div className="font-heading text-2xl font-bold text-egyptian-gold transform -rotate-90 origin-bottom-left absolute bottom-12 left-10 w-48 whitespace-nowrap opacity-80">
                  {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              {/* Perforation Line */}
              <div ref={perforationRef} className="w-0 border-r-2 border-dashed border-white/10 relative z-10 opacity-50 transition-colors"></div>

              {/* Right Ticket Half */}
              <div ref={ticketRightRef} className="w-2/3 bg-[#0a0a0a] p-10 border-2 border-l-0 border-egyptian-gold/30 rounded-r-2xl relative overflow-hidden shadow-2xl">
                {/* Decorative cutouts */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0a0a0a] border-r-2 border-egyptian-gold/30"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-egyptian-gold/5 blur-[50px] rounded-full"></div>

                <h4 className="text-4xl font-heading font-bold text-white leading-tight mb-8 relative z-10">{event.title}</h4>
                <div className="space-y-6 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-white/40 tracking-widest font-mono mb-1">Venue</span>
                    <span className="text-white text-lg">{event.venue_name}</span>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase text-white/40 tracking-widest font-mono mb-1">Pass Tier</span>
                      <span className="text-egyptian-gold">{selectedTicket?.name}</span>
                    </div>
                    <div className="text-white font-mono font-bold text-2xl">${Number(selectedTicket?.price).toFixed(2)}</div>
                  </div>
                </div>

                {/* Wax Stamp */}
                <div
                  ref={stampRef}
                  className="absolute bottom-8 right-8 border-[4px] border-[#D4AF37] text-[#D4AF37] font-bold text-4xl px-6 py-3 rounded-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] opacity-0 bg-black/40 mix-blend-screen transform -rotate-12 backdrop-blur-sm"
                >
                  APPROVED
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
