import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Ticket, ClipboardList, LogOut, Menu, ChevronLeft, Shield, Building2, Crown, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import useAuthStore from '@/store/authStore';
import { useLogout } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const sidebarLinks = [
  { to: '/admin/dashboard', label: 'Command Center', icon: LayoutDashboard },
  { to: '/admin/events', label: 'Experience Manager', icon: Calendar },
  { to: '/admin/ticket-types', label: 'Ticket Tiers', icon: Ticket },
  { to: '/admin/bookings', label: 'Activity Logs', icon: ClipboardList },
  { to: '/admin/venues', label: 'Venues', icon: Building2 },
  { to: '/admin/organizers', label: 'Organizers', icon: Crown },
  { to: '/admin/collections', label: 'Collections', icon: Compass },
];

function SidebarContent({ collapsed = false, onNavigate }) {
  const location = useLocation();
  const { user } = useAuthStore();
  const logout = useLogout();

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white">
      <div className={cn('flex items-center gap-3 px-6 h-20 border-b border-white/10', collapsed && 'justify-center px-0')}>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-egyptian-gold to-[#B87333] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          <Shield className="h-5 w-5 text-deep-charcoal" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-xl font-heading font-bold text-white tracking-wide leading-none">EventHub</span>
            <span className="text-[10px] font-mono text-egyptian-gold uppercase tracking-widest mt-1">OS V2.0</span>
          </div>
        )}
      </div>
      
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} onClick={onNavigate}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full gap-3 transition-all duration-300',
                    collapsed ? 'justify-center px-2' : 'justify-start px-4',
                    isActive ? 'bg-egyptian-gold/10 text-egyptian-gold border border-egyptian-gold/20' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  )}
                  size={collapsed ? 'icon' : 'lg'}
                >
                  <link.icon className={cn("shrink-0", collapsed ? "w-5 h-5" : "w-4 h-4")} />
                  {!collapsed && <span className="font-mono uppercase text-xs tracking-widest">{link.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      
      <div className={cn('p-4 border-t border-white/10', collapsed && 'flex justify-center')}>
        {!collapsed ? (
          <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-white/10">
            <Avatar className="h-10 w-10 border border-egyptian-gold/30">
              <AvatarFallback className="bg-[#0a0a0a] text-egyptian-gold font-heading text-lg">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] font-mono text-egyptian-gold uppercase tracking-widest truncate">System Admin</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => logout.mutate()} className="shrink-0 text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => logout.mutate()} className="text-white/50 hover:text-red-400 hover:bg-red-400/10">
            <LogOut className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex text-white font-sans">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-white/10 bg-[#0a0a0a] transition-all duration-300 relative z-20 shadow-2xl',
          collapsed ? 'w-20' : 'w-72'
        )}
      >
        <SidebarContent collapsed={collapsed} />
        
        {/* Collapse Button */}
        <button
          className="absolute -right-3 top-24 w-6 h-6 bg-egyptian-gold rounded-full flex items-center justify-center border-2 border-[#111] text-deep-charcoal hover:scale-110 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.5)] z-50"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn('h-3 w-3 transition-transform duration-300', collapsed && 'rotate-180')} />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-egyptian-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between h-16 px-4">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 border-r border-white/10 bg-[#0a0a0a]">
                <SheetTitle className="sr-only">OS Navigation</SheetTitle>
                <SidebarContent onNavigate={() => setSheetOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-egyptian-gold" />
              <span className="font-heading font-bold text-white tracking-wide text-lg">EventHub OS</span>
            </div>
            <div className="w-10" />
          </div>
        </header>

        <main className="flex-1 relative z-10 overflow-auto custom-scrollbar">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
