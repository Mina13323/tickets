import React from 'react';
import { motion } from 'framer-motion';
import { useDashboardStats, useRecentBookings } from '@/hooks/useDashboard';
import { 
  Calendar, Ticket, Users, DollarSign, Activity, 
  MapPin, Building2, Music, Crown, Compass, TrendingUp, Settings, Bell, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
};

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: bookings, isLoading: bookingsLoading } = useRecentBookings();

  const totalRevenue = stats?.total_revenue || 0;
  const totalEvents = stats?.total_events || 0;
  const totalBookings = stats?.total_bookings || 0;
  const activeUsers = stats?.active_users || 0;

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white p-4 md:p-8 font-sans w-full max-w-[1600px] mx-auto">
      
      {/* OS Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Shield className="w-5 h-5 text-egyptian-gold" />
            <h1 className="text-3xl font-heading font-bold text-white tracking-wide">EventHub OS</h1>
          </div>
          <p className="text-white/50 font-mono text-xs uppercase tracking-widest">Command Center V2.0 // Active</p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 p-2 rounded-xl">
          <div className="flex items-center gap-2 px-4 py-2 border-r border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-mono text-white">System Online</span>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/70 hover:text-white">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/70 hover:text-white mr-2">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-[160px]"
      >
        {/* Core Metrics - Bento Box Row 1 */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-egyptian-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <DollarSign className="absolute top-6 right-6 w-12 h-12 text-egyptian-gold/20 transform group-hover:scale-110 transition-transform duration-500" />
          <div className="h-full flex flex-col justify-between relative z-10">
            <span className="text-xs font-mono tracking-widest uppercase text-white/50">Total Revenue</span>
            <div>
              <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5% vs last month</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-1 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-egyptian-gold/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-egyptian-gold/10 flex items-center justify-center">
            <Ticket className="w-5 h-5 text-egyptian-gold" />
          </div>
          <div>
            <span className="text-3xl font-bold text-white block">{totalBookings}</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Bookings</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-1 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-egyptian-gold/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <span className="text-3xl font-bold text-white block">{totalEvents}</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Events</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-egyptian-gold/30 transition-colors relative overflow-hidden">
          <Activity className="absolute bottom-4 right-4 w-24 h-24 text-white/5" />
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center relative z-10">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div className="relative z-10">
            <span className="text-3xl font-bold text-white block">{activeUsers}</span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Active Users</span>
          </div>
        </motion.div>

        {/* Management Portals - Bento Box Row 2 & 3 */}
        
        {/* Main Event Manager */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-[#0a0a0a] p-1 rounded-3xl border border-white/10 group cursor-pointer hover:border-egyptian-gold transition-all duration-300">
          <Link to="/admin/events" className="w-full h-full bg-[#0D0D0D] rounded-[22px] p-6 flex flex-col relative overflow-hidden block">
            <div className="absolute top-0 right-0 w-32 h-32 bg-egyptian-gold/5 blur-3xl rounded-full"></div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-egyptian-gold to-[#B87333] flex items-center justify-center mb-auto shadow-lg shadow-egyptian-gold/20">
              <Calendar className="w-7 h-7 text-deep-charcoal" />
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-heading text-white mb-2">Experience Manager</h3>
              <p className="text-white/60 text-sm">Create, edit, and orchestrate cinematic events across Egypt.</p>
            </div>
          </Link>
        </motion.div>

        {/* Recent Activity List */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h3 className="text-sm font-mono tracking-widest uppercase text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-egyptian-gold" /> Live Activity Feed
            </h3>
            <Link to="/admin/bookings" className="text-[10px] text-egyptian-gold uppercase hover:underline">View All</Link>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {bookingsLoading ? (
               <div className="text-white/40 text-sm">Loading activity...</div>
            ) : bookings?.slice(0, 4).map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-egyptian-gold/10 flex items-center justify-center">
                    <Ticket className="w-4 h-4 text-egyptian-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium truncate max-w-[120px] lg:max-w-[150px]">{booking.event_title}</p>
                    <p className="text-[10px] text-white/50">{booking.user_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white font-mono">${booking.total_price}</p>
                  <p className="text-[10px] text-green-400">Success</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Small Action Blocks */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-1 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 hover:border-white/10 transition-all cursor-pointer flex flex-col justify-center items-center text-center group">
          <Link to="/admin/ticket-types" className="w-full h-full flex flex-col items-center justify-center">
            <Ticket className="w-8 h-8 text-white/50 mb-3 group-hover:text-white transition-colors" />
            <span className="text-xs font-mono uppercase tracking-widest text-white">Ticket Tiers</span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-1 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 hover:border-white/10 transition-all cursor-pointer flex flex-col justify-center items-center text-center group">
          <Link to="/admin/venues" className="w-full h-full flex flex-col items-center justify-center">
            <Building2 className="w-8 h-8 text-white/50 mb-3 group-hover:text-white transition-colors" />
            <span className="text-xs font-mono uppercase tracking-widest text-white">Venues</span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-1 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 hover:border-white/10 transition-all cursor-pointer flex flex-col justify-center items-center text-center group">
          <Link to="/admin/organizers" className="w-full h-full flex flex-col items-center justify-center">
            <Crown className="w-8 h-8 text-white/50 mb-3 group-hover:text-white transition-colors" />
            <span className="text-xs font-mono uppercase tracking-widest text-white">Organizers</span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-1 bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 hover:border-white/10 transition-all cursor-pointer flex flex-col justify-center items-center text-center group">
          <Link to="/admin/collections" className="w-full h-full flex flex-col items-center justify-center">
            <Compass className="w-8 h-8 text-white/50 mb-3 group-hover:text-white transition-colors" />
            <span className="text-xs font-mono uppercase tracking-widest text-white">Collections</span>
          </Link>
        </motion.div>

      </motion.div>

    </div>
  );
}
