import React from "react"

interface LoaderProps {
  size?: "small" | "medium" | "large"
  color?: string
  className?: string
}

export function Loader({ size = "medium", color = "#9CA3AF", className = "" }: LoaderProps) {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 56,
  }

  const actualSize = sizeMap[size]
  const strokeWidth = actualSize / 10

  return (
    <div className={`inline-block ${className}`} role="status" aria-label="loading">
      <svg
        width={actualSize}
        height={actualSize}
        viewBox={`0 0 ${actualSize} ${actualSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={(actualSize - strokeWidth) / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="opacity-25"
        />
        <circle
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={(actualSize - strokeWidth) / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="animate-spinfast opacity-75"
          strokeDasharray={actualSize * 2}
          strokeDashoffset={actualSize * 1.5}
        />
      </svg>
    </div>
  )
}

