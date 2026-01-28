# System Architecture & Design Decisions

## 1. Project Overview
**Project Name:** Dual-Stream Planner (DevPlanner)
**Track:** Intermediate
**Core Concept:** A "Load-Balancing" curriculum scheduler that merges two distinct input streams—Academic Theory ("University") and Practical Engineering ("Development")—into a unified, burnout-preventing timeline.

## 2. Technology Stack Strategy

### Frontend Framework: React (Vite)
* **Decision:** Chosen for its component-based architecture and rapid HMR (Hot Module Replacement) capabilities via Vite.
* **Trade-off:** We avoided Next.js (Server Side Rendering) to minimize deployment complexity for this specific MVP, prioritizing a "Client-Side SPA" (Single Page Application) architecture that can be hosted statically.

### Styling Engine: Tailwind CSS + shadcn/ui
* **Visual Language:** Implemented a "Cyberpunk/Glassmorphism" aesthetic using `zinc-950` backgrounds and semi-transparent backdrops (`backdrop-blur-md`).
* **Component Library:** Utilized **shadcn/ui** (Radix Primitives) for accessible, unstyled interactive elements (Dialogs, Sliders, Switches), styled via utility classes.
* **Animation:** Integrated **Framer Motion** for the "Merge Streams" animation to provide tactile user feedback when the "Zipper" algorithm executes.

### State Management: Custom Hooks + LocalStorage
* **Pattern:** **"Logic-View Separation"**. All business logic resides in `useDualStream.ts`, while UI components (`App.tsx`, `StreamInput.tsx`) remain purely presentational.
* **Persistence:** We implemented a "Client-Side Persistence Layer" using `localStorage`.
    * *Why?* It removes the need for a backend database (Supabase/Firebase) for a single-user MVP, ensuring zero latency and offline capability.
    * *Implementation:* A `useEffect` hook subscribes to the `schedule` state and syncs to browser storage on every mutation.

---

## 3. The "Zipper" Scheduling Algorithm

The core innovation of this project is the **Weighted Bin Packing Algorithm** used to generate the schedule.

### The Problem
A standard "Alternating" algorithm (Day 1: Study, Day 2: Code) is inefficient. A developer might have a "Low Complexity" coding task that takes 1 hour and a "High Intensity" study session that takes 4 hours. Randomly mixing them causes "Energy Overload."

### The Solution: "Energy Point" System
We treat each day as a "Bin" with a maximum capacity of **10 Energy Points**.

1.  **Weight Assignment:**
    * **Academic Tasks (Orbs):** `Duration (Hours) * 1.5` Points. (e.g., 2 hours = 3 points).
    * **Dev Tasks (Blocks):**
        * Low Complexity: **3 Points**
        * Medium Complexity: **5 Points**
        * High Complexity: **8 Points**

2.  **The Execution Logic (`mergeStreams` function):**
    * The algorithm iterates through future dates starting from `Tomorrow`.
    * It attempts to pull one item from the **University Queue** and one from the **Dev Queue** to maintain a "Mixed Daily Approach."
    * **Constraint Check:** Before adding a task to a day, it calculates: `CurrentDayLoad + TaskWeight <= MaxCapacity (10)`.
    * **Overflow Handling:** If a task exceeds the day's capacity, the "bin" is closed, and the task is pushed to the *next* day.

---

## 4. Data Modeling (TypeScript Interfaces)

To ensure type safety and prevent runtime errors during the merging process, strict interfaces were defined:

```typescript
// The "Orb" (University Stream)
export interface UniTask {
  id: string;
  subject: string;
  topic: string;
  duration: number; // mapped to weight
}

// The "Block" (Dev Stream)
export interface DevTask {
  id: string;
  name: string;
  stack: "Frontend" | "Backend" | "DevOps";
  complexity: 'Low' | 'Medium' | 'High'; // mapped to weight
}

// The Unified Schedule
export interface DaySchedule {
  id: string;
  date: string;
  isToday: boolean;
  uniTasks: UniTask[];
  devTasks: DevTask[];
  energyScore: number; // Used for UI "Load Bar" visualization
}