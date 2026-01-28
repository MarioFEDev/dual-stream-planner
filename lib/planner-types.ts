export interface UniversityTask {
  id: string
  subject: string
  topic: string
  duration: number // hours
  type: 'university'
}

export interface DevTask {
  id: string
  project: string
  techStack: string[]
  complexity: number // 1-9
  type: 'dev'
}

export type Task = UniversityTask | DevTask

export interface ScheduleDay {
  day: string
  tasks: Task[]
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
