'use client'

import React from "react"

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CircularDurationSliderProps {
  value: number
  onChange: (value: number) => void
  color: 'cyan' | 'mono'
  min?: number
  max?: number
}

export function CircularDurationSlider({
  value,
  onChange,
  color,
  min = 1,
  max = 4,
}: CircularDurationSliderProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const colorClasses = {
    cyan: {
      stroke: 'stroke-cyan-500',
      fill: 'fill-cyan-400',
      text: 'text-cyan-400',
      glow: 'drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]',
      bg: 'bg-cyan-500/20',
    },
    mono: {
      stroke: 'stroke-zinc-400',
      fill: 'fill-zinc-300',
      text: 'text-zinc-300',
      glow: 'drop-shadow-[0_0_8px_rgba(161,161,170,0.6)]',
      bg: 'bg-zinc-500/20',
    },
  }

  const colors = colorClasses[color]

  const calculateAngle = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current) return value
      const rect = svgRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)
      const normalizedAngle = (angle + 90 + 360) % 360
      const newValue = Math.round((normalizedAngle / 360) * (max - min) + min)
      return Math.max(min, Math.min(max, newValue))
    },
    [min, max, value]
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    onChange(calculateAngle(e.clientX, e.clientY))
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      onChange(calculateAngle(e.clientX, e.clientY))
    },
    [isDragging, calculateAngle, onChange]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add global event listeners
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  const percentage = ((value - min) / (max - min)) * 100
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const angle = (percentage / 100) * 360 - 90
  const knobX = 50 + 40 * Math.cos((angle * Math.PI) / 180)
  const knobY = 50 + 40 * Math.sin((angle * Math.PI) / 180)

  return (
    <div className="relative flex flex-col items-center">
      <svg
        ref={svgRef}
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className={`cursor-pointer ${colors.glow}`}
        onMouseDown={handleMouseDown}
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          strokeWidth="6"
          className="stroke-zinc-800"
        />

        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className={colors.stroke}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.1 }}
        />

        {/* Knob */}
        <motion.circle
          cx={knobX}
          cy={knobY}
          r="8"
          className={`${colors.fill} ${colors.glow}`}
          animate={{ cx: knobX, cy: knobY }}
          transition={{ duration: 0.1 }}
        />

        {/* Center text */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          className={`${colors.text} fill-current font-mono text-lg font-bold`}
        >
          {value}h
        </text>
      </svg>

      {/* Labels */}
      <div className="mt-2 flex w-full justify-between px-2">
        <span className={`font-mono text-[10px] ${colors.text} opacity-50`}>{min}h</span>
        <span className={`font-mono text-[10px] ${colors.text} opacity-50`}>{max}h</span>
      </div>
    </div>
  )
}
