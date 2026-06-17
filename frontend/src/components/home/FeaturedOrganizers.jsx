import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Music, Film, Ticket } from 'lucide-react';
import MagneticButton from '../common/MagneticButton';

const ORGANIZERS = [
  {
    id: 1,
    name: 'Cairo Jazz Club',
    logo: 'CJC',
    story: 'The ultimate destination for live alternative music in Cairo since 2001.',
    eventsHosted: 1240,
    followers: '150k',
    upcomingEvents: 12,
    icon: Music
  },
  {
    id: 2,
    name: 'El Gouna Film Festival',
    logo: 'GFF',
    story: 'Showcasing a wide variety of films for a passionate and knowledgeable audience.',
    eventsHosted: 85,
    followers: '2M',
    upcomingEvents: 3,
    icon: Film
  },
  {
    id: 3,
    name: 'Cairo Opera House',
    logo: 'COH',
    story: 'The main performing arts venue in the Egyptian capital, home to top national companies.',
    eventsHosted: 5400,
    followers: '500k',
    upcomingEvents: 45,
    icon: Star
  }
];

export default function FeaturedOrganizers() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative z-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.2em] text-egyptian-gold uppercase mb-4 font-semibold"
          >
            The Visionaries
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading text-white"
          >
            Featured Organizers
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ORGANIZERS.map((org, index) => {
            const Icon = org.icon;
            return (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:border-egyptian-gold/30 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Background ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-egyptian-gold/5 blur-[50px] rounded-full group-hover:bg-egyptian-gold/10 transition-colors"></div>

                <div className="w-24 h-24 rounded-full bg-[#0a0a0a] border-2 border-egyptian-gold flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)] relative z-10 group-hover:scale-110 transition-transform duration-500">
                  <span className="font-heading text-2xl text-egyptian-gold font-bold">{org.logo}</span>
                </div>

                <h3 className="text-2xl font-heading text-white mb-3 relative z-10">{org.name}</h3>
                <p className="text-white/50 font-light text-sm mb-8 leading-relaxed relative z-10 flex-grow">
                  {org.story}
                </p>

                <div className="w-full grid grid-cols-3 gap-4 border-t border-white/10 pt-6 relative z-10">
                  <div>
                    <p className="text-white font-bold">{org.upcomingEvents}</p>
                    <p className="text-[10px] text-egyptian-gold font-mono uppercase tracking-widest mt-1">Events</p>
                  </div>
                  <div className="border-x border-white/10">
                    <p className="text-white font-bold">{org.followers}</p>
                    <p className="text-[10px] text-egyptian-gold font-mono uppercase tracking-widest mt-1">Followers</p>
                  </div>
                  <div>
                    <p className="text-white font-bold">{org.eventsHosted}</p>
                    <p className="text-[10px] text-egyptian-gold font-mono uppercase tracking-widest mt-1">Hosted</p>
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <MagneticButton>
            <button className="px-8 py-4 bg-egyptian-gold text-deep-charcoal uppercase tracking-widest text-sm font-bold flex items-center gap-2 hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              View All Organizers <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
