import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '../common/MagneticButton';

const AnimatedText = ({ text, className }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 2.5 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
          {word === 'Tells' || word === 'A' || word === 'Story' ? (
            <span className="text-egyptian-gold italic">{word}</span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background with slow zoom */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <motion.div
          className="w-full h-full bg-cover bg-center"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundImage: 'url("/sound_and_light_pyramids.jpg")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0D0D0D]"></div>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute rounded-full bg-egyptian-gold/20 backdrop-blur-sm shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl px-4 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mb-4 inline-block px-4 py-1.5 rounded-full bg-glass text-xs tracking-widest text-egyptian-gold border border-egyptian-gold/30 uppercase"
        >
          Egypt's Premium Events
        </motion.div>
        
        <AnimatedText 
          text="Every Ticket Tells A Story" 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow-cinematic text-white font-heading"
        />
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl font-light"
        >
          Discover concerts, festivals, culture, food, art, and unforgettable experiences across Egypt.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <MagneticButton>
            <Button size="lg" className="bg-egyptian-gold text-deep-charcoal hover:bg-egyptian-gold/90 text-lg px-8 h-14 rounded-full group transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Start Your Journey
              <Compass className="ml-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
            </Button>
          </MagneticButton>
          
          <MagneticButton>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-egyptian-gold/50 text-egyptian-gold hover:bg-egyptian-gold/10 transition-all duration-300">
              Explore Events
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
