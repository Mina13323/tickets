import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  { period: 'Today', title: 'Sunset Felucca Ride', desc: 'Experience the golden hour on the Nile with live acoustic music.' },
  { period: 'This Week', title: 'Cairo Jazz Fest', desc: 'Three days of world-class jazz performances in the heart of the city.' },
  { period: 'This Month', title: 'Gouna Film Fest', desc: 'Red carpet premieres and exclusive screenings by the Red Sea.' },
  { period: 'Upcoming', title: 'Grand Museum Opening', desc: 'Be part of history. The most anticipated cultural event of the decade.' },
];

export default function JourneyTimeline() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);
  const nodesRef = useRef([]);

  useEffect(() => {
    // Wait for fonts/layout to stabilize
    const timer = setTimeout(() => {
      let ctx = gsap.context(() => {
        const pinWrap = scrollRef.current;
        
        // Use functions to allow recalculation on resize/refresh
        const getScrollAmount = () => -(pinWrap.scrollWidth - window.innerWidth);
        const getEnd = () => `+=${pinWrap.scrollWidth - window.innerWidth}`;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: getEnd,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        // 1. Horizontal Scroll
        tl.to(pinWrap, {
          x: getScrollAmount,
          ease: 'none',
        }, 0);

        // 2. Line Draw
        tl.fromTo(lineRef.current, 
          { width: "0%" },
          { width: "100%", ease: "none" },
          0
        );

        // 3. Cards & Nodes
        cardsRef.current.forEach((card, i) => {
          const isEven = i % 2 === 0;
          const step = 1 / TIMELINE_DATA.length;
          const startTime = i * step;

          // Pulse nodes independently
          gsap.to(nodesRef.current[i], {
            boxShadow: "0 0 25px rgba(212,175,55,0.8)",
            scale: 1.2,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });

          // Slide cards into place along the timeline
          tl.fromTo(card,
            { opacity: 0, y: isEven ? -100 : 100 },
            { opacity: 1, y: 0, duration: step, ease: "power2.out" },
            startTime
          );
        });

      }, sectionRef);

      // Force GSAP to recalculate positions
      ScrollTrigger.refresh();

      return () => ctx.revert();
    }, 100); // Small delay to ensure layout is ready

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-[#0a0a0a] overflow-hidden flex items-center relative z-20">
      <div className="absolute top-24 left-12 md:left-24 z-10 pointer-events-none">
        <h3 className="text-sm tracking-[0.2em] text-egyptian-gold uppercase mb-2 font-semibold">Your Itinerary</h3>
        <h2 className="text-4xl md:text-5xl font-heading text-white">Upcoming Journey</h2>
      </div>

      {/* This inner div moves left */}
      <div ref={scrollRef} className="flex pl-[20vw] pr-[20vw] pt-32 h-full items-center min-w-max will-change-transform">
        <div className="flex gap-24 md:gap-40 h-full items-center relative">
          
          {/* Faint Background Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 -z-10 w-[150vw]"></div>
          
          {/* Animated Gold Line */}
          <div 
            ref={lineRef}
            className="absolute top-1/2 left-0 h-[2px] bg-egyptian-gold -translate-y-1/2 -z-10 shadow-[0_0_15px_rgba(212,175,55,1)]"
          ></div>

          {TIMELINE_DATA.map((item, idx) => (
            <div key={idx} className="w-[300px] md:w-[400px] flex-shrink-0 group relative">
              {/* Node on the line */}
              <div 
                ref={el => nodesRef.current[idx] = el}
                className="absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 rounded-full bg-[#0a0a0a] border-2 border-egyptian-gold z-10"
              ></div>
              
              <div 
                ref={el => cardsRef.current[idx] = el}
                className={`ml-12 ${idx % 2 === 0 ? '-mt-64' : 'mt-24'}`}
              >
                <div className="text-egyptian-gold font-mono text-sm tracking-widest uppercase mb-3 font-bold">{item.period}</div>
                <div className="bg-[#0a0a0a] p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden group-hover:border-egyptian-gold/30 transition-colors">
                  <div className="absolute inset-0 bg-egyptian-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-2xl font-heading font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-white/70 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
