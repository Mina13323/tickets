import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  approved: 'bg-green-500/10 text-green-600 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-600 border-red-500/20',
  cancelled: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

export function RecentBookingsTable({ bookings }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Event</TableHead>
            <TableHead className="hidden sm:table-cell">Ticket</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.user_name}</TableCell>
              <TableCell className="font-medium">{b.event_title}</TableCell>
              <TableCell className="hidden sm:table-cell">{b.ticket_name}</TableCell>
              <TableCell>{b.quantity}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn('capitalize', statusStyles[b.status])}>
                  {b.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(b.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
