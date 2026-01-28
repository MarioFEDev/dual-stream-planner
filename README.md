# 🌊 Dual-Stream Planner

> **Balance your academic and development workflows with intelligent task scheduling**

A Next.js application that uses a **Load-Balancing Zipper Algorithm** to merge your university studies and development projects into an optimal weekly schedule based on energy capacity.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [How to Use](#-how-to-use)
  - [Adding University Tasks](#1-adding-university-tasks-orbs)
  - [Adding Development Tasks](#2-adding-development-tasks-blocks)
  - [Adding Multiple Entries](#-adding-multiple-entries)
  - [Merging Streams](#3-merging-streams)
  - [Understanding the Timeline](#4-understanding-the-timeline)
- [The Algorithm](#-the-algorithm)
- [Persistence](#-persistence)
- [Tech Stack](#-tech-stack)

---

## ✨ Features

- **🎓 University Stream**: Manage study sessions with subjects, topics, and durations (1-4 hours)
- **💻 Development Stream**: Track dev projects with tech stacks and 9-level complexity matrix
- **⚡ Energy-Based Scheduling**: Algorithm assigns tasks based on daily energy capacity (10 points max)
- **🧬 Smart Blending**: Ensures mix of academic + dev work each day
- **💾 Auto-Save**: All tasks persist in localStorage—survive page refreshes
- **🎨 Glassmorphic UI**: Modern, clean interface with animated components

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/MarioFEDev/dual-stream-planner.git

# Navigate to project
cd dual-stream-planner/dual-stream-planner

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 How to Use

### 1. Adding University Tasks (Orbs)

University tasks are displayed as **cyan orbs** on the left side of the timeline.

**Step-by-Step:**

1. **Navigate to the University Stream panel** (left side, cyan theme)
2. **Enter Subject** (e.g., "Calculus", "Physics", "Data Structures")
3. **Enter Topic** (e.g., "Derivatives", "Thermodynamics", "Binary Trees")
4. **Set Duration** using the circular slider:
   - Click and drag the knob around the circle
   - Range: 1-4 hours
   - Energy cost: **Duration × 2 points**
     - 1 hour = 2 points
     - 2 hours = 4 points
     - 3 hours = 6 points
     - 4 hours = 8 points
5. **Click "ADD TASK"**
6. Task appears in the queue below

**Example Entry:**
```
Subject:  Calculus
Topic:    Integration by Parts
Duration: 2 hours (4 energy points)
```

---

### 2. Adding Development Tasks (Blocks)

Development tasks are displayed as **gray blocks** on the right side of the timeline.

**Step-by-Step:**

1. **Navigate to the Dev Stream panel** (right side, gray theme)
2. **Enter Project/Task Name** (e.g., "Build Auth System", "API Integration")
3. **Select Tech Stack** (click multiple technologies):
   - React, Next.js, TypeScript, Node.js, Python, Go, Rust
   - PostgreSQL, MongoDB, Redis, Docker, AWS
   - You can select as many as needed
4. **Choose Complexity** using the 3×3 matrix:
   - Click any cell (1-9)
   - **Low** (1-3): Simple tasks, quick wins
   - **Medium** (4-6): Standard features, moderate effort
   - **High** (7-9): Complex systems, heavy lifting
   - Energy cost: **Complexity value = Energy points**
     - Complexity 1 = 1 point
     - Complexity 5 = 5 points
     - Complexity 9 = 9 points
5. **Click "ADD TASK"**
6. Task appears in the queue below

**Example Entry:**
```
Project:    Build Authentication
Tech Stack: Next.js, TypeScript, PostgreSQL
Complexity: 6 (Medium-High, 6 energy points)
```

---

## 🔄 Adding Multiple Entries

### **Quick Multi-Entry Workflow:**

The app allows you to rapidly add multiple tasks before merging. Here's the recommended workflow:

#### **Scenario: Planning Your Week**

**Step 1: Batch-Add University Tasks**

```
Entry 1:
- Subject: Calculus
- Topic: Limits
- Duration: 2h
→ Click "ADD TASK"

Entry 2:
- Subject: Calculus
- Topic: Derivatives
- Duration: 3h
→ Click "ADD TASK"

Entry 3:
- Subject: Physics
- Topic: Kinematics
- Duration: 2h
→ Click "ADD TASK"

Entry 4:
- Subject: Data Structures
- Topic: Hash Tables
- Duration: 3h
→ Click "ADD TASK"
```

**Step 2: Batch-Add Development Tasks**

```
Entry 1:
- Project: User Dashboard
- Stack: React, TypeScript
- Complexity: 4
→ Click "ADD TASK"

Entry 2:
- Project: Database Migration
- Stack: PostgreSQL, Node.js
- Complexity: 6
→ Click "ADD TASK"

Entry 3:
- Project: API Endpoints
- Stack: Next.js, TypeScript
- Complexity: 5
→ Click "ADD TASK"

Entry 4:
- Project: Deploy Pipeline
- Stack: Docker, AWS
- Complexity: 8
→ Click "ADD TASK"
```

**Step 3: Review Your Queues**

- **University Queue**: Shows all 4 study tasks
- **Dev Queue**: Shows all 4 development tasks
- **Total**: 8 tasks ready to schedule

**Step 4: Merge (see next section)**

---

### 3. Merging Streams

Once you've added all your tasks, merge them into a balanced schedule:

1. **Click the "MERGE STREAMS" button** (center, cyan-to-gray gradient)
2. Watch the animation (800ms)
3. **Timeline appears below** showing your optimized schedule

**What the algorithm does:**
- Starts from **tomorrow**
- Tries to place **at least 1 Uni + 1 Dev task per day**
- Respects **10 energy point daily limit**
- Alternates between streams when filling capacity
- Overflows to next day if current day is full

---

### 4. Understanding the Timeline

The merged timeline displays your schedule day-by-day:

**Timeline Structure:**

```
┌─────────────────────────────────────────┐
│           [ Monday ]  7⚡                │
│  Orb Orb     ●     Block Block          │
├─────────────────────────────────────────┤
│           [ Tuesday ]  9⚡               │
│  Orb     ●     Block Block Block        │
└─────────────────────────────────────────┘
```

**Day Header:**
- **Day Name**: Monday, Tuesday, etc.
- **Energy Indicator**:
  - 🟢 Green (≤8): Comfortable load
  - 🟡 Yellow (9-10): Full capacity
  - 🔴 Red (>10): Overloaded (algorithm tries to avoid this)

**Tasks:**
- **Left Side (Cyan Orbs)**: University tasks
  - Hover to see full topic details
- **Center Node**: Day separator with animated pulse
- **Right Side (Gray Blocks)**: Dev tasks
  - Hover to see full tech stack

---

## 🧠 The Algorithm

### **Load-Balancing Zipper Logic**

```typescript
Energy Weights:
├─ University: duration × 2 points
└─ Development: complexity = points (1-9)

Scheduling Rules:
1. Blend Rule: At least 1 Uni + 1 Dev per day (if available)
2. Capacity Rule: Max 10 energy points per day
3. Alternating Fill: After initial blend, alternate streams
4. Overflow: Remaining tasks move to next day
```

**Example Schedule Generation:**

```
Input:
- Uni: [2h, 3h, 2h] = [4, 6, 4] energy points
- Dev: [Complexity 5, 6, 3] = [5, 6, 3] energy points

Output:
Day 1: Uni(2h=4pts) + Dev(5pts) = 9pts ✅
Day 2: Uni(3h=6pts) + Dev(3pts) = 9pts ✅
Day 3: Uni(2h=4pts) + Dev(6pts) = 10pts ✅
```

---

## 💾 Persistence

### **Auto-Save Feature**

Your data is **automatically saved** to `localStorage`:

- ✅ Saves on every task add/remove
- ✅ Saves after merging schedule
- ✅ Loads automatically on page refresh
- ✅ Survives browser restarts

**Stored Data:**
```json
{
  "uniQueue": [...],
  "devQueue": [...],
  "schedule": [...],
  "lastUpdated": "2026-01-28T..."
}
```

**Reset:**
- Click **"RESET ALL"** to clear everything (including localStorage)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Hooks + localStorage
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```
dual-stream-planner/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── planner/             # Core planner components
│   │   ├── dual-stream-planner.tsx    # Main orchestrator
│   │   ├── university-stream.tsx      # Uni input panel
│   │   ├── dev-stream.tsx             # Dev input panel
│   │   ├── merged-timeline.tsx        # Schedule display
│   │   ├── circular-duration-slider.tsx
│   │   └── complexity-matrix.tsx
│   └── ui/                  # Reusable UI components
├── hooks/
│   └── useDualStream.ts     # Core algorithm hook
├── lib/
│   ├── planner-types.ts     # TypeScript interfaces
│   ├── storage.ts           # localStorage utilities
│   └── uuid.ts              # UUID generator
└── styles/
    └── globals.css          # Global styles
```

---

## 🐛 Troubleshooting

### **Tasks not appearing after refresh?**
- Check browser console for localStorage errors
- Ensure cookies/storage are enabled
- Try clearing cache and reloading

### **Algorithm not balancing correctly?**
- Verify energy points (hover over timeline day headers)
- Check if tasks have valid complexity/duration values
- Review the queue before merging

### **UI not responsive?**
- App is optimized for desktop (1024px+)
- Mobile support is functional but best on larger screens

---

## 📝 License

MIT License - feel free to use this for your own planning needs!

---

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.

---

## 👤 Author

**MarioFEDev**
- GitHub: [@MarioFEDev](https://github.com/MarioFEDev)
- Repository: [dual-stream-planner](https://github.com/MarioFEDev/dual-stream-planner)

---

**Built with ❤️ for productive dual-streamers**
