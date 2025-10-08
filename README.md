# FocusPals – Student Productivity Dashboard Chrome Extension

FocusPals is a beautiful, modern Chrome extension that transforms your new tab into a dashboard for productivity, wellness, and motivation—especially tailored for students. It combines an interactive to-do list, live productivity analytics, weather updates, daily inspiration, and a virtual pet that thrives as you get more focused and accomplished.

---

## Features

- **To-Do List**: Easily add, complete, and track your daily study and personal tasks.
- **Daily Inspiration**: Enjoy a fresh motivational quote each time you open a new tab.
- **Weather Widget**: See your local weather at a glance, right where you need it.
- **Virtual Pet**: Your friendly pet gets happier as you finish more tasks and boost your focus!
- **Focus Analytics**: Visualize your focused vs. distracted time in real-time to build better habits.
- **Modern UI**: Clean pastel design, card-based layout, icons, and a responsive grid for users on any laptop screen.

---

## How It Works

- The extension tracks your time spent on productive and distracting websites (easily configurable in `background.js`).
- Focus score and analytics are calculated from your active tabs, so your stats are always up to date.
- Pet happiness combines your focus score and to-do completion for a true gamified boost to your motivation.

---

## Installation

1. **Clone this repository:**
    ```
    git clone https://github.com/yourusername/focuspals.git
    cd focuspals
    ```

2. **In Chrome, navigate to:** `chrome://extensions/`
3. **Enable "Developer Mode"** (switch at the top right).
4. **Click "Load unpacked"** and select this folder.
5. **Open a new tab** to see FocusPals in action!

---

## Project Structure

- `manifest.json` – Extension manifest configuration.
- `background.js` – Time tracking for productive/distracting sites.
- `newtab.html` – Main dashboard interface.
- `styles.css` – UI design, theming & card grid.
- `newtab.js` – Handles UI logic (to-dos, analytics, pet, quotes, weather).
- `icons/` or `assets/` – Place your pet images or custom icons here.

---

## Customization

- Edit lists in `background.js` to set which sites are tracked as "productive" or "distracting".
- Change accent colors and layout in `styles.css`.
- Replace pet or icon images in the `assets` or `icons` folder as desired.

---

## Contributing

Pull requests, issues, and suggestions are always welcome!

---

## License

MIT License

---

## Repository Description

FocusPals is a Chrome extension new tab dashboard for students that gamifies focus and organization. Track your productivity, complete tasks, view live motivational stats and weather, and care for a cute virtual pet that celebrates your progress!
