import { useState, useCallback, useEffect } from 'react'
import type { UniversityTask, DevTask, ScheduleDay } from '@/lib/planner-types'
import { loadState, saveState, clearState } from '@/lib/storage'

// Algorithm Constants
const MAX_ENERGY_PER_DAY = 10
const UNI_WEIGHT_MULTIPLIER = 2 // duration * 2

/**
 * Calculate energy cost for a university task
 */
function calculateUniEnergy(task: UniversityTask): number {
  return task.duration * UNI_WEIGHT_MULTIPLIER
}

/**
 * Calculate energy cost for a dev task
 * Maps 1-9 complexity to energy points:
 * 1-3 = Low (2-4 points)
 * 4-6 = Medium (4-6 points)
 * 7-9 = High (7-9 points)
 */
function calculateDevEnergy(task: DevTask): number {
  // Linear mapping: complexity value = energy points
  // This gives us a range of 1-9 points based on complexity
  return task.complexity
}

/**
 * Calculate total energy for a task (universal)
 */
function calculateTaskEnergy(task: UniversityTask | DevTask): number {
  return task.type === 'university' 
    ? calculateUniEnergy(task) 
    : calculateDevEnergy(task)
}

/**
 * Generate date string for a day offset from today
 */
function getDateString(daysFromToday: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromToday)
  return date.toISOString().split('T')[0]
}

/**
 * Get day name for a date
 */
function getDayName(date: string): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[new Date(date).getDay()]
}

