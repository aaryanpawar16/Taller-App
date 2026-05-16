# 🧬 Taller — Maximize Your Height

> A science-backed mobile app for teens and young adults focused on height optimization. Track measurements, follow AI-personalized routines, monitor sleep, and see your growth projection.

---

## 📱 Screenshots


| Home | Routine | Sleep | Nutrition | Progress |
|------|---------|-------|-----------|----------|
| ![home](<img width="314" height="692" alt="image" src="https://github.com/user-attachments/assets/1492ebcc-4481-4770-a8c4-4eb4d75b90b6" />
) | ![routine](./screenshots/routine.png) | ![sleep](./screenshots/sleep.png) | ![nutrition](./screenshots/nutrition.png) | ![progress](./screenshots/progress.png) |

---

## ✨ Features

- **📏 Height Logger** — Log measurements with time-of-day context, track delta between sessions
- **📈 Growth Chart** — 6-month SVG line chart showing your height trajectory
- **🧘 Daily Routine** — AI-personalized stretch & exercise list with progress tracking
- **😴 Sleep Tracker** — Log sleep hours and quality; weekly bar chart with growth hormone science
- **🥛 Nutrition Guide** — Track calcium, protein, Vitamin D and zinc with macro rings
- **🔮 Growth Projection** — 12-month height estimate based on sleep, exercise, and nutrition scores
- **🔥 Streak System** — Weekly consistency tracking to keep you motivated
- **💾 Persistent Storage** — All data saved locally via AsyncStorage, no account needed

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React Native | Mobile framework |
| Expo Router | File-based navigation |
| react-native-svg | Growth charts & progress rings |
| AsyncStorage | Local data persistence |
| lucide-react-native | Tab bar icons |
| TypeScript | Type safety |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo Go app on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/taller.git
cd taller

# Install dependencies
npm install --legacy-peer-deps

# Start the dev server
npx expo start --tunnel
```

Scan the QR code with Expo Go on your phone.

---

## 📁 Project Structure

```
taller/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home — hero card, growth chart, streak
│   │   ├── routine.tsx        # Daily stretch & exercise routine
│   │   ├── sleep.tsx          # Sleep tracker + weekly chart
│   │   ├── nutrition.tsx      # Macro rings + superfood guide
│   │   ├── progress.tsx       # Height logger + growth projection
│   │   └── _layout.tsx        # Tab bar configuration
│   └── _layout.tsx            # Root layout + status bar
├── components/
│   ├── HeightChart.tsx        # Reusable SVG line chart
│   ├── RingProgress.tsx       # Circular progress ring
│   └── Card.tsx               # Base card wrapper
├── constants/
│   └── data.ts                # All static data & color palette
├── hooks/
│   └── useStorage.ts          # AsyncStorage hooks for persistence
└── ai-logs/                   # AI-assisted development logs
```

---

## 🤖 AI Development

This app was built with Claude (Anthropic) as the primary AI development assistant. The full conversation logs, prompts, and reflections are documented in the [`/ai-logs`](./ai-logs/) folder.

**Key stats:**
- ~45 AI prompts across the full build
- ~6 hours of coding (vs estimated 3 days manual)
- AI handled: UI design, architecture, component generation, debugging

---

## 🧪 The Science

| Factor | Impact |
|--------|--------|
| 😴 Sleep (8–10h) | 80% of GH released during deep sleep |
| 🧘 Spine decompression | Can add 1–2 cm by correcting posture |
| 🥛 Calcium (1200mg/day) | Direct bone length growth |
| 💧 Hydration | Spinal disc health and flexibility |
| ⚡ Growth plate stimulation | Jumping exercises during growth years |

---

## 🎯 Roadmap

- [ ] Real bedtime/wake time input with native time picker
- [ ] Push notifications for bedtime reminders
- [ ] BMI + weight tracking
- [ ] Cloud sync with Supabase
- [ ] Percentile comparison by age and gender
- [ ] Wearable integration (sleep data from watch)

---

## 📹 Demo

> *(Add your Loom link here)*

---

## 🙏 Acknowledgements

- Reference app: [Taller – Maximize your height](https://apps.apple.com/us/app/taller-maximize-your-height/id6695758303)
- Challenge by: [8xsocial](https://github.com/8xsocial/template-mobile)
- Built with: Claude Sonnet by Anthropic

---

## 📄 License

MIT — feel free to use, modify, and build on this.


