import SignUpForm from './sign-up-form'
import { Feather } from 'lucide-react';

export default function Page() {
  return (
    <div className="container relative p-0 h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Feather className='h-6 w-6 mr-2' />
          Vuer AuthKit
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Solve physical intelligence, and make the world a better place.&rdquo;
            </p>
            <footer className="text-sm">FortyFive Labs</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <SignUpForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a href="/sign-in" className="hover:text-brand underline underline-offset-4">
              Already have an account? Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
