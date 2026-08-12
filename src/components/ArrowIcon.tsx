type ArrowIconProps = {
  stroke?: string
  className?: string
}

export default function ArrowIcon({
  stroke = 'var(--electric)',
  className,
}: ArrowIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 34 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 0.530334L32 12.5303L20 24.5303"
        stroke={stroke}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M32 12.5303L0 12.5303"
        stroke={stroke}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  )
}
