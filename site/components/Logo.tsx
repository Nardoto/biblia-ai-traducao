export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Open book shape */}
      <path
        d="M24 12C24 12 20 8 12 8C7 8 4 10 4 10V38C4 38 7 36 12 36C18 36 22 38.5 24 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M24 12C24 12 28 8 36 8C41 8 44 10 44 10V38C44 38 41 36 36 36C30 36 26 38.5 24 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center spine */}
      <path d="M24 12V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* AI spark/light */}
      <circle cx="24" cy="6" r="2" fill="var(--accent, #8b7355)" />
      <path d="M24 2V4" stroke="var(--accent, #8b7355)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20.5 3.5L21.5 5" stroke="var(--accent, #8b7355)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M27.5 3.5L26.5 5" stroke="var(--accent, #8b7355)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Text lines on pages */}
      <path d="M9 16H19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M9 20H17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M9 24H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M29 16H39" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M29 20H37" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M29 24H38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}
