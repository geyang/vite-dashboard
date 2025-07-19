import type { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { SiGithub } from 'react-icons/si';
import { signInWithGitHub } from '@/actions/authAction';

interface GitHubButtonProps extends PropsWithChildren {
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function GitHubButton({
  className,
  showIcon = true,
  variant = 'outline',
  size = 'default',
  children,
}: GitHubButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center justify-center ${className}`}
      onClick={signInWithGitHub}
    >
      {showIcon && <SiGithub className='mr-2 h-5 w-5' />}
      {children}
    </Button>
  );
}
