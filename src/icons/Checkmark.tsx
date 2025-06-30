interface CheckmarkIconProps {
  className?: string
}

export function CheckmarkIcon({ className }: CheckmarkIconProps) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          stroke-miterlimit="10"
          strokeWidth="2"
        ></circle>
        <polyline
          points="7 13 10 16 17 8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          stroke-miterlimit="10"
          strokeWidth="2"
        ></polyline>
      </g>
    </svg>
  )
}
