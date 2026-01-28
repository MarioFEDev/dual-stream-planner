# Learning Notes & Challenges

## 1. The Prompt Engineering Workflow
Building this project under a tight deadline (approx. 6 hours) forced me to adopt a **"Prompt-First" Development Lifecycle**. Instead of writing boilerplate code, I focused on writing detailed "Architectural Specs" for the AI.

* **Lesson:** AI tools like **v0.dev** and **Cursor** are not "magic wands" but "force multipliers." They require extremely precise constraints.
* **Example:** When I initially asked for a "scheduler," the AI gave me a simple list. I had to refine the prompt to explain the "Orb vs. Block" visual metaphor and the "Energy Point" logic to get a usable result. This taught me that **the quality of output is directly proportional to the clarity of the prompt.**

## 2. Challenge: Visualizing "Invisible" Logic
**The Challenge:** The scheduling algorithm works instantly in milliseconds, but users couldn't "feel" the complexity of what was happening. It just looked like tasks appeared randomly.
**The Solution:** I learned to use **Framer Motion** to create a "Merge" animation. By delaying the appearance of the timeline and animating the input streams "collapsing" into the center, I bridged the gap between the user's action and the system's calculation. This "Interaction Design" is crucial for user trust.

## 3. Technical Hurdle: The "Bin Packing" Edge Cases
**The Problem:** My initial logic was a simple "Round Robin" (Item A -> Day 1, Item B -> Day 2). However, this failed when I added a "4-hour Calculus" task and a "High Complexity Backend" task. The system put them on the same day, creating an unrealistic 12-hour workload.
**The Fix:** I had to pivot to a **Weighted System**. I learned to assign numerical values to abstract concepts (Complexity = Points) to create a "Soft Cap" for daily effort.
* *Key Takeaway:* Algorithmic thinking requires anticipating edge cases (like burnout) that pure code syntax doesn't catch.

## 4. CSS Architecture: Breaking the "Bootstrap" Look
**The Challenge:** Most AI-generated UIs look like standard corporate dashboards (White background, blue buttons). I wanted a "Cyberpunk" aesthetic.
**The Solution:** I learned to utilize **Tailwind's `backdrop-blur` and `bg-opacity`** utilities effectively. I discovered that "Glassmorphism" relies heavily on layering:
1.  Base: Dark `zinc-950`.
2.  Layer 1: Input Panels with `bg-zinc-900/50`.
3.  Layer 2: Floating Cards with `border-white/10`.
This layering creates depth without needing heavy custom CSS files.

## 5. React Hooks & Separation of Concerns
This project reinforced the importance of **Custom Hooks**. By extracting the massive `generateSchedule` function out of the main `App.tsx` and into `useDualStream.ts`, I kept my UI code clean.
* *Benefit:* If I want to change the algorithm tomorrow (e.g., to include weekends off), I only edit the hook file. The UI doesn't "know" how the schedule is made, only that it receives a list to render. This is a core principle of maintainable software architecture.

## 6. Conclusion
The "Intermediate Track" pushed me to go beyond "making it work" to "making it scale" (mentally and architecturally). Managing state, persistence, complex logic, and high-fidelity UI simultaneously was a significant step up from static web pages.