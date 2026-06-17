import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black/40 pt-32 pb-12 overflow-hidden z-20">
      {/* Animated Nile Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-egyptian-gold to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-24">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-heading text-egyptian-gold font-bold tracking-widest mb-6">EVENTHUB</h2>
            <p className="text-white/60 font-light leading-relaxed mb-8">
              Discover Egypt's untold stories through premium experiences, legendary venues, and curated cultural journeys.
            </p>
            <div className="flex gap-4 text-white/50 text-sm">
              <a href="#" className="hover:text-egyptian-gold transition-colors">Instagram</a>
              <a href="#" className="hover:text-egyptian-gold transition-colors">Twitter</a>
              <a href="#" className="hover:text-egyptian-gold transition-colors">Facebook</a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-6">Continue Your Journey</h3>
            <ul className="space-y-4">
              <li><Link to="/events" className="text-white/70 hover:text-egyptian-gold transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Discover Experiences</Link></li>
              <li><Link to="/map" className="text-white/70 hover:text-egyptian-gold transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Explore Cities</Link></li>
              <li><Link to="/categories" className="text-white/70 hover:text-egyptian-gold transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Curated Collections</Link></li>
              <li><Link to="/my-tickets" className="text-white/70 hover:text-egyptian-gold transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Experience Passport</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-6">Partnerships</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-white/70 hover:text-egyptian-gold transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Venues</Link></li>
              <li><Link to="/" className="text-white/70 hover:text-egyptian-gold transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Organizers</Link></li>
              <li><Link to="/" className="text-white/70 hover:text-egyptian-gold transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-mono tracking-widest text-egyptian-gold uppercase mb-6">Stay Inspired</h3>
            <p className="text-white/60 text-sm mb-4">Subscribe to receive exclusive access to cultural events and secret experiences.</p>
            <div className="relative">
              <input type="email" placeholder="Your email address" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-egyptian-gold transition-colors" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-egyptian-gold hover:text-white transition-colors p-2">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} EventHub Experience. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link to="/" className="hover:text-egyptian-gold transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-egyptian-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-egyptian-gold/5 blur-[100px] pointer-events-none rounded-t-full"></div>
    </footer>
  );
}
