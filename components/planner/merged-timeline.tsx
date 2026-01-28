'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, BookOpen, Code } from 'lucide-react'
import type { ScheduleDay, Task, UniversityTask, DevTask } from '@/lib/planner-types'

interface MergedTimelineProps {
  schedule: ScheduleDay[]
  isMerging: boolean
}

function isUniversityTask(task: Task): task is UniversityTask {
  return task.type === 'university'
}

function isDevTask(task: Task): task is DevTask {
  return task.type === 'dev'
}

export function MergedTimeline({ schedule, isMerging }: MergedTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative mx-auto w-full max-w-2xl"
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-zinc-400" />
          <h2 className="font-mono text-lg font-bold tracking-wider text-zinc-300">
            BLENDED TIMELINE
          </h2>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" />
      </div>

      {/* DNA Helix Timeline */}
      <div className="relative">
        {/* Central spine */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500/30 via-zinc-500/30 to-cyan-500/30" />

        {/* Merging animation overlay */}
        <AnimatePresence>
          {isMerging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
                className="h-32 w-32 rounded-full bg-gradient-to-r from-cyan-500/30 to-zinc-500/30 blur-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Schedule days */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {schedule.map((day, dayIndex) => (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
                className="relative"
              >
                {/* Day label with energy points */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, delay: dayIndex * 0.1 }}
                  className="absolute left-1/2 top-0 z-20 -translate-x-1/2"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="rounded-full border border-zinc-600 bg-zinc-900 px-4 py-1.5 shadow-lg shadow-zinc-950/50">
                      <span className="font-mono text-xs font-medium text-zinc-400">{day.day}</span>
                    </div>
                    {/* Energy indicator */}
                    <div className="flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        day.energyPoints > 10 
                          ? 'bg-red-500' 
                          : day.energyPoints > 8 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                      }`} />
                      <span className="font-mono text-[10px] text-zinc-500">
                        {day.energyPoints}⚡
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Tasks for this day */}
                <div className="flex min-h-[80px] items-center gap-4 pt-10">
                  {/* Left side - University tasks */}
                  <div className="flex flex-1 flex-wrap justify-end gap-2">
                    <AnimatePresence>
                      {day.tasks.filter(isUniversityTask).map((task, taskIndex) => (
                        <motion.div
                          key={task.id}
                          initial={{ x: -100, opacity: 0, scale: 0 }}
                          animate={{ x: 0, opacity: 1, scale: 1 }}
                          exit={{ x: -50, opacity: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            delay: isMerging ? dayIndex * 0.15 + taskIndex * 0.1 : 0,
                          }}
                          className="group relative"
                        >
                          {/* Orb glow */}
                          <div className="absolute -inset-2 rounded-full bg-cyan-500/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
                          
                          {/* Orb */}
                          <div className="relative flex items-center gap-2 rounded-full border border-cyan-500/40 bg-zinc-900/90 px-3 py-1.5 backdrop-blur-sm transition-all group-hover:border-cyan-400">
                            <BookOpen className="h-3 w-3 text-cyan-400" />
                            <span className="font-mono text-xs text-cyan-300">{task.subject}</span>
                            <span className="font-mono text-[10px] text-cyan-500/60">{task.duration}h</span>
                          </div>

                          {/* Hover tooltip */}
                          <div className="pointer-events-none absolute -top-12 left-1/2 z-30 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="rounded-lg border border-cyan-500/30 bg-zinc-900/95 px-3 py-2 shadow-xl backdrop-blur-sm">
                              <p className="whitespace-nowrap font-mono text-xs text-cyan-400">{task.topic}</p>
                            </div>
                            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-cyan-500/30 bg-zinc-900/95" />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Center connector node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: dayIndex * 0.1 + 0.2 }}
                    className="relative z-10 flex h-4 w-4 items-center justify-center"
                  >
                    <div className="absolute h-full w-full animate-ping rounded-full bg-gradient-to-r from-cyan-500 to-zinc-400 opacity-20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-zinc-400" />
                  </motion.div>

                  {/* Right side - Dev tasks */}
                  <div className="flex flex-1 flex-wrap gap-2">
                    <AnimatePresence>
                      {day.tasks.filter(isDevTask).map((task, taskIndex) => (
                        <motion.div
                          key={task.id}
                          initial={{ x: 100, opacity: 0, scale: 0 }}
                          animate={{ x: 0, opacity: 1, scale: 1 }}
                          exit={{ x: 50, opacity: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            delay: isMerging ? dayIndex * 0.15 + taskIndex * 0.1 : 0,
                          }}
                          className="group relative"
                        >
                          {/* Block glow */}
                          <div className="absolute -inset-2 rounded-lg bg-zinc-400/10 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
                          
                          {/* Block */}
                          <div className="relative flex items-center gap-2 rounded border-l-2 border-zinc-500 bg-zinc-900/90 px-3 py-1.5 backdrop-blur-sm transition-all group-hover:border-zinc-300">
                            <Code className="h-3 w-3 text-zinc-400" />
                            <span className="font-mono text-xs text-zinc-300">{task.project}</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-1 w-1 rounded-sm ${
                                    i < Math.ceil(task.complexity / 3)
                                      ? 'bg-zinc-400'
                                      : 'bg-zinc-700'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Hover tooltip */}
                          <div className="pointer-events-none absolute -top-12 left-1/2 z-30 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="rounded-lg border border-zinc-600 bg-zinc-900/95 px-3 py-2 shadow-xl backdrop-blur-sm">
                              <p className="whitespace-nowrap font-mono text-xs text-zinc-400">
                                {task.techStack.join(' • ')}
                              </p>
                            </div>
                            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-zinc-600 bg-zinc-900/95" />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {schedule.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-zinc-700">
              <Calendar className="h-6 w-6 text-zinc-700" />
            </div>
            <p className="font-mono text-sm text-zinc-600">No schedule generated yet</p>
            <p className="font-mono text-xs text-zinc-700">Add tasks and click Merge Streams</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
