export interface UniversityTask {
  id: string
  subject: string
  topic: string
  duration: number // hours (1-4)
  type: 'university'
}

export interface DevTask {
  id: string
  project: string
  techStack: string[]
  complexity: number // 1-9 scale
  type: 'dev'
}

export type Task = UniversityTask | DevTask

export interface ScheduleDay {
  id: string
  date: string // ISO date string
  day: string // day name (Monday, etc.)
  isToday: boolean
  tasks: Task[]
  energyPoints: number // Sum of task weights (max 10 recommended)
}

export const TECH_STACK_OPTIONS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'Go',
  'Rust',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'AWS',
]

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
