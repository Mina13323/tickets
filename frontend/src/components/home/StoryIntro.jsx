import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StoryIntro() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const text6Ref = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      });

      tl.from(text1Ref.current, { opacity: 0, y: 50, duration: 1 })
        .from(text2Ref.current, { opacity: 0, y: 50, duration: 1 }, "-=0.5")
        .from(line1Ref.current, { scaleX: 0, duration: 1 }, "-=0.5")
        
        .from(text3Ref.current, { opacity: 0, y: 50, duration: 1 })
        .from(text4Ref.current, { opacity: 0, y: 50, duration: 1 }, "-=0.5")
        .from(line2Ref.current, { scaleX: 0, duration: 1 }, "-=0.5")
        
        .from(text5Ref.current, { opacity: 0, y: 50, duration: 1 })
        .from(text6Ref.current, { opacity: 0, y: 50, duration: 1 }, "-=0.5")
        .from(line3Ref.current, { scaleY: 0, duration: 2 }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 px-4 bg-[#0a0a0a] relative z-20 flex flex-col items-center justify-center min-h-[120vh]">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        
        <div className="space-y-4">
          <p ref={text1Ref} className="text-xl md:text-2xl text-white/70 tracking-[0.2em] uppercase font-light">
            From the bustling streets
          </p>
          <h2 ref={text2Ref} className="text-4xl md:text-6xl lg:text-7xl font-heading text-white">
            OF CAIRO
          </h2>
        </div>

        <div className="flex justify-center">
          <div ref={line1Ref} className="w-32 h-px bg-egyptian-gold origin-center shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
        </div>

        <div className="space-y-4">
          <p ref={text3Ref} className="text-xl md:text-2xl text-white/70 tracking-[0.2em] uppercase font-light">
            To the tranquil shores
          </p>
          <h2 ref={text4Ref} className="text-4xl md:text-6xl lg:text-7xl font-heading text-white">
            OF ALEXANDRIA
          </h2>
        </div>

        <div className="flex justify-center">
          <div ref={line2Ref} className="w-32 h-px bg-egyptian-gold origin-center shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
        </div>

        <div className="space-y-4">
          <p ref={text5Ref} className="text-xl md:text-2xl text-white/70 tracking-[0.2em] uppercase font-light">
            Every city holds
          </p>
          <h2 ref={text6Ref} className="text-3xl md:text-5xl lg:text-5xl font-heading text-egyptian-gold leading-tight">
            EXPERIENCES WAITING TO <br className="hidden md:block"/> BE DISCOVERED.
          </h2>
        </div>

        <div className="flex justify-center pt-16 h-32">
          <div ref={line3Ref} className="w-px h-full bg-gradient-to-b from-egyptian-gold to-transparent origin-top"></div>
        </div>

      </div>
    </section>
  );
}
