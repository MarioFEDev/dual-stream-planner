# Prompts Used & Development Log

This document records the specific AI prompts used to generate the UI, implement the core business logic, and debug specific issues during the development of the **Dual-Stream Planner**.

---

## 🎙️ Workflow Highlight: Voice-Integrated Engineering
**Tool:** Wispr Flow
**Impact:** 3x Faster Iteration Speed

Before executing the technical prompts below, I integrated **Wispr Flow** into my development loop to bypass the "typing bottleneck." By treating my IDE as a voice-first interface, I was able to articulate complex architectural constraints—like the "Glassmorphism" layering and the "Energy Point" logic—naturally and rapidly.

This "Voice-to-Prompt" workflow allowed me to inject rich, nuanced context into Cursor/v0 without the friction of manual drafting.

> **The "Wispr" Input (Transcribed):**
> *"Okay, for the timeline visualization, I don't want just a boring list. I want it to look like a zipper or a DNA strand where the left side is the school stuff and the right side is the coding stuff, and they merge in the middle. Also, make sure that if I have a really hard coding task, it doesn't put it on the same day as a long study session because that would burn me out. Use some kind of point system to balance that."*
>
> **The Result:** This raw stream-of-consciousness was instantly converted into the structured constraints found in the Master Prompts below.

## Phase 1: The Foundation (Master Prompts)

### 1. UI Generation (Tool: v0.dev)
**Goal:** Create a "Cyberpunk/Glassmorphism" visual shell that separates Academic and Developer tasks.
**Strategy:** I used highly descriptive visual terms ("Orbs", "Blocks", "Zipper Timeline") to prevent the AI from generating a standard generic dashboard.

> **Prompt:**
> "Design a futuristic 'Dual-Stream Planner' interface using React, Tailwind, and Framer Motion.
>
> **The Aesthetic:**
> * Style: 'Glassmorphism' meets 'Cyberpunk'. Deep midnight background (zinc-950) with glowing accents.
> * Layout: Asymmetrical and dynamic. Use floating cards with glass blur effects.
>
> **The Input Section:**
> 1. **The 'University' Stream (Left - Cyan Glow):** Inputs for 'Subject Name', 'Topic', and a Circular Slider for 'Duration'. Visual: Items appear as floating 'Orbs'.
> 2. **The 'Dev' Stream (Right - Neon Purple Glow):** Inputs for 'Project Name', 'Tech Stack', and a 'Complexity' Matrix. Visual: Items appear as rigid 'Blocks'.
>
> **The Output Section:**
> * Visual Metaphor: A 'Zipper' or 'DNA Helix' Timeline in the center.
> * Mechanism: When clicked, animate the streams merging into a central timeline.
> * The Schedule: Days contain a balanced mix of Orbs and Blocks."

---

### 2. Logic Implementation (Tool: Cursor / Claude 3.5 Sonnet)
**Goal:** Implement the "Weighted Bin Packing" algorithm to intelligently schedule tasks based on load capacity.
**Strategy:** I provided the exact TypeScript interfaces and the math for the "Energy Points" system to ensure the AI built a robust engine rather than a simple randomized list.

> **Prompt:**
> "System Role: You are a Senior Algorithm Engineer.
> Goal: Create the logic engine (`useDualStream.ts`) that manages these inputs and 'zips' them into a balanced schedule.
>
> **Phase 1: Data Model**
> * Define `UniTask` (Orb) with `duration` and `DevTask` (Block) with `complexity`.
> * Define `DaySchedule` with an `energyPoints` calculator.
>
> **Phase 2: The Logic (`generateSchedule`)**
> * Concept: Treat each day as having a 'Max Energy Capacity' of 10 Points.
> * Weights: Uni Task (Duration * 2), Dev Task (Low=3, Med=5, High=8).
> * Rules: Loop through days. Try to fit tasks from BOTH queues. Stop adding if `energyPoints` > 10. Push overflow to the next day.
>
> **Phase 3: Integration**
> * Connect the inputs to `addUniTask`/`addDevTask`.
> * Connect the 'Merge' button to the generation function."

---

## Phase 2: Refinement & Debugging (Iterative Prompts)

After the initial generation, I encountered specific runtime errors and feature limitations. I used the following prompts to resolve them.

### 3. Data Persistence
**Goal:** Prevent data loss on browser refresh.
**Issue:** The MVP state was resetting every time the page reloaded.

> **Prompt:**
> "Update the application state management so that the current state (queues and generated schedule) is automatically saved to `localStorage` on every change, and loaded correctly when the page reloads."

### 4. Fixing Runtime Errors (UUID)
**Goal:** Fix a browser compatibility crash.
**Issue:** The AI used `crypto.randomUUID()`, which is not supported in all non-secure contexts or older browser environments, causing a white screen crash.

> **Prompt:**
> "The crypto UUID generator is causing errors in both Uni and Dev streams: `Runtime TypeError: crypto.randomUUID is not a function`. Replace this with a robust custom ID generator or a library-safe alternative to fix the crash."

### 5. Expanding Logic Complexity
**Goal:** Increase the granularity of the "Developer Stream" inputs.
**Issue:** The initial logic only supported 3 complexity levels (Low/Med/High), but the requirements demanded more detailed grading.

> **Prompt:**
> "Currently, the complexity interface only accommodates 3 levels. Modify the app (interfaces, UI matrix, and scoring logic) to cater for **9 distinct complexity levels** (e.g., 1-9 grid). Ensure the 'Energy Point' calculation scales accordingly. Also, review the file and fix any typos in the comments or variable names."