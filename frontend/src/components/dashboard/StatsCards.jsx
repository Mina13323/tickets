import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Ticket, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

function AnimatedNumber({ value, prefix = '', isCurrency = false }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    const duration = 1000;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setDisplay(current);
      if (step >= steps) {
        setDisplay(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formatted = isCurrency
    ? `${prefix}${display.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${prefix}${Math.round(display).toLocaleString()}`;

  return <span>{formatted}</span>;
}

const statsConfig = [
  { key: 'totalUsers', label: 'Total Users', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { key: 'totalEvents', label: 'Total Events', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { key: 'totalBookings', label: 'Total Bookings', icon: Ticket, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { key: 'pendingBookings', label: 'Pending', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { key: 'approvedBookings', label: 'Approved', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  { key: 'revenue', label: 'Revenue', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10', isCurrency: true, prefix: '$' },
];

export function StatsCards({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {statsConfig.map((cfg, i) => (
        <motion.div
          key={cfg.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${cfg.bg}`}>
                  <cfg.icon className={`h-5 w-5 ${cfg.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{cfg.label}</p>
                  <p className="text-2xl font-bold">
                    <AnimatedNumber
                      value={stats?.[cfg.key] || 0}
                      prefix={cfg.prefix || ''}
                      isCurrency={cfg.isCurrency || false}
                    />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
