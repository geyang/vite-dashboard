import { useState } from 'react';
import {
  CursorDiv,
  CursorProvider,
  CursorTableRow,
} from '@/components/highlight-cursor';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample users data
const users = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email_address: 'john.doe@example.com',
    image_url: '/avatars/john-doe.png',
    last_sign_in_at: Date.now() - 86400000, // yesterday
    created_at: Date.now() - 30 * 86400000, // 30 days ago
    banned: false,
    locked: false,
  },
  {
    id: '2',
    first_name: 'Jane',
    last_name: 'Smith',
    email_address: 'jane.smith@example.com',
    image_url: '/avatars/jane-smith.png',
    last_sign_in_at: Date.now() - 7 * 86400000, // 7 days ago
    created_at: Date.now() - 60 * 86400000, // 60 days ago
    banned: false,
    locked: true,
  },
  {
    id: '3',
    first_name: 'Alex',
    last_name: 'Johnson',
    email_address: 'alex.johnson@example.com',
    image_url: '/avatars/alex-johnson.png',
    last_sign_in_at: Date.now() - 2 * 86400000, // 2 days ago
    created_at: Date.now() - 45 * 86400000, // 45 days ago
    banned: true,
    locked: false,
  },
];

export default function HighlightCursorExample() {
  const [cursorConfig, setCursorConfig] = useState({
    maxOffsetX: 5,
    maxOffsetY: 20,
    cursorSize: 20,
    transitionDuration: 100,
  });

  const getStatusBadge = (user: (typeof users)[0]) => {
    if (user.banned) {
      return (
        <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'>
          Banned
        </span>
      );
    }
    if (user.locked) {
      return (
        <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'>
          Locked
        </span>
      );
    }
    return (
      <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'>
        Active
      </span>
    );
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <CursorProvider
      maxOffsetX={cursorConfig.maxOffsetX}
      maxOffsetY={cursorConfig.maxOffsetY}
      cursorSize={cursorConfig.cursorSize}
      transitionDuration={cursorConfig.transitionDuration}
    >
      <div className='min-h-screen bg-background flex flex-col items-center p-8'>
        <div className='w-full max-w-4xl'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-foreground'>
              Highlight Cursor Example
            </h1>
            <p className='text-muted-foreground'>
              Demonstrating the cursor highlight effect on different elements
            </p>
          </div>

          <div className='space-y-8'>
            {/* Configuration Controls */}
            <CursorDiv className='p-6 rounded-lg border bg-card'>
              <h2 className='text-lg font-semibold mb-4'>
                Cursor Configuration
              </h2>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Max Offset X: {cursorConfig.maxOffsetX}px
                  </label>
                  <input
                    type='range'
                    min='0'
                    max='20'
                    value={cursorConfig.maxOffsetX}
                    onChange={(e) =>
                      setCursorConfig({
                        ...cursorConfig,
                        maxOffsetX: parseInt(e.target.value),
                      })
                    }
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Max Offset Y: {cursorConfig.maxOffsetY}px
                  </label>
                  <input
                    type='range'
                    min='0'
                    max='50'
                    value={cursorConfig.maxOffsetY}
                    onChange={(e) =>
                      setCursorConfig({
                        ...cursorConfig,
                        maxOffsetY: parseInt(e.target.value),
                      })
                    }
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Cursor Size: {cursorConfig.cursorSize}px
                  </label>
                  <input
                    type='range'
                    min='10'
                    max='40'
                    value={cursorConfig.cursorSize}
                    onChange={(e) =>
                      setCursorConfig({
                        ...cursorConfig,
                        cursorSize: parseInt(e.target.value),
                      })
                    }
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Transition: {cursorConfig.transitionDuration}ms
                  </label>
                  <input
                    type='range'
                    min='50'
                    max='300'
                    step='10'
                    value={cursorConfig.transitionDuration}
                    onChange={(e) =>
                      setCursorConfig({
                        ...cursorConfig,
                        transitionDuration: parseInt(e.target.value),
                      })
                    }
                    className='w-full'
                  />
                </div>
              </div>
            </CursorDiv>

            {/* Card Examples */}
            <div className='grid grid-cols-2 gap-4'>
              <CursorDiv className='p-6 rounded-lg border bg-card'>
                <h3 className='font-semibold'>Card Example 1</h3>
                <p className='text-muted-foreground'>
                  Hover over this card to see the cursor effect
                </p>
              </CursorDiv>

              <CursorDiv className='p-6 rounded-lg border bg-card'>
                <h3 className='font-semibold'>Card Example 2</h3>
                <p className='text-muted-foreground'>
                  Try moving your mouse across different elements
                </p>
              </CursorDiv>
            </div>

            {/* Table Example */}
            <div className='rounded-md border bg-card'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[300px]'>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Signed In</TableHead>
                    <TableHead>Date Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <CursorTableRow key={user.id} className='hover:bg-muted/50'>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-3'>
                          <Avatar>
                            <AvatarImage
                              src={user.image_url || '/placeholder.svg'}
                              alt={`${user.first_name} ${user.last_name}`}
                            />
                            <AvatarFallback>
                              {user.first_name[0]}
                              {user.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className='font-semibold'>
                              {user.first_name} {user.last_name}
                            </div>
                            <div className='text-sm text-muted-foreground'>
                              {user.email_address}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user)}</TableCell>
                      <TableCell>{formatDate(user.last_sign_in_at)}</TableCell>
                      <TableCell>{formatDate(user.created_at)}</TableCell>
                    </CursorTableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Buttons Example */}
            <div className='flex gap-4 justify-center'>
              <CursorDiv className='px-4 py-2 bg-primary text-primary-foreground rounded-md'>
                Primary Button
              </CursorDiv>
              <CursorDiv className='px-4 py-2 bg-secondary text-secondary-foreground rounded-md'>
                Secondary Button
              </CursorDiv>
              <CursorDiv className='px-4 py-2 bg-destructive text-destructive-foreground rounded-md'>
                Danger Button
              </CursorDiv>
            </div>
          </div>
        </div>
      </div>
    </CursorProvider>
  );
}
