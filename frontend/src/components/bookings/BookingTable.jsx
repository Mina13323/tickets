import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Calendar, User, Ticket, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const statusStyles = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  approved: 'bg-green-500/10 text-green-400 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
  cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export function BookingTable({ bookings, showActions = false, onApprove, onReject, processingId }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {bookings.map((booking, i) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-[#0a0a0a] rounded-[24px] border border-white/10 overflow-hidden flex flex-col sm:flex-row"
        >
          {/* Info Section */}
          <div className="flex-1 p-6 relative">
            <div className="absolute top-6 right-6">
              <Badge variant="outline" className={`capitalize font-mono tracking-widest text-[10px] ${statusStyles[booking.status]}`}>
                {booking.status}
              </Badge>
            </div>
            
            <h3 className="text-xl font-heading font-bold text-white mb-4 pr-24">{booking.event_title}</h3>
            
            <div className="space-y-3 mb-6">
              {showActions && (
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <User className="w-4 h-4 text-egyptian-gold" />
                  <span className="font-mono">{booking.user_name || booking.email}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Ticket className="w-4 h-4 text-egyptian-gold" />
                <span>{booking.quantity}x {booking.ticket_name}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Calendar className="w-4 h-4 text-egyptian-gold" />
                <span className="text-xs uppercase tracking-widest">{formatDate(booking.created_at)}</span>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-egyptian-gold">
              ${Number(booking.total_price).toFixed(2)}
            </div>
          </div>

          {/* Action Section */}
          {showActions && booking.status === 'pending' && (
            <div className="sm:w-32 bg-black/40 border-t sm:border-t-0 sm:border-l border-white/10 flex sm:flex-col items-center justify-center p-4 gap-4">
              <Button
                onClick={() => onApprove(booking.id)}
                disabled={processingId === booking.id}
                className="w-full h-12 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-black font-bold transition-all"
              >
                {processingId === booking.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-6 h-6" />}
              </Button>
              <Button
                onClick={() => onReject(booking.id)}
                disabled={processingId === booking.id}
                className="w-full h-12 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black transition-all"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
