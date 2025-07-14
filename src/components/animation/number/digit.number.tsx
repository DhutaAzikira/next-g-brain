'use client'

import { useEffect } from 'react'
import { useSpring, motionValue } from 'motion/react'

import { Number } from './number.number'
import { TRANSITION } from '@/utils/animation';

/**
 * Renders a single animated digit for a given value and place.
 *
 * This component calculates the digit at the specified decimal place from the provided value,
 * animates its transition using Framer Motion's `motionValue` and `useSpring`, and displays
 * all possible digits (0-9) stacked, with the correct digit animated into view.
 *
 * @param value - The numeric value from which to extract the digit.
 * @param place - The decimal place to extract (e.g., 1 for units, 10 for tens).
 *
 * @returns A React element displaying the animated digit.
 */
export function Digit({ value, place }: { value: number; place: number }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10
  const initial = motionValue(valueRoundedToPlace)
  const animatedValue = useSpring(initial, TRANSITION)

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <div className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  )
}
