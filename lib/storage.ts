import type { UniversityTask, DevTask, ScheduleDay } from './planner-types'

/**
 * App state structure for localStorage
 */
export interface AppState {
  uniQueue: UniversityTask[]
  devQueue: DevTask[]
  schedule: ScheduleDay[]
  lastUpdated: string // ISO timestamp
}

const STORAGE_KEY = 'dual-stream-planner-state'

/**
 * Check if localStorage is available (browser environment)
 */
function isLocalStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

/**
 * Save app state to localStorage
 */
export function saveState(state: Partial<AppState>): void {
  if (!isLocalStorageAvailable()) return

  try {
    const existing = loadState()
    const newState: AppState = {
      ...existing,
      ...state,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
  } catch (error) {
    console.warn('Failed to save state to localStorage:', error)
  }
}

/**
 * Load app state from localStorage
 */
export function loadState(): AppState {
  const defaultState: AppState = {
    uniQueue: [],
    devQueue: [],
    schedule: [],
    lastUpdated: new Date().toISOString(),
  }

  if (!isLocalStorageAvailable()) return defaultState

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultState

    const parsed = JSON.parse(stored) as AppState
    
    // Validate that the data has the expected structure
    if (
      Array.isArray(parsed.uniQueue) &&
      Array.isArray(parsed.devQueue) &&
      Array.isArray(parsed.schedule)
    ) {
      return parsed
    }
    
    return defaultState
  } catch (error) {
    console.warn('Failed to load state from localStorage:', error)
    return defaultState
  }
}

/**
 * Clear all app state from localStorage
 */
export function clearState(): void {
  if (!isLocalStorageAvailable()) return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to clear state from localStorage:', error)
  }
}

/**
 * Get last update timestamp
 */
export function getLastUpdated(): string | null {
  const state = loadState()
  return state.lastUpdated || null
}
