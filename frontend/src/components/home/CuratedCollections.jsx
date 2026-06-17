import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import MagneticButton from '../common/MagneticButton';

const COLLECTIONS = [
  {
    id: 1,
    title: 'Music Under The Stars',
    subtitle: 'Outdoor Concerts & Festivals',
    image: '/symphony_on_nile.jpg',
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'row-span-2'
  },
  {
    id: 2,
    title: 'Weekend Escapes',
    subtitle: 'Red Sea & Beyond',
    image: '/red_sea_escape.jpg',
    colSpan: 'col-span-1 md:col-span-1',
    rowSpan: 'row-span-1'
  },
  {
    id: 3,
    title: 'Cultural Journeys',
    subtitle: 'Heritage & History',
    image: '/sound_and_light_pyramids.jpg',
    colSpan: 'col-span-1 md:col-span-1',
    rowSpan: 'row-span-1'
  },
  {
    id: 4,
    title: 'Hidden Gems',
    subtitle: 'Off the Beaten Path',
    image: '/luxor_temple.jpg',
    colSpan: 'col-span-1 md:col-span-2',
    rowSpan: 'row-span-1'
  }
];

export default function CuratedCollections() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-6 h-6 text-egyptian-gold" />
              <h3 className="text-sm tracking-[0.2em] text-egyptian-gold uppercase font-semibold">Handpicked for you</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading text-white">Curated Collections</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MagneticButton>
              <button className="flex items-center gap-2 text-egyptian-gold hover:text-white transition-colors border-b border-egyptian-gold pb-1 font-mono tracking-widest text-sm uppercase">
                Explore All <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {COLLECTIONS.map((collection, index) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${collection.colSpan} ${collection.rowSpan}`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
              
              <div 
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10"></div>
              
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                <p className="text-egyptian-gold font-mono tracking-widest uppercase text-xs mb-2">
                  {collection.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-heading text-white">
                  {collection.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
