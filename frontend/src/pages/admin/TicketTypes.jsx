import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useEvents } from '@/hooks/useEvents';
import { useTicketTypesByEvent, useCreateTicketType, useUpdateTicketType, useDeleteTicketType } from '@/hooks/useTicketTypes';
import { TicketTypeForm } from '@/components/ticketTypes/TicketTypeForm';
import { TicketTypeTable } from '@/components/ticketTypes/TicketTypeTable';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';

export default function TicketTypes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: events, isLoading: eventsLoading } = useEvents();

  const [selectedEventId, setSelectedEventId] = useState(searchParams.get('eventId') || '');
  const { data: ticketTypes, isLoading: ttLoading, isError: ttError, refetch: ttRefetch } = useTicketTypesByEvent(selectedEventId);

  const createTT = useCreateTicketType();
  const updateTT = useUpdateTicketType();
  const deleteTT = useDeleteTicketType();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const eid = searchParams.get('eventId');
    if (eid) setSelectedEventId(eid);
  }, [searchParams]);

  const handleCreate = (data) => {
    createTT.mutate(
      { ...data, event_id: Number(selectedEventId) },
      { onSuccess: () => setCreateOpen(false) }
    );
  };

  const handleUpdate = (data) => {
    updateTT.mutate(
      { id: editTarget.id, data },
      { onSuccess: () => setEditTarget(null) }
    );
  };

  const handleDelete = () => {
    deleteTT.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const urlEventId = searchParams.get('eventId');
  const eventTitle =
    (String(selectedEventId) === String(urlEventId) && searchParams.get('eventTitle')) ||
    events?.find((e) => String(e.id) === String(selectedEventId))?.title ||
    '';

  return (
    <div className="text-white font-sans p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Ticket Tiers</h1>
        <p className="text-sm text-white/50 font-mono tracking-widest uppercase">Configure Access Levels</p>
      </div>

      {/* Event Selector */}
      <div className="mb-10 max-w-sm bg-[#0a0a0a] p-6 rounded-3xl border border-white/10">
        <Label className="mb-3 block text-white font-mono uppercase tracking-widest text-xs">Select Experience</Label>
        {eventsLoading ? (
          <Skeleton className="h-10 w-full bg-white/5" />
        ) : (
          <Select
            value={selectedEventId}
            onValueChange={(value) => {
              setSelectedEventId(value);
              setSearchParams({ eventId: value });
            }}
          >
            <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white focus:ring-egyptian-gold focus:ring-offset-0">
              <SelectValue placeholder="Choose an experience" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
              {events?.map((event) => (
                <SelectItem key={event.id} value={String(event.id)} className="focus:bg-egyptian-gold/20 focus:text-egyptian-gold cursor-pointer">
                  {event.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {!selectedEventId && (
        <EmptyState title="No Experience Selected" description="Choose an experience above to manage its ticket tiers" />
      )}

      {selectedEventId && (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-heading font-bold text-egyptian-gold">{eventTitle}</h2>
            <Button onClick={() => setCreateOpen(true)} size="sm" className="bg-egyptian-gold text-deep-charcoal hover:bg-white font-bold gap-2">
              <Plus className="w-4 h-4" />
              Add Tier
            </Button>
          </div>

          {ttLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton className="h-48 w-full rounded-[24px] bg-white/5" />
              <Skeleton className="h-48 w-full rounded-[24px] bg-white/5" />
              <Skeleton className="h-48 w-full rounded-[24px] bg-white/5" />
            </div>
          )}

          {ttError && <ErrorState message="Failed to load ticket tiers" onRetry={ttRefetch} />}

          {!ttLoading && !ttError && (!ticketTypes || ticketTypes.length === 0) && (
            <EmptyState
              title="No ticket tiers yet"
              description="Create the first access level for this experience"
              action={
                <Button onClick={() => setCreateOpen(true)} className="bg-egyptian-gold text-deep-charcoal hover:bg-white font-bold mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tier
                </Button>
              }
            />
          )}

          {!ttLoading && !ttError && ticketTypes && ticketTypes.length > 0 && (
            <TicketTypeTable
              ticketTypes={ticketTypes}
              onEdit={setEditTarget}
              onDelete={setDeleteTarget}
            />
          )}
        </>
      )}

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-egyptian-gold">Add Ticket Tier</DialogTitle>
          </DialogHeader>
          <TicketTypeForm onSubmit={handleCreate} isSubmitting={createTT.isPending} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
        <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-egyptian-gold">Edit Ticket Tier</DialogTitle>
          </DialogHeader>
          {editTarget && (
            <TicketTypeForm
              defaultValues={editTarget}
              onSubmit={handleUpdate}
              isSubmitting={updateTT.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[#0a0a0a] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-heading">Delete Ticket Tier</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Are you sure you want to permanently delete the &quot;{deleteTarget?.name}&quot; tier? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:text-white hover:bg-white/5">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30">
              Delete Forever
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
