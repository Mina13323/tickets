import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Menu, LogOut, User, Home, LayoutDashboard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useAuthStore from '@/store/authStore';
import { useLogout } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import MagneticButton from '../common/MagneticButton';
import GlobalSearch from './GlobalSearch';
import Footer from './Footer';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/categories', label: 'Categories' },
  { to: '/map', label: 'Map' },
  { to: '/my-tickets', label: 'Passport' },
];

export default function UserLayout() {
  const { user } = useAuthStore();
  const logout = useLogout();
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-egyptian-gold/30 selection:text-egyptian-gold">
      <header 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-[#0D0D0D]/80 backdrop-blur-md border-white/10 py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="h-8 w-8 rounded bg-egyptian-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                <Ticket className="h-4 w-4 text-deep-charcoal" />
              </motion.div>
              <span className="text-xl font-heading font-bold tracking-wide text-white group-hover:text-egyptian-gold transition-colors">EventHub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link key={link.to} to={link.to} className="relative py-2 group">
                    <span className={`text-sm tracking-widest uppercase font-medium transition-colors duration-300 ${isActive ? 'text-egyptian-gold' : 'text-white/80 group-hover:text-white'}`}>
                      {link.label}
                    </span>
                    
                    {/* Active/Hover Underline Indicator */}
                    <div className={`absolute bottom-0 left-0 h-px bg-egyptian-gold transition-all duration-300 ${isActive ? 'w-full shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'w-0 group-hover:w-full opacity-50 group-hover:opacity-100'}`}></div>
                    
                    {/* Active Background Glow */}
                    {isActive && (
                      <div className="absolute inset-0 bg-egyptian-gold/5 blur-md rounded-md -z-10"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Auth Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 text-white/80 hover:text-egyptian-gold transition-colors mr-4"
              >
                <Search className="w-5 h-5" />
                <span className="text-sm font-medium tracking-widest uppercase">Search</span>
              </button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Avatar className="h-8 w-8 border border-egyptian-gold/30">
                        <AvatarFallback className="bg-egyptian-gold/10 text-egyptian-gold text-xs font-bold">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#151515] border-white/10 text-white">
                    <DropdownMenuItem disabled className="text-white/50">
                      <User className="mr-2 h-4 w-4" />
                      {user?.email}
                    </DropdownMenuItem>
                    {user?.role === 'admin' && (
                      <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-egyptian-gold">
                        <Link to="/admin/dashboard" className="flex items-center cursor-pointer w-full">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={() => logout.mutate()} className="text-red-400 focus:bg-red-400/10 focus:text-red-300 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  <Link to="/login" className="text-sm font-medium tracking-widest uppercase text-white/80 hover:text-egyptian-gold transition-colors">
                    Sign In
                  </Link>
                  <MagneticButton>
                    <Link to="/register" className="bg-egyptian-gold text-deep-charcoal text-sm font-bold tracking-widest uppercase px-5 py-2 rounded shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all">
                      Sign Up
                    </Link>
                  </MagneticButton>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="text-white hover:text-egyptian-gold hover:bg-transparent">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#0a0a0a] border-l-white/10 text-white p-8">
                  <SheetTitle className="text-egyptian-gold font-heading tracking-widest">MENU</SheetTitle>
                  <nav className="flex flex-col gap-6 mt-12">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.to} 
                        to={link.to} 
                        onClick={() => setSheetOpen(false)}
                        className={`text-2xl font-heading transition-colors ${location.pathname === link.to ? 'text-egyptian-gold' : 'text-white hover:text-egyptian-gold/80'}`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    {!user && (
                      <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-white/10">
                        <Link to="/login" onClick={() => setSheetOpen(false)} className="text-lg text-white/80">Sign In</Link>
                        <Link to="/register" onClick={() => setSheetOpen(false)} className="text-lg text-egyptian-gold">Sign Up</Link>
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </header>

      <main className="w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
