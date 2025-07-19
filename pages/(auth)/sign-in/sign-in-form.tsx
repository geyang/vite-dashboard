import { toast } from 'sonner';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { authClient } from '@/lib/auth/auth-client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { navigate } from 'vike/client/router';
import { signInFormSchema } from '@/lib/auth/auth-schema';
import { GitHubButton } from '../github-button';
import { GoogleButton } from '../google-button';
import { Separator } from '@/components/ui/separator.tsx';

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
          navigate('/dashboard');
        },
        onError: ({ error }: { error: string | unknown }) => {
          const message =
            typeof error === 'string' ? error : 'Failed to sign in';
          toast.error(message);
        },
      },
    );
  };

  return (
    <Card className='grid gap-6 p-6'>
      <div className='grid gap-6'>
        <GitHubButton className='w-full'>Sign In via GitHub</GitHubButton>
        <GoogleButton className='w-full'>Sign In via GitHub</GoogleButton>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator className='full' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='relative bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
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
    </Card>
  );
}
