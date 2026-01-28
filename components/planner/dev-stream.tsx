'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Plus, X } from 'lucide-react'
import type { DevTask } from '@/lib/planner-types'
import { TECH_STACK_OPTIONS } from '@/lib/planner-types'
import { ComplexityMatrix } from './complexity-matrix'
import { generateId } from '@/lib/uuid'

interface DevStreamProps {
  tasks: DevTask[]
  onAddTask: (task: DevTask) => void
  onRemoveTask: (id: string) => void
}

export function DevStream({ tasks, onAddTask, onRemoveTask }: DevStreamProps) {
  const [project, setProject] = useState('')
  const [techStack, setTechStack] = useState<string[]>([])
  const [complexity, setComplexity] = useState(5)

  const handleAdd = () => {
    if (!project.trim() || techStack.length === 0) return
    onAddTask({
      id: generateId(),
      project: project.trim(),
      techStack,
      complexity,
      type: 'dev',
    })
    setProject('')
    setTechStack([])
    setComplexity(5)
  }

  const toggleTech = (tech: string) => {
    setTechStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative flex-1"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-3xl bg-zinc-400/10 blur-xl" />

      {/* Glass panel */}
      <div className="relative rounded-3xl border border-zinc-500/30 bg-zinc-900/60 p-6 backdrop-blur-xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-500/20">
            <Terminal className="h-5 w-5 text-zinc-300" />
          </div>
          <div>
            <h2 className="font-mono text-lg font-bold tracking-wider text-zinc-300">
              DEV STREAM
            </h2>
            <p className="font-mono text-xs text-zinc-500">{'>'} Development Tasks</p>
          </div>
        </div>

        {/* Input fields */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-zinc-500">
              Project/Task Name
            </label>
            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="e.g., API Integration"
              className="w-full rounded-lg border border-zinc-600/50 bg-zinc-950 px-4 py-2.5 font-mono text-sm text-zinc-200 placeholder-zinc-700 outline-none transition-all focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">
              Tech Stack
            </label>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK_OPTIONS.map((tech) => (
                <motion.button
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTech(tech)}
                  className={`rounded border px-2 py-1 font-mono text-xs transition-all ${
                    techStack.includes(tech)
                      ? 'border-zinc-400 bg-zinc-400/20 text-zinc-200'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-500 hover:border-zinc-600'
                  }`}
                >
                  {tech}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block font-mono text-xs uppercase tracking-wider text-zinc-500">
              Complexity Matrix
            </label>
            <div className="flex justify-center">
              <ComplexityMatrix value={complexity} onChange={setComplexity} />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-500/50 bg-zinc-500/10 py-3 font-mono text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-500/20"
          >
            <Plus className="h-4 w-4" />
            {'>'} ADD TASK
          </motion.button>
        </div>

        {/* Task blocks */}
        <div className="mt-6 min-h-[120px]">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-600">
            {'>'} Queue ({tasks.length})
          </p>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  layout
                  className="group relative"
                >
                  {/* Terminal-style block */}
                  <div className="flex items-center gap-3 rounded border-l-2 border-zinc-500 bg-zinc-950/80 px-3 py-2 font-mono">
                    <span className="text-zinc-600">{String(index + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-xs text-zinc-300">{task.project}</span>
                    <span className="text-[10px] text-zinc-600">
                      [{task.techStack.slice(0, 2).join(', ')}
                      {task.techStack.length > 2 && '...'}]
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-1.5 rounded-sm ${
                            i < Math.ceil(task.complexity / 3)
                              ? 'bg-zinc-400'
                              : 'bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => onRemoveTask(task.id)}
                      className="text-zinc-700 transition-colors hover:text-zinc-300"
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
