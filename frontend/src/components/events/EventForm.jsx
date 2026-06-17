import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image_url: z.string().optional().default(''),
  organizer: z.string().min(1, 'Organizer is required'),
  location: z.string().min(1, 'Location is required'),
  venue_name: z.string().min(1, 'Venue name is required'),
  venue_address: z.string().min(1, 'Venue address is required'),
  event_date: z.string().min(1, 'Date is required'),
  facilities: z.string().optional().default(''),
});

export function EventForm({ defaultValues, onSubmit, isSubmitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      image_url: defaultValues?.image_url || '',
      organizer: defaultValues?.organizer || '',
      location: defaultValues?.location || '',
      venue_name: defaultValues?.venue_name || '',
      venue_address: defaultValues?.venue_address || '',
      event_date: defaultValues?.event_date ? new Date(defaultValues.event_date).toISOString().split('T')[0] : '',
      facilities: Array.isArray(defaultValues?.facilities)
        ? defaultValues.facilities.join(', ')
        : (typeof defaultValues?.facilities === 'string' && defaultValues.facilities)
          ? (() => { try { return JSON.parse(defaultValues.facilities).join(', '); } catch { return defaultValues.facilities; } })()
          : '',
    },
  });

  const processSubmit = (data) => {
    const facilitiesArray = data.facilities
      ? data.facilities.split(',').map((f) => f.trim()).filter(Boolean)
      : [];
    onSubmit({
      ...data,
      facilities: JSON.stringify(facilitiesArray),
    });
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-6 text-white">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white font-mono uppercase tracking-widest text-xs">Title</Label>
          <Input id="title" {...register('title')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
          {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="organizer" className="text-white font-mono uppercase tracking-widest text-xs">Organizer</Label>
          <Input id="organizer" {...register('organizer')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
          {errors.organizer && <p className="text-xs text-red-400">{errors.organizer.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-white font-mono uppercase tracking-widest text-xs">Description</Label>
        <Textarea id="description" rows={3} {...register('description')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
        {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white font-mono uppercase tracking-widest text-xs">Location</Label>
          <Input id="location" {...register('location')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
          {errors.location && <p className="text-xs text-red-400">{errors.location.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="event_date" className="text-white font-mono uppercase tracking-widest text-xs">Date</Label>
          <Input id="event_date" type="date" {...register('event_date')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50 dark:[color-scheme:dark]" />
          {errors.event_date && <p className="text-xs text-red-400">{errors.event_date.message}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="venue_name" className="text-white font-mono uppercase tracking-widest text-xs">Venue Name</Label>
          <Input id="venue_name" {...register('venue_name')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
          {errors.venue_name && <p className="text-xs text-red-400">{errors.venue_name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="venue_address" className="text-white font-mono uppercase tracking-widest text-xs">Venue Address</Label>
          <Input id="venue_address" {...register('venue_address')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
          {errors.venue_address && <p className="text-xs text-red-400">{errors.venue_address.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url" className="text-white font-mono uppercase tracking-widest text-xs">Cover Image URL</Label>
        <Input id="image_url" placeholder="https://..." {...register('image_url')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="facilities" className="text-white font-mono uppercase tracking-widest text-xs">Facilities (comma separated)</Label>
        <Input id="facilities" placeholder="WiFi, Parking, Food Court" {...register('facilities')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting} className="bg-egyptian-gold text-deep-charcoal hover:bg-white font-bold w-full md:w-auto px-8">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {defaultValues ? 'Save Changes' : 'Launch Experience'}
        </Button>
      </div>
    </form>
  );
}
