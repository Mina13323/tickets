import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar } from 'lucide-react';

const VENUES = [
  {
    id: 1,
    name: 'Cairo Opera House',
    story: 'The beacon of cultural arts in Egypt, hosting world-class symphonies, ballet, and legendary performances since 1988.',
    image: '/cairo_opera_house.jpg',
    events: 24,
    visitors: '2M+',
    organizer: 'Ministry of Culture'
  },
  {
    id: 2,
    name: 'Bibliotheca Alexandrina',
    story: 'A stunning architectural masterpiece reviving the ancient Library of Alexandria, standing as a modern center of excellence and knowledge.',
    image: '/bibliotheca_alexandrina.jpg',
    events: 18,
    visitors: '1.5M+',
    organizer: 'BA Trust'
  },
  {
    id: 3,
    name: 'El Gouna Arena',
    story: 'Where the Red Sea meets international entertainment. The ultimate open-air destination for film festivals, concerts, and exclusive parties.',
    image: '/red_sea_escape.jpg',
    events: 32,
    visitors: '500K+',
    organizer: 'Orascom'
  }
];

export default function LegendaryVenues() {
  return (
    <section className="py-32 bg-black/40 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h3 className="text-sm tracking-[0.2em] text-egyptian-gold uppercase mb-4 font-semibold">Legendary Venues</h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white max-w-2xl mx-auto leading-tight">
            Stages That Tell <span className="italic text-white/50">Stories</span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {VENUES.map((venue, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={venue.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Image Side with Parallax feel */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-full md:w-1/2"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${venue.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Hover reveal stats */}
                    <div className="absolute bottom-0 left-0 p-8 w-full translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex justify-between items-end border-t border-egyptian-gold/30 pt-4">
                        <div>
                          <p className="text-xs text-egyptian-gold font-mono uppercase tracking-widest mb-1">Total Visitors</p>
                          <p className="text-2xl font-heading text-white">{venue.visitors}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-egyptian-gold font-mono uppercase tracking-widest mb-1">Featured Organizer</p>
                          <p className="text-lg font-heading text-white">{venue.organizer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/2 space-y-8"
                >
                  <div className="flex items-center gap-3 text-egyptian-gold mb-4">
                    <MapPin className="w-5 h-5" />
                    <span className="font-mono text-sm tracking-widest uppercase">Iconic Location</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-heading text-white">{venue.name}</h3>
                  <p className="text-xl text-white/60 font-light leading-relaxed">
                    {venue.story}
                  </p>

                  <div className="flex items-center gap-4 pt-6">
                    <div className="w-12 h-12 rounded-full border border-egyptian-gold/30 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-egyptian-gold" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{venue.events} Upcoming Experiences</p>
                      <p className="text-white/50 text-sm">Discover what's next</p>
                    </div>
                  </div>
                  
                  <button className="mt-8 px-8 py-4 bg-transparent border border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold hover:text-deep-charcoal transition-all uppercase tracking-widest text-sm font-bold w-full md:w-auto text-center rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                    Explore Venue
                  </button>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
