'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, RotateCcw } from 'lucide-react'
import { useDualStream } from '@/hooks/useDualStream'
import { UniversityStream } from './university-stream'
import { DevStream } from './dev-stream'
import { MergedTimeline } from './merged-timeline'

export function DualStreamPlanner() {
  const [isMerging, setIsMerging] = useState(false)
  
  // Use the intelligent load-balancing zipper algorithm hook
  const {
    uniQueue,
    devQueue,
    schedule,
    addUniTask,
    addDevTask,
    removeTask,
    mergeStreams: executeMerge,
    resetAll,
    totalTasks,
  } = useDualStream()
  
  // Wrapper to handle merge with animation
  const handleMergeStreams = async () => {
    if (totalTasks === 0) return
    
    setIsMerging(true)
    
    // Simulate processing time for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Execute the load-balancing zipper algorithm
    executeMerge()
    
    setIsMerging(false)
  }
  
  const handleRemoveUniTask = (id: string) => removeTask(id, 'university')
  const handleRemoveDevTask = (id: string) => removeTask(id, 'dev')

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Animated background grid */}
      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient overlays */}
      <div className="fixed left-0 top-0 h-1/2 w-1/3 bg-gradient-to-br from-cyan-500/5 to-transparent blur-3xl" />
      <div className="fixed right-0 top-0 h-1/2 w-1/3 bg-gradient-to-bl from-zinc-500/5 to-transparent blur-3xl" />
      <div className="fixed bottom-0 left-1/3 h-1/2 w-1/3 bg-gradient-to-t from-cyan-500/5 via-zinc-500/5 to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-2 font-mono text-3xl font-bold tracking-wider md:text-4xl">
            <span className="text-cyan-400">DUAL</span>
            <span className="text-zinc-500">-</span>
            <span className="text-zinc-300">STREAM</span>
            <span className="text-zinc-600"> PLANNER</span>
          </h1>
          <p className="font-mono text-sm text-zinc-600">
            {'<'} Merge your academic and development workflows {'/>'} 
          </p>
        </motion.header>

        {/* Input streams */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row">
          <UniversityStream
            tasks={uniQueue}
            onAddTask={addUniTask}
            onRemoveTask={handleRemoveUniTask}
          />
          <DevStream
            tasks={devQueue}
            onAddTask={addDevTask}
            onRemoveTask={handleRemoveDevTask}
          />
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMergeStreams}
            disabled={totalTasks === 0 || isMerging}
            className="group relative overflow-hidden rounded-xl px-8 py-4 font-mono text-sm font-medium uppercase tracking-wider transition-all disabled:cursor-not-allowed disabled:opacity-50"
          >
            {/* Button gradient border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-zinc-500 to-cyan-500 opacity-50 transition-opacity group-hover:opacity-80" />
            <div className="absolute inset-[2px] rounded-[10px] bg-zinc-950" />
            
            {/* Button content */}
            <span className="relative flex items-center gap-3">
              <Zap className={`h-4 w-4 text-cyan-400 ${isMerging ? 'animate-pulse' : ''}`} />
              <span className="bg-gradient-to-r from-cyan-400 to-zinc-300 bg-clip-text text-transparent">
                {isMerging ? 'Merging...' : 'Merge Streams'}
              </span>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
                {totalTasks}
              </span>
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetAll}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-6 py-3 font-mono text-xs uppercase tracking-wider text-zinc-500 transition-all hover:border-zinc-700 hover:text-zinc-400"
          >
            <RotateCcw className="h-3 w-3" />
            Reset All
          </motion.button>
        </motion.div>

        {/* Merged timeline */}
        <MergedTimeline schedule={schedule} isMerging={isMerging} />

        {/* Footer HUD elements */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex items-center justify-between border-t border-zinc-900 pt-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
              <span className="font-mono text-[10px] text-cyan-500/60">UNI STREAM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-zinc-500" />
              <span className="font-mono text-[10px] text-zinc-600">DEV STREAM</span>
            </div>
          </div>

          <div className="font-mono text-[10px] text-zinc-700">
            SYS.STATUS: OPERATIONAL
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
