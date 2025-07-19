import { cn } from '@/lib/utils';

export function HorizontalLine({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        'absolute inline-block ml-[-300px] h-[1px] pointer-events-none',
        className,
      )}
      viewBox='0 0 600 1'
      preserveAspectRatio='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient
          id='fade-horizontal'
          x1='0'
          y1='0'
          x2='600'
          y2='0'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='currentColor' stopOpacity='0' />
          <stop offset='0.1' stopColor='currentColor' stopOpacity='0.8' />
          <stop offset='0.9' stopColor='currentColor' stopOpacity='0.8' />
          <stop offset='1' stopColor='currentColor' stopOpacity='0' />
        </linearGradient>
      </defs>

      <g className='text-black dark:text-white'>
        <line
          x1='0'
          y1='0'
          x2='1000'
          y2='0'
          stroke='url(#fade-horizontal)'
          strokeWidth='1'
          strokeDasharray='2 2'
        />
      </g>
    </svg>
  );
}

export function VerticalLines({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        'absolute inline-block mt-[-150px] w-[1px] pointer-events-none',
        className,
      )}
      viewBox='0 0 1 300'
      preserveAspectRatio='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient
          id='fade-vertical'
          x1='0'
          y1='0'
          x2='0'
          y2='300'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='currentColor' stopOpacity='0' />
          <stop offset='0.1' stopColor='currentColor' stopOpacity='0.8' />
          <stop offset='0.9' stopColor='currentColor' stopOpacity='0.8' />
          <stop offset='1' stopColor='currentColor' stopOpacity='0' />
        </linearGradient>
      </defs>

      <g className='text-black dark:text-white'>
        <line
          x1='0'
          y1='0'
          x2='0'
          y2='300'
          stroke='url(#fade-vertical)'
          strokeWidth='1'
          strokeDasharray='2 2'
        />
      </g>
    </svg>
  );
}
