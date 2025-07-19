import { Link } from "@/components/Link"
import { UserSignUpForm } from '@/components/user-sign-up-form';
import { ThemeToggle } from '@/components/theme-toggle';

export default function SignUpPage() {
  return (
    <div className='container mx-auto relative flex h-screen w-screen flex-col items-center justify-center'>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Create an account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your details below to create your account
          </p>
        </div>
        <UserSignUpForm />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link
            href='/sign-in'
            className='underline underline-offset-4 hover:text-primary'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
