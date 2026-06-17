import React from 'react';
import { Music, Film, Trophy, Ticket, Palette, Utensils, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 1, name: 'Music', icon: Music, color: '#D4AF37' },
  { id: 2, name: 'Cinema', icon: Film, color: '#EAD7B7' },
  { id: 3, name: 'Sports', icon: Trophy, color: '#B87333' },
  { id: 4, name: 'Theater', icon: Ticket, color: '#0F4C75' },
  { id: 5, name: 'Art', icon: Palette, color: '#D4AF37' },
  { id: 6, name: 'Food', icon: Utensils, color: '#EAD7B7' },
  { id: 7, name: 'Culture', icon: Landmark, color: '#B87333' },
];

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.2, rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }
};

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-16 text-center md:text-left">
          <div className="w-full">
            <h3 className="text-sm tracking-[0.2em] text-egyptian-gold uppercase mb-2 font-semibold">Your Passport to</h3>
            <h2 className="text-4xl md:text-5xl font-heading text-white">Discover Categories</h2>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div 
                key={cat.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative cursor-none transform transition-all duration-500"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-dashed border-white/10 flex flex-col items-center justify-center bg-[#0a0a0a]/50 backdrop-blur-sm shadow-lg group-hover:border-egyptian-gold group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500 relative overflow-hidden">
                  
                  {/* Stamp Imprint Effect Overlay */}
                  <div className="absolute inset-0 bg-egyptian-gold/0 group-hover:bg-egyptian-gold/5 transition-colors duration-500"></div>
                  
                  <motion.div variants={iconVariants}>
                    <Icon className="w-10 h-10 mb-3 text-white/80 transition-colors duration-300" style={{ color: "currentColor" }} />
                  </motion.div>
                  <span className="text-sm font-heading font-bold uppercase tracking-widest text-white/80 group-hover:text-egyptian-gold transition-colors duration-300">{cat.name}</span>
                  
                  {/* Outer ring for stamp effect */}
                  <div className="absolute inset-3 border border-white/10 rounded-full group-hover:border-egyptian-gold/30 transition-colors duration-500 border-dashed"></div>
                </div>
                
                {/* Date stamp detail */}
                <div className="absolute -bottom-2 -right-2 bg-[#B87333] text-deep-charcoal text-xs font-mono font-bold px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transform rotate-12 transition-all duration-300 pointer-events-none">
                  EST. 2026
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
