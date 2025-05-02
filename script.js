const video = document.getElementById('lectureVideo');
const progressDisplay = document.getElementById('progress');
const videoSrc = video.querySelector('source').getAttribute('src');
const STORAGE_KEY = `watchedIntervals_${videoSrc}`;


let watchedIntervals = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let lastTime = 0;

// Merge overlapping intervals
function mergeIntervals(intervals) {
  intervals.sort((a, b) => a.start - b.start);
  const merged = [];
  for (const current of intervals) {
    if (merged.length === 0 || merged[merged.length - 1].end < current.start) {
      merged.push(current);
    } else {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, current.end);
    }
  }
  return merged;
}

// Get total watched seconds
function getTotalWatched(intervals) {
  return intervals.reduce((sum, i) => sum + (i.end - i.start), 0);
}

// Save intervals and update progress
function saveAndUpdateProgress() {
  watchedIntervals = mergeIntervals(watchedIntervals);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedIntervals));
  const totalWatched = getTotalWatched(watchedIntervals);
  const progress = ((totalWatched / video.duration) * 100).toFixed(2);
  progressDisplay.textContent = `Progress: ${progress}%`;
}

// Resume from last watched position
function resumeFromLastPosition() {
  if (watchedIntervals.length > 0) {
    const last = watchedIntervals[watchedIntervals.length - 1];
    video.currentTime = last.end;
  }
}

// Reset progress
function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    watchedIntervals = [];
    video.currentTime = 0;
    progressDisplay.textContent = `Progress: 0%`;
  }
  

// Listen for watching progress
video.addEventListener('timeupdate', () => {
  const currentTime = video.currentTime;
  if (Math.abs(currentTime - lastTime) < 2) {
    watchedIntervals.push({ start: lastTime, end: currentTime });
    saveAndUpdateProgress();
  }
  lastTime = currentTime;
});

// Save progress on pause/end
video.addEventListener('pause', saveAndUpdateProgress);
video.addEventListener('ended', saveAndUpdateProgress);

// On load
window.addEventListener('DOMContentLoaded', () => {
  resumeFromLastPosition();
  saveAndUpdateProgress();
});
