'use client'

import { motion } from 'framer-motion'

interface ComplexityMatrixProps {
  value: number
  onChange: (value: number) => void
}

export function ComplexityMatrix({ value, onChange }: ComplexityMatrixProps) {
  const labels = ['Low', 'Med', 'High']

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => {
          const cellValue = i + 1
          const isSelected = cellValue === value

          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(cellValue)}
              className={`relative h-8 w-8 rounded transition-all ${
                isSelected
                  ? 'border border-zinc-300 bg-zinc-300 text-zinc-900'
                  : 'border border-zinc-700 bg-zinc-900 text-zinc-600 hover:border-zinc-500'
              }`}
            >
              <span className="font-mono text-xs">{cellValue}</span>
              {isSelected && (
                <motion.div
                  layoutId="complexity-indicator"
                  className="absolute -inset-0.5 rounded border-2 border-zinc-400"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
      
      {/* Axis labels */}
      <div className="flex w-full justify-between px-1">
        {labels.map((label) => (
          <span key={label} className="font-mono text-[9px] text-zinc-600">
            {label}
          </span>
        ))}
      </div>
      
      <div className="mt-1 flex items-center gap-2">
        <span className="font-mono text-[10px] text-zinc-600">Difficulty:</span>
        <span className="font-mono text-xs text-zinc-400">{value}/9</span>
      </div>
    </div>
  )
}
