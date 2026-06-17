import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import { Building2, Plus, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Venues() {
  const { data: venues, isLoading } = useQuery({
    queryKey: ['admin-venues'],
    queryFn: async () => {
      const res = await axios.get('/venues');
      return res.data.venues;
    }
  });

  return (
    <div className="text-white font-sans p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <Building2 className="w-8 h-8 text-egyptian-gold" />
            Venues
          </h1>
          <p className="text-sm text-white/50 font-mono tracking-widest uppercase mt-2">Manage Event Locations</p>
        </div>
        <Button className="bg-egyptian-gold text-deep-charcoal hover:bg-white font-bold gap-2">
          <Plus className="w-4 h-4" /> Add Venue
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-white/50">Loading venues...</div>
        ) : venues?.length === 0 ? (
          <div className="col-span-full text-center py-24 bg-[#0a0a0a] rounded-3xl border border-white/10">
            <Building2 className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-heading text-white">No venues configured</h3>
            <p className="text-sm text-white/50">Add your first venue to start hosting events.</p>
          </div>
        ) : (
          venues?.map((venue) => (
            <motion.div 
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group hover:border-egyptian-gold/30 transition-all"
            >
              <div className="h-48 bg-[#0a0a0a] relative">
                {venue.image_url ? (
                  <img src={venue.image_url} alt={venue.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-white/5" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading text-white mb-2">{venue.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <MapPin className="w-4 h-4 text-egyptian-gold" /> {venue.location}
                  </div>
                  {venue.capacity && (
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Users className="w-4 h-4 text-blue-400" /> {venue.capacity} Capacity
                    </div>
                  )}
                </div>
                <Button variant="outline" className="w-full border-white/10 hover:border-egyptian-gold hover:text-egyptian-gold bg-transparent">
                  Edit Details
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
