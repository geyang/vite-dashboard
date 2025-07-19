'use client';

import { Link } from '@/components/Link';
import {
  BarChart,
  Building2,
  Feather,
  FileText,
  Home,
  LogOut,
  MoreHorizontal,
  Settings,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePageContext } from 'vike-react/usePageContext';

interface AppSidebarProps {
  user: {
    name: string;
    email: string;
    avatarUrl: string;
  };
  isAdmin?: boolean;
}

export function AppSidebar({ user, isAdmin = true }: AppSidebarProps) {
  const { urlPathname } = usePageContext();

  const userMenuItems = [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Notes', href: '/notes', icon: FileText },
    { title: 'Organizations', href: '/organizations', icon: Building2 },
  ];

  const adminMenuItems = [
    { title: 'Users', href: '/admin/users', icon: Users },
    { title: 'Organizations', href: '/admin/organizations', icon: Building2 },
    { title: 'Analytics', href: '/admin/analytics', icon: BarChart },
  ];

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <div className='flex items-center gap-2 p-2'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <Feather className='h-6 w-6' />
          </div>
          <div className='font-semibold text-lg group-data-[state=collapsed]:hidden'>
            AuthKit
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={urlPathname.startsWith(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span className='group-data-[state=collapsed]:hidden'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={urlPathname.startsWith(item.href)}
                        tooltip={item.title}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span className='group-data-[state=collapsed]:hidden'>
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className='flex items-center gap-3 p-2'>
          <Avatar className='size-10'>
            <AvatarImage
              src={user.avatarUrl || '/placeholder.svg'}
              alt={user.name}
            />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex-1 overflow-hidden group-data-[state=collapsed]:hidden'>
            <p className='truncate text-sm font-semibold'>{user.name}</p>
            <p className='truncate text-xs text-muted-foreground'>
              {user.email}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='size-8 shrink-0 group-data-[state=collapsed]:hidden'
              >
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuItem asChild>
                <Link href='/settings'>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/sign-in'>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Sign Out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
