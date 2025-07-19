export function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-light"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="-1"
            patternTransform="translate(0 -1)"
          >
            <path d="M0 80V.5H80" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1" strokeDasharray="4 4" />
          </pattern>
          <pattern
            id="circles-light"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="50%"
            patternTransform="translate(-40 -40)"
          >
            <circle cx="40" cy="40" r="2" fill="rgba(0,0,0,0.05)" />
          </pattern>
          <pattern
            id="grid-dark"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="-1"
            patternTransform="translate(0 -1)"
          >
            <path d="M0 80V.5H80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
          </pattern>
          <pattern
            id="circles-dark"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="50%"
            patternTransform="translate(-40 -40)"
          >
            <circle cx="40" cy="40" r="2" fill="rgba(255,255,255,0.03)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-light)" className="dark:hidden" />
        <rect width="100%" height="100%" fill="url(#circles-light)" className="dark:hidden" />
        <rect width="100%" height="100%" fill="url(#grid-dark)" className="hidden dark:block" />
        <rect width="100%" height="100%" fill="url(#circles-dark)" className="hidden dark:block" />
      </svg>
    </div>
  )
}
