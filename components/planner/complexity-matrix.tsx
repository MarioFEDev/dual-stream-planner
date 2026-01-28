'use client'

import { motion } from 'framer-motion'

type Complexity = 'Low' | 'Medium' | 'High'

interface ComplexityMatrixProps {
  value: Complexity
  onChange: (value: Complexity) => void
}

export function ComplexityMatrix({ value, onChange }: ComplexityMatrixProps) {
  const labels = ['Low', 'Med', 'High']
  
  // Map numeric cell values to complexity levels
  const getComplexityForCell = (cellIndex: number): Complexity => {
    if (cellIndex < 3) return 'Low'
    if (cellIndex < 6) return 'Medium'
    return 'High'
  }
  
  // Get which cells should be highlighted for current complexity
  const getCellsForComplexity = (complexity: Complexity): number[] => {
    if (complexity === 'Low') return [0, 1, 2]
    if (complexity === 'Medium') return [3, 4, 5]
    return [6, 7, 8]
  }
  
  const selectedCells = getCellsForComplexity(value)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => {
          const cellComplexity = getComplexityForCell(i)
          const isInSelectedGroup = selectedCells.includes(i)
          const cellValue = i + 1

          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(cellComplexity)}
              className={`relative h-8 w-8 rounded transition-all ${
                isInSelectedGroup
                  ? 'border border-zinc-300 bg-zinc-300 text-zinc-900'
                  : 'border border-zinc-700 bg-zinc-900 text-zinc-600 hover:border-zinc-500'
              }`}
            >
              <span className="font-mono text-xs">{cellValue}</span>
              {isInSelectedGroup && i === selectedCells[1] && (
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
        <span className="font-mono text-[10px] text-zinc-600">Complexity:</span>
        <span className="font-mono text-xs text-zinc-400">{value}</span>
      </div>
    </div>
  )
}
