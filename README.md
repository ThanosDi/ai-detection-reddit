# AI Detector for Reddit 🔎🤖

**AI Detector for Reddit** is a lightweight Chrome extension that scans Reddit post or comments and highlights those that might have been written by AI (such as ChatGPT). It looks for common linguistic patterns often used in AI-generated responses and subtly marks them for human review.

---

## ✨ Features

- 🧠 Detects potential AI-style responses in Reddit threads
- 🎨 Highlights suspect comments with a soft background and visual cue
- 🔍 Marks matched AI-like phrases within the comment for easy spotting
- ⚡ Works on dynamic pages with infinite scroll (via MutationObserver)
- 🧩 Easy to install and lightweight—no external dependencies

---

## 📦 Installation

1. Download or clone this repository.
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Build the TypeScript files:
   ```bash
   yarn build
   ```
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable **Developer Mode** (toggle in top-right)
6. Click **"Load unpacked"** and select the root folder of this project (the folder containing `manifest.json`)

---

## 🛠️ Usage

Once installed:

- Visit any Reddit thread
- The extension will automatically highlight comments that include common ChatGPT-style phrasing
- Hover over highlighted text to inspect the specific matched phrases

No interaction is needed — it works passively in the background.

---

## 🧩 Developer Info

- Manifest Version: 3
- Content script: Runs on Reddit only
- Highlight logic is driven by a customizable list of AI-style trigger phrases

If you'd like to improve detection or reduce false positives, simply edit the `triggerPhrases` array in `content.js`.

---

## 🧑‍🎨 Icon Attribution

Icon used in this project:

> **"Computer vision" icon by [iconixar](https://www.flaticon.com/authors/iconixar) from [Flaticon.com](https://www.flaticon.com/)**

Licensed under [Flaticon's Free License](https://www.flaticon.com/license) (with attribution).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). You're free to use, modify, and distribute it with attribution.

---

## 💬 Feedback

Suggestions, issues, or pull requests are welcome!  
Feel free to fork the project or contribute via GitHub.
