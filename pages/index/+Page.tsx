import { ArrowRight, Feather } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { HorizontalLine, VerticalLines } from '@/components/hero-sketch';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/components/Link';

const trustedCompanies = [
  'Tesla',
  'Astribot',
  'Unitree',
  'Figure.ai',
  'DeepMind',
  'OpenAI',
];

export default function LandingPage() {
  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-black'>
      <header className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm dark:bg-black/80'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4 md:px-6'>
          <Link
            href='/public'
            className='flex items-center gap-2 font-bold text-lg'
          >
            <Feather className='h-6 w-6' />
            <span>AuthKit</span>
          </Link>
          <nav className='hidden md:flex items-center gap-6 text-sm font-medium'>
            <Link
              href='#'
              className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
            >
              Product
            </Link>
            <Link
              href='#'
              className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
            >
              Solutions
            </Link>
            <Link
              href='#'
              className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
            >
              Docs
            </Link>
            <Link
              href='#'
              className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
            >
              Pricing
            </Link>
            <Link
              href='#'
              className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
            >
              Company
            </Link>
          </nav>
          <div className='flex items-center gap-4'>
            <Button variant='ghost' asChild>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
            <Button asChild variant="default">
              <Link href='/sign-up' className='cursor-pointer bg-black text-white dark:bg-white dark:text-black'>
              Start building <ArrowRight className='ml-0 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className='flex-1'>
        <section className='relative py-24 md:py-40 overflow-hidden'>
          <div className='container mx-auto px-4 md:px-6 text-center relative z-10'>
            <h1 className='relative text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-gray-50'>
              <span className='relative'>
                <HorizontalLine />
                <VerticalLines />
                The Complete
                <HorizontalLine className='right-[-100px] mr-[-300px] mt-[7px]' />
                <VerticalLines className='right-[-0.4rem] mt-[-100px]' />
              </span>
              <br />
              <span className='relative'>
                <HorizontalLine />
                <VerticalLines className='mt-[-100px]' />
                User Auth Solution
                <VerticalLines className='right-0 mt-[-50px]' />
                <HorizontalLine className='bottom-[0.5rem]' />
              </span>
            </h1>
            <p className='relative mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400'>
              <HorizontalLine className='ml-[-50px]' />
              From{' '}
              <span className='text-gray-800 dark:text-gray-200 font-medium'>
                sign-in boxes
              </span>{' '}
              to{' '}
              <span className='text-gray-800 dark:text-gray-200 font-medium'>
                enterprise-grade
              </span>{' '}
              features, AuthKit provides everything you need to manage your
              users.
            </p>
          </div>
        </section>

        <section className='py-12'>
          <div className='container mx-auto px-4 md:px-6'>
            <p className='text-center text-sm font-semibold text-gray-500 dark:text-gray-400'>
              Trusted by the world's most innovative companies
            </p>
            <div className='mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12'>
              {trustedCompanies.map((name) => (
                <span
                  key={name}
                  className='font-semibold text-gray-600 dark:text-gray-400'
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className='py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50'>
          <div className='container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-4'>
              <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                AuthKit Components
              </div>
              <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
                Pixel-perfect UIs, embedded in minutes
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Simply add &lt;SignIn/&gt;, &lt;SignUp/&gt;,
                &lt;UserButton/&gt;, &lt;UserProfile/&gt; for complete user
                management functionality. Match to your brand with any CSS
                library, then deploy to your own domain — no more jarring
                redirects!
              </p>
            </div>
            <div>
              <Card className='overflow-hidden shadow-lg'>
                <CardHeader className='flex flex-row items-center justify-between bg-gray-100 dark:bg-gray-900 p-4'>
                  <CardTitle className='text-base'>Profile details</CardTitle>
                </CardHeader>
                <CardContent className='p-6 space-y-6'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Profile
                    </span>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-9 w-9'>
                        <AvatarImage
                          src='/avatars/jane-smith.png'
                          alt='Arlene McCoy'
                        />
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                      <span className='font-medium'>Arlene McCoy</span>
                      <Button variant='ghost' size='sm'>
                        Edit profile
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label
                      htmlFor='email'
                      className='text-sm text-gray-500 dark:text-gray-400'
                    >
                      Email addresses
                    </Label>
                    <div className='mt-2 space-y-2'>
                      <div className='flex items-center justify-between'>
                        <Input
                          id='email'
                          defaultValue='example@gmail.com'
                          readOnly
                          className='border-none p-0 h-auto'
                        />
                        <Badge variant='secondary'>Primary</Badge>
                      </div>
                      <div className='flex items-center justify-between'>
                        <Input
                          defaultValue='example@personal.com'
                          readOnly
                          className='border-none p-0 h-auto'
                        />
                      </div>
                      <div className='flex items-center justify-between'>
                        <Input
                          defaultValue='email@work.io'
                          readOnly
                          className='border-none p-0 h-auto'
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className='py-8 border-t'>
        <div className='container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            &copy; {new Date().getFullYear()} FortyFive Labs. All rights
            reserved.
          </p>
          <div className='flex items-center gap-4'>
            <Link href='#' className='text-sm hover:underline'>
              Terms of Service
            </Link>
            <Link href='#' className='text-sm hover:underline'>
              Privacy Policy
            </Link>
            <Link
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <SiGithub className='h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300' />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

