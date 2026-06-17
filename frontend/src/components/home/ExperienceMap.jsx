import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "/features.json";

const CITIES = [
  { id: 'alexandria', name: 'Alexandria', coordinates: [29.9187, 31.2001], events: 8 },
  { id: 'cairo', name: 'Cairo', coordinates: [31.2357, 30.0444], events: 12 },
  { id: 'sharm', name: 'Sharm El-Sheikh', coordinates: [34.3299, 27.9158], events: 7 },
  { id: 'luxor', name: 'Luxor', coordinates: [32.6396, 25.6872], events: 5 },
  { id: 'aswan', name: 'Aswan', coordinates: [32.8998, 24.0889], events: 3 },
];

export default function ExperienceMap() {
  const [hoveredCity, setHoveredCity] = useState(null);

  return (
    <section className="py-32 bg-[#0D0D0D] relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 md:pr-12 z-10">
          <h3 className="text-sm tracking-[0.2em] text-egyptian-gold uppercase mb-2 font-semibold">Explore The Map</h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6">Discover Egypt's Magic</h2>
          <p className="text-lg text-white/70 mb-10 max-w-lg font-light leading-relaxed">
            Hover over the cities to see the pulse of experiences across the country. From historical wonders to coastal festivals, find your next story.
          </p>
          
          <div className="flex flex-col gap-4">
            {CITIES.slice(0, 3).map(city => (
              <div 
                key={city.id} 
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                className={`flex items-center justify-between p-5 rounded-xl border transition-all duration-300 cursor-pointer group ${
                  hoveredCity?.id === city.id 
                    ? 'border-egyptian-gold bg-egyptian-gold/10' 
                    : 'border-white/10 bg-[#0a0a0a] hover:border-egyptian-gold/30 hover:bg-[#0a0a0a]'
                }`}
              >
                <span className={`font-heading text-lg transition-colors ${hoveredCity?.id === city.id ? 'text-egyptian-gold' : 'text-white group-hover:text-egyptian-gold'}`}>
                  {city.name}
                </span>
                <span className="text-sm text-egyptian-gold/80 font-mono tracking-widest">{city.events} Experiences</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative w-full h-[600px] flex items-center justify-center">
          {/* Abstract background glow */}
          <div className="absolute inset-0 bg-egyptian-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative w-full max-w-lg bg-[#0a0a0a] rounded-[2rem] border border-white/10 p-4 shadow-2xl overflow-hidden group h-full flex flex-col">
            
            <div className="w-full h-full relative border border-white/10 rounded-xl overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
              {/* Decorative title */}
              <span className="text-white/10 font-heading text-8xl uppercase tracking-widest absolute -bottom-4 font-bold z-0 pointer-events-none text-center drop-shadow-lg">EGYPT</span>
              
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 3500,
                  center: [30.8, 26.8] // Center on Egypt
                }}
                className="w-full h-full relative z-10"
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies
                      .filter(geo => geo.properties.name === "Egypt")
                      .map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#1A1A1A"
                        stroke="#D4AF37"
                        strokeWidth={1.5}
                        strokeOpacity={0.8}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "rgba(212,175,55,0.1)" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Cities markers */}
                {CITIES.map((city, idx) => {
                  const isHovered = hoveredCity?.id === city.id;
                  return (
                    <Marker 
                      key={city.name} 
                      coordinates={city.coordinates}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className="cursor-pointer"
                    >
                      {/* Ripple background */}
                      <circle 
                        r={isHovered ? 20 : 0} 
                        fill="rgba(212,175,55,0.2)" 
                        className="transition-all duration-500 ease-out"
                      />
                      
                      {/* Dot */}
                      <circle 
                        r={5} 
                        fill="#D4AF37" 
                        stroke="#0D0D0D"
                        strokeWidth={2}
                        className={`transition-all duration-300 ${isHovered ? 'scale-150' : ''}`}
                      />
                    </Marker>
                  )
                })}
              </ComposableMap>

              {/* Tooltip overlaid in normal React tree so it can break out of SVG space beautifully */}
              <AnimatePresence>
                {hoveredCity && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-10 right-10 bg-[#0a0a0a]/90 backdrop-blur-md border border-egyptian-gold/30 p-4 rounded-xl shadow-2xl z-20"
                  >
                    <span className="block text-xl font-heading font-bold text-white mb-1">{hoveredCity.name}</span>
                    <div className="h-px w-full bg-gradient-to-r from-egyptian-gold to-transparent mb-2"></div>
                    <span className="text-sm text-egyptian-gold font-mono tracking-widest">{hoveredCity.events} EVENTS FOUND</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
