'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxRating?: number
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} out of ${maxRating} stars`}>
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : index < rating
              ? 'text-yellow-400 fill-yellow-400 star-half'
              : 'text-gray-300'
          }`}
          aria-hidden="true"
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function Component() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Star Rating Examples</h2>
      <div className="space-y-2">
        <StarRating rating={4.5} />
        <StarRating rating={3.7} />
        <StarRating rating={2} />
        <StarRating rating={0.5} />
      </div>
    </div>
  )
}