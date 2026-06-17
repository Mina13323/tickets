import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, Share2, Ticket, MapPin } from 'lucide-react';
import MagneticButton from '../common/MagneticButton';

const TRENDING_EVENTS = [
  {
    id: 1,
    title: 'Sound & Light Show at the Pyramids',
    category: 'Cultural',
    venue: 'Giza Plateau',
    image: '/sound_and_light_pyramids.jpg',
    metric: 'Most Booked',
    metricIcon: Ticket,
    metricCount: '2.4k this week'
  },
  {
    id: 2,
    title: 'Symphony on the Nile',
    category: 'Music',
    venue: 'Aswan Riverbank',
    image: '/symphony_on_nile.jpg',
    metric: 'Most Viewed',
    metricIcon: Eye,
    metricCount: '15k views'
  },
  {
    id: 3,
    title: 'Secret Desert Camp',
    category: 'Adventure',
    venue: 'White Desert',
    image: '/secret_desert_camp.jpg',
    metric: 'Most Shared',
    metricIcon: Share2,
    metricCount: '8.2k shares'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

export default function TrendingExperiences() {
  return (
    <section className="py-24 bg-[#0D0D0D] relative overflow-hidden z-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-egyptian-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-egyptian-gold" />
              <h3 className="text-sm tracking-[0.2em] text-egyptian-gold uppercase font-semibold">Trending This Week</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading text-white">The Pulse of Egypt</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MagneticButton>
              <button className="flex items-center gap-2 text-egyptian-gold hover:text-white transition-colors border-b border-egyptian-gold pb-1 font-mono tracking-widest text-sm uppercase">
                View All Trends <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TRENDING_EVENTS.map((event, i) => {
            const Icon = event.metricIcon;
            return (
              <motion.div 
                key={event.id}
                variants={cardVariants}
                className="group relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 hover:border-egyptian-gold/30 transition-all duration-500 cursor-pointer"
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <motion.img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
                    <span className="text-xs font-mono tracking-widest text-white uppercase">{event.category}</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 relative">
                  {/* Decorative glow line */}
                  <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-egyptian-gold to-transparent group-hover:w-full transition-all duration-700"></div>
                  
                  <div className="flex items-center gap-2 text-egyptian-gold mb-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-widest">{event.metric}</span>
                    <span className="text-xs text-white/40 ml-auto">{event.metricCount}</span>
                  </div>

                  <h3 className="text-2xl font-heading text-white mb-2 group-hover:text-egyptian-gold transition-colors">{event.title}</h3>
                  
                  <div className="flex items-center gap-2 text-white/50">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-light">{event.venue}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Inline ArrowRight to prevent missing import
function ArrowRight(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}
