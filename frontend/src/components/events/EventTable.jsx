import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Ticket, Calendar, MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function EventTable({ events, onEdit, onDelete, onManageTickets }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return {
      day: d.toLocaleDateString('en-US', { day: '2-digit' }),
      month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: d.toLocaleDateString('en-US', { year: 'numeric' })
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map((event, i) => {
        const date = formatDate(event.event_date);
        
        return (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-[#0a0a0a] rounded-[24px] border border-white/10 overflow-hidden hover:border-egyptian-gold/40 transition-all duration-500"
          >
            {/* Cover Image */}
            <div className="h-48 relative overflow-hidden bg-[#0a0a0a]">
              {event.image_url ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${event.image_url})` }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-12 h-12 text-white/5" />
                </div>
              )}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />

              {/* Date Badge */}
              {date && (
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md rounded-xl p-2 border border-white/10 flex flex-col items-center justify-center min-w-[50px]">
                  <span className="text-egyptian-gold font-mono text-[10px] tracking-widest">{date.month}</span>
                  <span className="text-white font-bold text-lg leading-none my-1">{date.day}</span>
                  <span className="text-white/50 font-mono text-[10px]">{date.year}</span>
                </div>
              )}
            </div>

            <div className="p-6 relative z-10">
              <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-egyptian-gold transition-colors line-clamp-1">{event.title}</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="w-4 h-4 text-egyptian-gold" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="truncate">{event.organizer}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <Button 
                  onClick={() => onManageTickets(event)}
                  className="flex-1 bg-egyptian-gold text-deep-charcoal hover:bg-white font-bold text-xs uppercase tracking-widest h-10"
                >
                  <Ticket className="w-4 h-4 mr-2" /> Tiers
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onEdit(event)}
                  className="w-10 h-10 border-white/10 text-white hover:text-white hover:bg-white/10 bg-transparent"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onDelete(event)}
                  className="w-10 h-10 border-white/10 text-white hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/30 bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
