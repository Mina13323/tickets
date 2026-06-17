import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Sound & Light Show',
    location: 'Giza Pyramids, Cairo',
    date: 'Oct 15, 2026',
    price: 'EGP 800',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2b50?q=80&w=2070&auto=format&fit=crop',
    category: 'Culture'
  },
  {
    id: 2,
    title: 'Cairo Jazz Festival',
    location: 'AUC Tahrir Square, Cairo',
    date: 'Dec 10, 2026',
    price: 'EGP 600',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2069&auto=format&fit=crop',
    category: 'Music'
  },
  {
    id: 3,
    title: 'El Gouna Film Festival',
    location: 'El Gouna, Red Sea',
    date: 'Nov 02, 2026',
    price: 'EGP 1500',
    image: 'https://images.unsplash.com/photo-1460881680858-30d872d5b530?q=80&w=2071&auto=format&fit=crop',
    category: 'Cinema'
  }
];

const PremiumEventCard = ({ event }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // For 3D tilt
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    // For Spotlight
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/events/${event.id}`)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative cursor-pointer group rounded-xl bg-transparent"
    >
      {/* Premium Ticket Card Wrapper */}
      <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative flex flex-col h-full transform transition-colors duration-500 group-hover:border-egyptian-gold/50">
        
        {/* Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              () => `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(212,175,55,0.15), transparent 40%)`
            ),
          }}
        />

        {/* Perforated edges CSS mask */}
        <div className="mask-perforated w-full h-full absolute inset-0 pointer-events-none z-10" style={{
          maskImage: 'radial-gradient(circle at center, transparent 4px, black 5px)',
          maskSize: '100% 20px',
          maskPosition: 'left center',
          maskRepeat: 'repeat-y'
        }}></div>

        {/* Ticket Image Portion */}
        <div className="h-48 md:h-56 w-full relative overflow-hidden p-2">
          <div className="w-full h-full rounded-t-lg overflow-hidden relative">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
          </div>
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded text-xs font-heading tracking-widest text-egyptian-gold uppercase border border-egyptian-gold/30">
            {event.category}
          </div>
        </div>

        {/* Ticket Details Portion */}
        <div className="p-6 flex-grow flex flex-col justify-between relative bg-gradient-to-b from-[#111] to-[#0a0a0a]">
          {/* Decorative cutouts */}
          <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#0a0a0a] border-r border-b border-white/10"></div>
          <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#0a0a0a] border-l border-b border-white/10"></div>
          
          {/* Dashed line separator */}
          <div className="absolute top-0 left-4 right-4 h-px border-t-2 border-dashed border-white/10"></div>

          <div>
            <h3 className="text-2xl font-heading font-bold mb-4 text-white group-hover:text-egyptian-gold transition-colors" style={{ transform: "translateZ(30px)" }}>{event.title}</h3>
            
            <div className="space-y-3 mb-6" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center text-sm text-white/70">
                <MapPin className="w-4 h-4 mr-3 text-egyptian-gold/70" />
                {event.location}
              </div>
              <div className="flex items-center text-sm text-white/70">
                <Calendar className="w-4 h-4 mr-3 text-egyptian-gold/70" />
                {event.date}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10" style={{ transform: "translateZ(10px)" }}>
            <div className="flex flex-col">
              <span className="text-xs text-white/50 uppercase tracking-wider mb-1">Starting from</span>
              <span className="text-lg font-bold text-egyptian-gold">{event.price}</span>
            </div>
            <div className="text-sm uppercase tracking-widest font-semibold text-white/90 group-hover:text-egyptian-gold transition-colors flex items-center">
              Get Pass <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function FeaturedEvents() {
  return (
    <section className="py-32 px-4 bg-[#0a0a0a] relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="text-sm tracking-[0.2em] text-egyptian-gold uppercase mb-2 font-semibold">Featured</h3>
            <h2 className="text-4xl md:text-5xl font-heading text-white">Premium Experiences</h2>
          </div>
          <button className="hidden md:flex items-center text-egyptian-gold hover:text-egyptian-gold/80 transition-colors uppercase tracking-widest text-sm font-semibold group">
            View All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" style={{ perspective: "1000px" }}>
          {MOCK_EVENTS.map((event) => (
            <PremiumEventCard key={event.id} event={event} />
          ))}
        </div>
        
        <button className="md:hidden w-full mt-12 py-4 border border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold/10 transition-colors uppercase tracking-widest text-sm font-semibold rounded-full">
          View All Experiences
        </button>
      </div>
    </section>
  );
}
