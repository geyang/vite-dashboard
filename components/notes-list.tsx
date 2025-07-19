import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

interface NotesListProps {
  title: string;
  notes: Note[];
  showCreateButton?: boolean;
}

export function NotesList({
  title,
  notes,
  showCreateButton = false,
}: NotesListProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium'>{title}</h3>
        {showCreateButton && (
          <Button size='sm' variant='outline'>
            <PlusCircle className='mr-2 h-4 w-4' />
            New Note
          </Button>
        )}
      </div>

      <div className='space-y-2'>
        {notes.map((note) => (
          <div
            key={note.id}
            className='rounded-md border p-4 cursor-pointer hover:bg-muted/50 transition-colors'
          >
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>{note.title}</h4>
              <span className='text-xs text-muted-foreground'>
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className='mt-1 text-sm text-muted-foreground'>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
