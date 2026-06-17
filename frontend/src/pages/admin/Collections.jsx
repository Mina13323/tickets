import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';
import { Compass, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Collections() {
  const { data: collections, isLoading } = useQuery({
    queryKey: ['admin-collections'],
    queryFn: async () => {
      const res = await axios.get('/collections');
      return res.data.collections;
    }
  });

  return (
    <div className="text-white font-sans p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <Compass className="w-8 h-8 text-egyptian-gold" />
            Curated Collections
          </h1>
          <p className="text-sm text-white/50 font-mono tracking-widest uppercase mt-2">Manage Themed Event Groups</p>
        </div>
        <Button className="bg-egyptian-gold text-deep-charcoal hover:bg-white font-bold gap-2">
          <Plus className="w-4 h-4" /> Create Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-white/50">Loading collections...</div>
        ) : collections?.length === 0 ? (
          <div className="col-span-full text-center py-24 bg-[#0a0a0a] rounded-3xl border border-white/10">
            <Compass className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-heading text-white">No collections found</h3>
            <p className="text-sm text-white/50">Group events into premium collections for the homepage.</p>
          </div>
        ) : (
          collections?.map((collection) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group hover:border-egyptian-gold/30 transition-all h-64 relative"
            >
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-70 transition-opacity" style={{ backgroundImage: `url(${collection.image_url || 'https://images.unsplash.com/photo-1539650116574-8efeb43e2b50?q=80&w=1000'})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-heading text-white mb-1 group-hover:text-egyptian-gold transition-colors">{collection.title}</h3>
                <p className="text-sm text-white/70">{collection.subtitle}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm" className="w-full border-white/10 hover:bg-white/10 bg-transparent text-white">
                    Edit Collection
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
