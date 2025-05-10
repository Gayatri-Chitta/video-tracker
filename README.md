# video-tracker

A smart video tracking system that calculates **unique watch progress**, **prevents skipping from inflating progress**, and supports **resume playback** with persistent tracking.

---

## 🚀 Features

- ✅ Tracks watched intervals with precision  
- 🔄 Prevents double-counting and cheating via skipping  
- 💾 Stores video progress locally (can be extended to backend storage)  
- ⏯️ Supports resume from last watched position  

---

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript  
- **Video Handling**: HTML5 `<video>` API  
- **Progress Tracking**: Custom JavaScript logic using `timeupdate` and interval mapping  
- *(Optional)*: LocalStorage or backend integration for persistent tracking  

---

## 📂 Project Structure
```
video-tracker/
├── index.html
├── style.css
├── script.js
└── README.md
```
---

## 📌 How It Works

1. **Track Unique Intervals**  
   - The video is divided into small chunks (e.g., 1-second units).  
   - Only watched chunks are marked as completed.

2. **Prevent Skipping**  
   - Skipped or fast-forwarded sections are not counted until actually viewed.

3. **Save Progress**  
   - Watch progress is saved locally or sent to a backend.  
   - On page reload, the video resumes from the last position.

---

## 🧪 Setup and Usage

1. **Clone the repository.**

2. **Open index.html in a browser.**
   - No build step required, just open the file directly

3. **Start watching the video.**
   - Progress will be tracked and saved in real-time.





