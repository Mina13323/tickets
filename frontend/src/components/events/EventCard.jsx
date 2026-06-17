import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function EventCard({ event }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/events/${event.id}`)}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden h-full border-border/50 hover:border-egyptian-gold/30 transition-colors">
        <div className="aspect-video relative overflow-hidden bg-muted">
          {event.image_url ? (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-egyptian-gold/20 to-egyptian-gold/5">
              <Calendar className="h-10 w-10 text-egyptian-gold/40" />
            </div>
          )}
          {event.category && (
            <Badge className="absolute top-3 left-3" variant="secondary">
              {event.category}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-base line-clamp-1 mb-1">{event.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{event.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(event.event_date)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
