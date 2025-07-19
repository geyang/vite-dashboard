'use client';

import { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { SiGoogle } from 'react-icons/si';
import { signInWithGoogle } from '@/actions/authAction';

interface GoogleButtonProps extends PropsWithChildren {
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function GoogleButton({
  className,
  showIcon = true,
  variant = 'outline',
  size = 'default',
  children,
}: GoogleButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center justify-center ${className}`}
      onClick={signInWithGoogle}
    >
      {showIcon && <SiGoogle className='mr-2 h-5 w-5' />}
      {children}
    </Button>
  );
}
