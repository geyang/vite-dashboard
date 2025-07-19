'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { authClient } from '@/lib/auth-client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInFormSchema } from '@/lib/auth-schema';
import { toast } from 'sonner';
import type { z } from 'zod';
import { GitHubButton } from '../github-button';
import { GoogleButton } from '../google-button';

type FormData = z.infer<typeof signInFormSchema>;

export function SignInForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          window.location.href = '/dashboard';
        },
        onError: ({ error }) => {
          const message =
            typeof error === 'string' ? error : 'Failed to sign in';
          toast.error(message);
        },
      },
    );
  };

  const signInWithGoogle = async () => {
    await authClient.signIn.social(
      {
        provider: 'google',
      },
      {
        onSuccess: () => {
          window.location.href = '/dashboard';
        },
        onError: ({ error }) => {
          const message =
            typeof error === 'string' ? error : 'Failed to sign in with Google';
          toast.error(message);
        },
      },
    );
  };

  return (
    <Card>
      <CardContent className='space-y-6'>
        <GitHubButton className='w-full'>Sign In via GitHub</GitHubButton>
        <GoogleButton className='w-full'>Sign In via GitHub</GoogleButton>
        <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
          <span className='relative z-10 bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='m@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='mx-auto'>
        <div className='text-center text-sm'>
          Don&apos;t have an account?{' '}
          <a href='sign-up' className='underline underline-offset-4'>
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
