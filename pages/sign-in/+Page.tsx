import { UserSignInForm } from '@/components/user-sign-in-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { Link } from '@/components/Link';

export default function SignInPage() {
  return (
    <div className='container mx-auto relative flex h-screen w-screen flex-col items-center justify-center'>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Welcome back
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your credentials to sign in to your account
          </p>
        </div>
        <UserSignInForm />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          <Link
            href='/sign-up'
            className='underline underline-offset-4 hover:text-primary'
          >
            Don't have an account? Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
