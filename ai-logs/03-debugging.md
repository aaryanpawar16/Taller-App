# Log 03 — Debugging & Dependency Hell

**Date:** May 12–15, 2026  
**Tool:** Claude Sonnet (claude.ai)

---

## Problem 1 — SDK Version Mismatch
> "npm error ERESOLVE could not resolve / react-native-screens@4.25.0 requires react-native >=0.82.0"

**Root cause:** Initial `package.json` specified Expo SDK 51 but `react-native-screens` auto-resolved to a version requiring RN 0.82+.

**Fix applied:**
```bash
npm install --legacy-peer-deps
```
Claude explained `--legacy-peer-deps` is standard for Expo projects and safe to use.

---

## Problem 2 — Expo Go SDK Incompatibility
> "The installed version of Expo Go is for SDK 54. The project uses SDK 53."

**Root cause:** Package versions were behind what Expo Go on the device expected.

**Fix applied:** Upgraded core packages:
```bash
npm install expo@~54.0.0 expo-router@~5.0.0 react-native@0.77.0 --legacy-peer-deps
```

---

## Problem 3 — Missing Entry File
> "ConfigError: Cannot resolve entry file: The main field defined in your package.json points to an unresolvable or non-existent path."

**Root cause:** `create-expo-app` template set `"main": "index.ts"` but expo-router requires `"main": "expo-router/entry"`.

**Fix applied:**
```powershell
(Get-Content package.json) -replace '"main": "index.ts"', '"main": "expo-router/entry"' | Set-Content package.json
```

**Lesson:** Always check the `main` field when using expo-router with a blank template.

---

## Problem 4 — Missing Peer Dependencies (chain)
Expo Router requires many peer deps that aren't auto-installed. Had to install one by one as errors surfaced:

```bash
npm install react-native-safe-area-context --legacy-peer-deps
npm install expo-linking expo-constants expo-modules-core --legacy-peer-deps
npm install expo-splash-screen expo-font --legacy-peer-deps
```

**Lesson:** Should have used `npx create-expo-app` with the `tabs` template from the start — it comes with all peer deps pre-wired.

---

## Problem 5 — LinearGradient Crash
> "java.lang.String cannot be cast to java.lang.Boolean"

**Root cause:** `expo-linear-gradient` version mismatch with the installed React Native version caused a native prop type crash on Android.

**Fix applied:** Removed all `LinearGradient` usage from screens, replaced with plain `View` + equivalent dark background colors:
```tsx
// Before
<LinearGradient colors={['#1A1030','#0D1525']} style={s.heroCard}>

// After  
<View style={[s.heroCard, { backgroundColor: '#130D20' }]}>
```

**Visual impact:** Minimal — gradient was subtle. Solid dark colors look nearly identical.

---

## Problem 6 — React Version Mismatch
> "Incompatible React versions: react 19.1.0 vs react-native-renderer 19.1.1"

**Fix applied:**
```bash
npm install react@19.1.1 --legacy-peer-deps
```

---

## Problem 7 — Network Error on Device
> "java.io.IOException: Failed to download remote update"

**Root cause:** Phone and PC on same WiFi but firewall/router blocking local LAN connections.

**Fix applied:**
```bash
npx expo start --tunnel
```

Tunnel routes through Expo's servers, bypassing local network issues entirely.

---

## Total Time Lost to Dependency Issues
Approximately **3–4 hours** across the project. 

**Key takeaway:** For future projects, start with:
```bash
npx create-expo-app myapp --template tabs
```
This template includes expo-router, safe-area-context, and all peer deps pre-configured.
