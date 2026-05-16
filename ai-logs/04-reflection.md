# Log 04 — Reflection

**Date:** May 15, 2026  
**Tool:** Claude Sonnet (claude.ai)

---

## What Was Easy

**UI generation was exceptionally fast.** Claude produced production-quality screen layouts on the first attempt. The dark cosmic design system (colors, spacing, card styles) was consistent across all 5 screens without me having to specify it repeatedly.

**Data architecture was clean.** The decision to put all static data in `constants/data.ts` and all persistence in `hooks/useStorage.ts` made the codebase easy to navigate. Claude suggested this pattern unprompted — it was the right call.

**SVG charts worked first try.** The `HeightChart` and `RingProgress` components rendered correctly without debugging. Claude knew exactly which `react-native-svg` props to use.

**Component reusability.** `Card.tsx` and `RingProgress.tsx` are genuinely reusable — I could drop them into any React Native project.

---

## What Was Difficult

**Dependency management was the biggest pain point.** The Expo ecosystem has many packages that need to match exact SDK versions. npm's peer dependency resolution made this a multi-hour battle. Claude gave good guidance but couldn't know in real time which exact versions were installed on my machine.

**Expo Go vs SDK version.** The mismatch between Expo Go on device (SDK 55) and the project (SDK 54) was confusing and not immediately obvious. Better error messages from Expo would help.

**LinearGradient native crash.** The `java.lang.String cannot be cast to java.lang.Boolean` crash from expo-linear-gradient was cryptic. Took a few rounds to diagnose it as a version incompatibility vs a code bug.

**Network tunnel.** Local network blocking on the router required switching to `--tunnel` mode, which added latency to hot reload.

---

## What I'd Change

1. **Start with `--template tabs`** — saves 2+ hours of peer dep setup
2. **Pin all versions upfront** using `npx expo install` instead of `npm install` for Expo packages
3. **Add AsyncStorage from day one** — wiring persistence after the UI is done adds friction
4. **Use a proper design token file** — the color constants in `data.ts` work but a dedicated `theme.ts` would be cleaner
5. **Add error boundaries** — currently a single screen crash takes down the whole app

---

## AI Prompting Lessons

**What worked well:**
- Being specific about constraints ("keep it short", "no time", "one file")
- Asking for all files in a category at once ("give code for app/(tabs)/ only")
- Sharing exact error messages — Claude diagnosed them accurately every time

**What didn't work:**
- Asking for version numbers — Claude's training data for package versions was often slightly outdated
- Expecting Claude to know the state of my local environment

**Best prompt of the project:**
> *"Give me very attractive frontend"*
This produced the full interactive HTML prototype that became the design reference for the entire app.

---

## Final Assessment

Using AI for this project compressed what would have been a 3-day build into roughly 6 hours of actual coding time (plus 3-4 hours of dependency debugging). The code quality is solid — readable, well-structured, and maintainable. 

The AI excelled at: UI code, architecture decisions, debugging cryptic errors, writing reusable components.

The AI struggled with: Real-time knowledge of package versions, environment-specific issues.

**Overall: Would use AI-assisted development for every future project.**
