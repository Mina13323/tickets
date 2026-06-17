import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { usePendingBookings, useApproveBooking, useRejectBooking } from '@/hooks/useBookings';
import { BookingTable } from '@/components/bookings/BookingTable';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { ClipboardList } from 'lucide-react';

export default function Bookings() {
  const { data: bookings, isLoading, isError, refetch } = usePendingBookings();
  const approveBooking = useApproveBooking();
  const rejectBooking = useRejectBooking();

  const [confirmAction, setConfirmAction] = useState(null); // { id, type: 'approve' | 'reject' }
  const [processingId, setProcessingId] = useState(null);

  const handleConfirm = () => {
    if (!confirmAction) return;
    setProcessingId(confirmAction.id);

    const mutation = confirmAction.type === 'approve' ? approveBooking : rejectBooking;
    mutation.mutate(confirmAction.id, {
      onSettled: () => {
        setProcessingId(null);
        setConfirmAction(null);
      },
    });
  };

  return (
    <div className="text-white font-sans p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Activity Logs</h1>
        <p className="text-sm text-white/50 font-mono tracking-widest uppercase">Review Booking Requests</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full rounded-[24px] bg-white/5" />
          <Skeleton className="h-48 w-full rounded-[24px] bg-white/5" />
        </div>
      )}

      {isError && <ErrorState message="Failed to load bookings" onRetry={refetch} />}

      {!isLoading && !isError && (!bookings || bookings.length === 0) && (
        <EmptyState
          icon={ClipboardList}
          title="No pending requests"
          description="All bookings have been processed"
        />
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <BookingTable
          bookings={bookings}
          showActions
          onApprove={(id) => setConfirmAction({ id, type: 'approve' })}
          onReject={(id) => setConfirmAction({ id, type: 'reject' })}
          processingId={processingId}
        />
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent className="bg-[#0a0a0a] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-heading text-egyptian-gold">
              {confirmAction?.type === 'approve' ? 'Approve Booking' : 'Reject Booking'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              {confirmAction?.type === 'approve'
                ? 'Are you sure you want to approve this booking? The tickets will be allocated.'
                : 'Are you sure you want to reject this booking?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:text-white hover:bg-white/5">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                confirmAction?.type === 'approve'
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
              }
            >
              {confirmAction?.type === 'approve' ? 'Approve' : 'Reject'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
