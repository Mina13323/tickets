import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Ticket as TicketIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function TicketTypeTable({ ticketTypes, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ticketTypes.map((tt, i) => {
        const available = tt.quantity - (tt.sold || 0);
        const soldOut = available <= 0;
        const percentSold = Math.min(100, Math.round(((tt.sold || 0) / tt.quantity) * 100)) || 0;

        return (
          <motion.div
            key={tt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-[#0a0a0a] rounded-[24px] border border-white/10 overflow-hidden hover:border-egyptian-gold/40 transition-all duration-500"
          >
            {/* Top Pattern */}
            <div className="h-16 bg-gradient-to-r from-egyptian-gold/20 to-transparent relative border-b border-white/10 flex items-center px-6">
              <TicketIcon className="w-5 h-5 text-egyptian-gold opacity-80 mr-3" />
              <h3 className="text-xl font-heading font-bold text-white uppercase tracking-widest">{tt.name}</h3>
            </div>

            <div className="p-6">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-egyptian-gold">${Number(tt.price).toFixed(2)}</span>
                <span className="text-sm text-white/50 uppercase tracking-widest">/ Ticket</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-mono uppercase text-white/70">
                  <span>Sold: {tt.sold || 0}</span>
                  <span>Total: {tt.quantity}</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-egyptian-gold to-yellow-300"
                    style={{ width: `${percentSold}%` }}
                  />
                </div>
                {soldOut ? (
                  <p className="text-xs text-red-400 font-bold uppercase tracking-widest text-center mt-2">Sold Out</p>
                ) : (
                  <p className="text-xs text-green-400 font-bold uppercase tracking-widest text-center mt-2">{available} Available</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <Button 
                  onClick={() => onEdit(tt)}
                  className="flex-1 bg-white/5 text-white hover:bg-white hover:text-black font-bold text-xs uppercase tracking-widest h-10 transition-colors"
                >
                  <Pencil className="w-4 h-4 mr-2" /> Edit Tier
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onDelete(tt)}
                  className="w-10 h-10 border-white/10 text-white hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/30 bg-transparent transition-colors"
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
