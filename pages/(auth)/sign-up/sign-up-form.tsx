import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { navigate } from 'vike/client/router';
import { CursorButton } from '@/components/highlight-cursor';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CursorInput } from '@/components/highlight-cursor';
import { GitHubButton } from '../github-button';
import { GoogleButton } from '../google-button';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth/auth-client';
import { formSchema } from '@/lib/auth/auth-schema';

import { zodResolver } from '@hookform/resolvers/zod';

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {
          toast('Signing up...');
        },
        onSuccess: () => {
          form.reset();
          navigate('/sign-in');
        },
        onError: (ctx: { error: { message: string } }) => {
          toast.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <Card className='grid gap-6 p-6'>
      <div className='grid gap-6'>
        <GitHubButton className='w-full'>Sign Up via GitHub</GitHubButton>
        <GoogleButton className='w-full'>Sign Up via Google</GoogleButton>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator className='w-full' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with email
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <CursorInput placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <CursorInput placeholder='m@example.com' {...field} />
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
                  <CursorInput type='password' placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CursorButton type='submit' className='w-full mt-2'>
            Sign up with email
          </CursorButton>
        </form>
      </Form>
    </Card>
  );
}
