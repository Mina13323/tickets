import { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '@/hooks/useEvents';
import { EventTable } from '@/components/events/EventTable';
import { EventForm } from '@/components/events/EventForm';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const navigate = useNavigate();
  const { data: events, isLoading, isError, refetch } = useEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [createOpen, setCreateOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleCreate = (data) => {
    createEvent.mutate(data, {
      onSuccess: () => setCreateOpen(false),
    });
  };

  const handleUpdate = (data) => {
    updateEvent.mutate(
      { id: editEvent.id, data },
      { onSuccess: () => setEditEvent(null) }
    );
  };

  const handleDelete = () => {
    deleteEvent.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  return (
    <div className="text-white font-sans p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-egyptian-gold" />
            Experience Manager
          </h1>
          <p className="text-sm text-white/50 font-mono tracking-widest uppercase mt-2">Create and Orchestrate Events</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="bg-egyptian-gold text-deep-charcoal hover:bg-white font-bold gap-2">
          <Plus className="w-4 h-4" />
          Create Experience
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}

      {isError && <ErrorState message="Failed to load events" onRetry={refetch} />}

      {!isLoading && !isError && (!events || events.length === 0) && (
        <EmptyState
          title="No events yet"
          description="Create your first event"
          action={
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          }
        />
      )}

      {!isLoading && !isError && events && events.length > 0 && (
        <EventTable
          events={events}
          onEdit={setEditEvent}
          onDelete={setDeleteTarget}
          onManageTickets={(event) => navigate(`/admin/ticket-types?eventId=${event.id}&eventTitle=${encodeURIComponent(event.title)}`)}
        />
      )}

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-egyptian-gold">Create Experience</DialogTitle>
          </DialogHeader>
          <EventForm onSubmit={handleCreate} isSubmitting={createEvent.isPending} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editEvent} onOpenChange={(open) => !open && setEditEvent(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-egyptian-gold">Edit Experience</DialogTitle>
          </DialogHeader>
          {editEvent && (
            <EventForm
              defaultValues={editEvent}
              onSubmit={handleUpdate}
              isSubmitting={updateEvent.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[#0a0a0a] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-heading">Delete Experience</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Are you sure you want to permanently delete &quot;{deleteTarget?.title}&quot;? This action cannot be undone.
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
