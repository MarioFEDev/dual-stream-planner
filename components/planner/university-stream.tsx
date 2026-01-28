'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Plus, X } from 'lucide-react'
import type { UniversityTask } from '@/lib/planner-types'
import { CircularDurationSlider } from './circular-duration-slider'
import { generateId } from '@/lib/uuid'

interface UniversityStreamProps {
  tasks: UniversityTask[]
  onAddTask: (task: UniversityTask) => void
  onRemoveTask: (id: string) => void
}

export function UniversityStream({ tasks, onAddTask, onRemoveTask }: UniversityStreamProps) {
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [duration, setDuration] = useState(2)

  const handleAdd = () => {
    if (!subject.trim() || !topic.trim()) return
    onAddTask({
      id: generateId(),
      subject: subject.trim(),
      topic: topic.trim(),
      duration,
      type: 'university',
    })
    setSubject('')
    setTopic('')
    setDuration(2)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative flex-1"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-3xl bg-cyan-500/20 blur-xl" />
      
      {/* Glass panel */}
      <div className="relative rounded-3xl border border-cyan-500/30 bg-zinc-900/60 p-6 backdrop-blur-xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20">
            <GraduationCap className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="font-mono text-lg font-bold tracking-wider text-cyan-400">
              UNIVERSITY STREAM
            </h2>
            <p className="font-mono text-xs text-cyan-500/60">Academic Tasks</p>
          </div>
        </div>

        {/* Input fields */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cyan-400/70">
              Subject Name
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Calculus"
              className="w-full rounded-lg border border-cyan-500/30 bg-zinc-900/80 px-4 py-2.5 font-mono text-sm text-cyan-100 placeholder-cyan-800 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cyan-400/70">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Derivatives"
              className="w-full rounded-lg border border-cyan-500/30 bg-zinc-900/80 px-4 py-2.5 font-mono text-sm text-cyan-100 placeholder-cyan-800 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
            />
          </div>

          <div>
            <label className="mb-3 block font-mono text-xs uppercase tracking-wider text-cyan-400/70">
              Duration
            </label>
            <div className="flex justify-center">
              <CircularDurationSlider value={duration} onChange={setDuration} color="cyan" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/20 py-3 font-mono text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-500/30 hover:text-cyan-200"
          >
            <Plus className="h-4 w-4" />
            ADD TASK
          </motion.button>
        </div>

        {/* Task orbs */}
        <div className="mt-6 min-h-[120px]">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-cyan-500/50">
            Pending Tasks ({tasks.length})
          </p>
          <div className="flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  layout
                  className="group relative"
                >
                  {/* Orb glow */}
                  <div className="absolute -inset-1 rounded-full bg-cyan-500/30 blur-md transition-all group-hover:bg-cyan-400/40" />
                  
                  {/* Orb content */}
                  <div className="relative flex items-center gap-2 rounded-full border border-cyan-500/40 bg-zinc-900/90 px-4 py-2 backdrop-blur-sm">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                    <span className="font-mono text-xs text-cyan-300">{task.subject}</span>
                    <span className="font-mono text-[10px] text-cyan-500/60">{task.duration}h</span>
                    <button
                      onClick={() => onRemoveTask(task.id)}
                      className="ml-1 text-cyan-600 transition-colors hover:text-cyan-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
