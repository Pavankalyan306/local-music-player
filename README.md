
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

## 🧩 Architecture Flow

```mermaid
flowchart TD
    %% User Interaction
    A["🎶 User Opens App"] --> B["📡 Fetch Track List from Flask API"]

    %% Music Data Handling
    B --> C["🧠 Search & Filter Tracks"]
    C --> D["▶ Select Track to Play"]

    %% Audio Stream
    D --> E["🔊 React Audio Player"]
    E --> F["🌐 Streams via /stream/<file> from Flask"]
    F --> G["📁 Audio Files in /music Directory"]

    %% Metadata
    B --> H["🔍 Flask scans metadata using Mutagen"]
````

---

## 🚀 Setup & Run

### 1. Backend

Install Python dependencies:

```bash
pip install flask flask-cors mutagen
```

Start Flask:

```bash
cd backend
python app.py
```

Backend runs at:

```
http://localhost:5000
```

Add your audio files to:

```
backend/music/
```

---

### 2. Frontend (React)

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🎨 Screenshots

(Add screenshots here when ready!)

---

## 🔮 Future Improvements

* Real album artwork from embedded metadata
* Playlists & favorites
* Mobile improvements
* Smart shuffle
* Waveform progress bar
* Keyboard shortcuts

---

## 📜 License

MIT License. Modify, remix, and make it rock.

---

Made with ❤️, caffeine, and a folder of MP3 dreams.

```


