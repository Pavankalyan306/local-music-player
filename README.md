
---
# 🎧 Local Music Streaming App  
A simple Spotify-like web music player built using **React (Frontend)** and **Flask (Backend)**.  
It scans local music files, extracts metadata using **Mutagen**, and streams audio to the browser.

---

## ✅ Features
- Search music by **title or artist**
- Play, pause, next, previous controls
- Seek bar with live time updates
- Show album art placeholder (future-ready for real covers)
- Local streaming & audio download support
- Auto metadata extraction (title, artist, album, duration)

---

## 🧩 Tech Stack  
| Layer | Technology |
|-------|------------|
| Frontend | React, TailwindCSS |
| Backend | Flask + Mutagen |
| Streaming | Native HTML5 `<audio/>` |
| CORS | Enabled for React dev |

---

## 📂 Project Structure
```

project/
├─ frontend/ (React app)
└─ backend/
├─ app.py
└─ music/  your .mp3 / .wav / .m4a files here

````

---

## 🚀 Setup & Run

### 1. Backend
Install Python dependencies:
```bash
pip install flask flask-cors mutagen
````

Start Flask:

```bash
cd backend
python app.py
```

This runs server at:

```
http://localhost:5000
```

Place your audio files inside:

```
backend/music/
```

---

### 2. Frontend (React)

Install dependencies:

```bash
npm install
```

Run development:

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

(or whatever port Vite uses)

---

## 🎨 Screenshots

(Add screenshots here when ready!)

---

## 🔮 Future Improvements

* Real album artwork from metadata
* Playlists & favorites
* Waveform progress bar
* Mobile-friendly enhancements
* Hotkeys: space to play/pause

---

## 📜 License

MIT License. Modify, remix, and make it rock.

---

Made with ❤️, caffeine, and a folder of MP3 dreams.

```

