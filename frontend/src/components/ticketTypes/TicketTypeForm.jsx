import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const ticketTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  quantity: z.coerce.number().int().positive('Quantity must be greater than 0'),
});

export function TicketTypeForm({ defaultValues, onSubmit, isSubmitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ticketTypeSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      price: defaultValues?.price || '',
      quantity: defaultValues?.quantity || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
      <div className="space-y-2">
        <Label htmlFor="tt-name" className="text-white font-mono uppercase tracking-widest text-xs">Name</Label>
        <Input id="tt-name" placeholder="e.g. VIP, General" {...register('name')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
        {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tt-price" className="text-white font-mono uppercase tracking-widest text-xs">Price ($)</Label>
          <Input id="tt-price" type="number" step="0.01" {...register('price')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
          {errors.price && <p className="text-xs text-red-400">{errors.price.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="tt-quantity" className="text-white font-mono uppercase tracking-widest text-xs">Quantity</Label>
          <Input id="tt-quantity" type="number" {...register('quantity')} className="bg-[#0a0a0a] border-white/10 text-white focus:border-egyptian-gold/50" />
          {errors.quantity && <p className="text-xs text-red-400">{errors.quantity.message}</p>}
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting} className="bg-egyptian-gold text-deep-charcoal hover:bg-white font-bold px-8 w-full md:w-auto">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {defaultValues ? 'Save Changes' : 'Create Tier'}
        </Button>
      </div>
    </form>
  );
}
