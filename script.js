let [minutes, seconds, milliseconds] = [0, 0, 0];
let timer = null;
let lapCount = 1;

const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const millisecondEl = document.getElementById("milliseconds");
const lapList = document.getElementById("lapList");

document.getElementById("start").addEventListener("click", () => {
  if (timer !== null) return;
  timer = setInterval(runStopwatch, 10);
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  [minutes, seconds, milliseconds] = [0, 0, 0];
  lapCount = 1;
  updateDisplay();
  lapList.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
  if (timer === null) return;
  const lapTime = `${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount++}: ${lapTime}`;
  lapList.appendChild(li);
});

function runStopwatch() {
  milliseconds += 1;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds += 1;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }
  updateDisplay();
}

function updateDisplay() {
  minuteEl.textContent = format(minutes);
  secondEl.textContent = format(seconds);
  millisecondEl.textContent = format(milliseconds);
}

function format(num) {
  return num < 10 ? "0" + num : num;
}