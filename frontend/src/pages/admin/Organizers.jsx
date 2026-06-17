import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import { Crown, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Organizers() {
  const { data: organizers, isLoading } = useQuery({
    queryKey: ['admin-organizers'],
    queryFn: async () => {
      const res = await axios.get('/organizers');
      return res.data.organizers;
    }
  });

  return (
    <div className="text-white font-sans p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <Crown className="w-8 h-8 text-egyptian-gold" />
            Organizers
          </h1>
          <p className="text-sm text-white/50 font-mono tracking-widest uppercase mt-2">Manage Experience Creators</p>
        </div>
        <Button className="bg-egyptian-gold text-deep-charcoal hover:bg-white font-bold gap-2">
          <Plus className="w-4 h-4" /> Add Organizer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full text-white/50">Loading organizers...</div>
        ) : organizers?.length === 0 ? (
          <div className="col-span-full text-center py-24 bg-[#0a0a0a] rounded-3xl border border-white/10">
            <Crown className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-heading text-white">No organizers found</h3>
            <p className="text-sm text-white/50">Add event creators to attribute experiences to them.</p>
          </div>
        ) : (
          organizers?.map((org) => (
            <motion.div 
              key={org.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 text-center group hover:border-egyptian-gold/30 transition-all flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/10 flex items-center justify-center mb-4 overflow-hidden relative">
                {org.logo_url ? (
                  <img src={org.logo_url} alt={org.name} className="w-full h-full object-cover" />
                ) : (
                  <Crown className="w-8 h-8 text-egyptian-gold/50" />
                )}
              </div>
              <h3 className="text-xl font-heading text-white mb-1">{org.name}</h3>
              <div className="flex items-center gap-1 text-xs text-white/50 font-mono tracking-widest mb-4">
                <Users className="w-3 h-3 text-purple-400" /> {org.followers || 0} Followers
              </div>
              <Button variant="outline" size="sm" className="w-full border-white/10 hover:border-egyptian-gold hover:text-egyptian-gold bg-transparent mt-auto">
                Manage Profile
              </Button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