export function useDualStream() {
  // Initialize state from localStorage (will be empty array on SSR, loaded on client)
  const [isInitialized, setIsInitialized] = useState(false)
  const [uniQueue, setUniQueue] = useState<UniversityTask[]>([])
  const [devQueue, setDevQueue] = useState<DevTask[]>([])
  const [schedule, setSchedule] = useState<ScheduleDay[]>([])
  const [startDate] = useState<Date>(new Date())

  // Load state from localStorage on mount (client-side only)
  useEffect(() => {
    const savedState = loadState()
    setUniQueue(savedState.uniQueue)
    setDevQueue(savedState.devQueue)
    setSchedule(savedState.schedule)
    setIsInitialized(true)
  }, [])

  // Auto-save to localStorage whenever state changes
  useEffect(() => {
    // Skip saving on initial render before loading from localStorage
    if (!isInitialized) return

    saveState({
      uniQueue,
      devQueue,
      schedule,
    })
  }, [uniQueue, devQueue, schedule, isInitialized])

  /**
   * Add a university task to the queue
   */
  const addUniTask = useCallback((task: UniversityTask) => {
    setUniQueue((prev) => [...prev, task])
  }, [])

  /**
   * Add a dev task to the queue
   */
  const addDevTask = useCallback((task: DevTask) => {
    setDevQueue((prev) => [...prev, task])
  }, [])

  /**
   * Remove a task from either queue
   */
  const removeTask = useCallback((id: string, type: 'university' | 'dev') => {
    if (type === 'university') {
      setUniQueue((prev) => prev.filter((t) => t.id !== id))
    } else {
      setDevQueue((prev) => prev.filter((t) => t.id !== id))
    }
  }, [])

  /**
   * THE LOAD BALANCING ZIPPER ALGORITHM
   * 
   * Strategy:
   * 1. Start from tomorrow (day offset = 1)
   * 2. For each day, ensure a "blend" - try to add at least 1 Uni + 1 Dev task
   * 3. Respect capacity: stop when energyPoints > MAX_ENERGY_PER_DAY
   * 4. Move remaining tasks to next day
   * 5. Continue until both queues are empty
   */
  const generateSchedule = useCallback((): ScheduleDay[] => {
    // Clone queues to avoid mutating state during generation
    const uniRemaining = [...uniQueue]
    const devRemaining = [...devQueue]
    const generatedSchedule: ScheduleDay[] = []
    
    let dayOffset = 1 // Start from tomorrow
    const today = new Date().toISOString().split('T')[0]
    
    // Continue until both queues are exhausted
    while (uniRemaining.length > 0 || devRemaining.length > 0) {
      const dateStr = getDateString(dayOffset)
      const daySchedule: ScheduleDay = {
        id: `day-${dayOffset}`,
        date: dateStr,
        day: getDayName(dateStr),
        isToday: dateStr === today,
        tasks: [],
        energyPoints: 0,
      }
      
      let currentEnergy = 0
      let addedUni = false
      let addedDev = false
      
      // RULE 1: THE BLEND - Try to add at least one task from each stream
      
      // Try to add a Uni task first
      if (uniRemaining.length > 0) {
        const uniTask = uniRemaining[0]
        const uniEnergy = calculateUniEnergy(uniTask)
        
        if (currentEnergy + uniEnergy <= MAX_ENERGY_PER_DAY) {
          daySchedule.tasks.push(uniTask)
          currentEnergy += uniEnergy
          uniRemaining.shift()
          addedUni = true
        }
      }
      
      // Try to add a Dev task
      if (devRemaining.length > 0) {
        const devTask = devRemaining[0]
        const devEnergy = calculateDevEnergy(devTask)
        
        if (currentEnergy + devEnergy <= MAX_ENERGY_PER_DAY) {
          daySchedule.tasks.push(devTask)
          currentEnergy += devEnergy
          devRemaining.shift()
          addedDev = true
        }
      }
      
      // RULE 2: FILL REMAINING CAPACITY - Alternate between streams
      let attemptingUni = true
      while (uniRemaining.length > 0 || devRemaining.length > 0) {
        let addedSomething = false
        
        if (attemptingUni && uniRemaining.length > 0) {
          const uniTask = uniRemaining[0]
          const uniEnergy = calculateUniEnergy(uniTask)
          
          if (currentEnergy + uniEnergy <= MAX_ENERGY_PER_DAY) {
            daySchedule.tasks.push(uniTask)
            currentEnergy += uniEnergy
            uniRemaining.shift()
            addedSomething = true
          }
        } else if (!attemptingUni && devRemaining.length > 0) {
          const devTask = devRemaining[0]
          const devEnergy = calculateDevEnergy(devTask)
          
          if (currentEnergy + devEnergy <= MAX_ENERGY_PER_DAY) {
            daySchedule.tasks.push(devTask)
            currentEnergy += devEnergy
            devRemaining.shift()
            addedSomething = true
          }
        }
        
        // Alternate the stream we're trying
        attemptingUni = !attemptingUni
        
        // If we went through both streams and couldn't add anything, day is full
        if (!addedSomething && !attemptingUni) {
          break
        }
      }
      
      // Record final energy
      daySchedule.energyPoints = currentEnergy
      
      // Only add day if it has tasks
      if (daySchedule.tasks.length > 0) {
        generatedSchedule.push(daySchedule)
      }
      
      dayOffset++
      
      // Safety: prevent infinite loop (max 30 days)
      if (dayOffset > 30) {
        console.warn('Schedule generation exceeded 30 days')
        break
      }
    }
    
    return generatedSchedule
  }, [uniQueue, devQueue])

  /**
   * Execute the merge operation
   */
  const mergeStreams = useCallback(() => {
    if (uniQueue.length === 0 && devQueue.length === 0) {
      setSchedule([])
      return
    }
    
    const newSchedule = generateSchedule()
    setSchedule(newSchedule)
  }, [uniQueue, devQueue, generateSchedule])

  /**
   * Reset everything (including localStorage)
   */
  const resetAll = useCallback(() => {
    setUniQueue([])
    setDevQueue([])
    setSchedule([])
    clearState()
  }, [])

  return {
    // State
    uniQueue,
    devQueue,
    schedule,
    startDate,
    
    // Actions
    addUniTask,
    addDevTask,
    removeTask,
    mergeStreams,
    resetAll,
    
    // Stats
    totalTasks: uniQueue.length + devQueue.length,
    queuedUni: uniQueue.length,
    queuedDev: devQueue.length,
  }
}
