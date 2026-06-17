import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const ticketRef = useRef(null);
  const textRef = useRef(null);
  const scannerRef = useRef(null);
  const stampRef = useRef(null);
  const leftHalfRef = useRef(null);
  const rightHalfRef = useRef(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Ticket appears
    tl.fromTo(ticketRef.current, 
      { opacity: 0, scale: 0.8, y: 50 }, 
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // 3 & 4. Scanning light & progress
    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 2,
      ease: 'linear',
      onUpdate: () => setProgress(Math.round(progressObj.value))
    }, "-=0.5");

    tl.fromTo(scannerRef.current,
      { x: '-100%' },
      { x: '100%', duration: 2, ease: 'linear' },
      "<"
    );

    // 6 & 7. Approved & Stamp appears
    tl.fromTo(stampRef.current,
      { opacity: 0, scale: 3, rotation: -20 },
      { opacity: 1, scale: 1, rotation: -10, duration: 0.5, ease: 'back.out(1.7)' }
    );

    // Pause briefly
    tl.to({}, { duration: 0.5 });

    // 8. Ticket tears open
    tl.to(leftHalfRef.current, {
      x: '-100vw',
      rotation: -15,
      opacity: 0,
      duration: 1,
      ease: 'power3.inOut'
    }, "tear");

    tl.to(rightHalfRef.current, {
      x: '100vw',
      rotation: 15,
      opacity: 0,
      duration: 1,
      ease: 'power3.inOut'
    }, "tear");

    // 9. Reveal website
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
    >
      <div 
        ref={ticketRef}
        className="relative flex items-center justify-center w-80 h-40"
      >
        {/* Ticket Container */}
        <div className="absolute inset-0 flex">
          {/* Left Half */}
          <div 
            ref={leftHalfRef}
            className="relative w-1/2 h-full bg-card border-2 border-egyptian-gold/50 rounded-l-xl overflow-hidden shadow-2xl"
          >
            <div className="absolute right-0 top-0 bottom-0 w-px border-r-2 border-dashed border-egyptian-gold/50 transform translate-x-1/2"></div>
            <div className="p-4 h-full flex flex-col justify-between items-start">
              <h2 className="font-heading text-lg font-bold text-egyptian-gold">EGYPT</h2>
              <div className="text-xs text-muted-foreground font-mono">NO. 0000{progress}</div>
            </div>
            {/* Scanning Light */}
            <div 
              ref={scannerRef}
              className="absolute inset-0 w-1/2 h-full bg-egyptian-gold/20 blur-md"
            ></div>
          </div>
          
          {/* Right Half */}
          <div 
            ref={rightHalfRef}
            className="relative w-1/2 h-full bg-card border-2 border-egyptian-gold/50 border-l-0 rounded-r-xl overflow-hidden shadow-2xl"
          >
            <div className="p-4 h-full flex flex-col justify-center items-center">
              <div className="text-2xl font-heading font-bold">{progress}%</div>
            </div>
            
            {/* Stamp */}
            <div 
              ref={stampRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-destructive text-destructive font-bold text-xl px-2 py-1 rounded opacity-0 rotate-[-10deg]"
              style={{ zIndex: 10 }}
            >
              APPROVED
            </div>
          </div>
        </div>
        
        {/* Text */}
        <div 
          ref={textRef}
          className="absolute -bottom-12 w-full text-center text-sm tracking-widest text-egyptian-gold/80 uppercase font-semibold"
        >
          Preparing Your Experience...
        </div>
      </div>
    </div>
  );
}
