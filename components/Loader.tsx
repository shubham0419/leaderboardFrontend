import React from "react"

interface LoaderProps {
  size?: "small" | "medium" | "large"
  color?: string
  className?: string
}

export function Loader() {

  return (
    <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
    </div>
  )
}

