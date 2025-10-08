// --- To-Do List ---
let todos = [
  { text: 'Complete math homework', completed: true },
  { text: 'Study for history exam', completed: false },
  { text: 'Read chapter 5', completed: false },
  { text: 'Submit lab report', completed: false },
];

function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  let completedCount = 0;
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.className = todo.completed ? 'completed' : '';
    li.onclick = () => { todos[i].completed = !todo.completed; renderTodos(); };
    todoList.appendChild(li);
    if (todo.completed) completedCount++;
  });
  document.querySelector('.todo-progress-summary').textContent = `${completedCount} of ${todos.length} tasks completed`;
  document.getElementById('todo-progress-bar-inner').style.width = todos.length === 0 ? '0%' : `${(completedCount / todos.length) * 100}%`;
}

// Add or complete todos
document.getElementById('add-todo').onclick = function() {
  const input = document.getElementById('todo-input');
  const val = input.value.trim();
  if (val) {
    todos.push({ text: val, completed: false });
    input.value = '';
    renderTodos();
  }
};

document.getElementById('todo-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') document.getElementById('add-todo').click();
});

// --- Daily Quote ---
async function fetchQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    document.getElementById('quote-text').textContent = `"${data.content}"`;
    document.getElementById('quote-footer').textContent = `— ${data.author}`;
  } catch {
    document.getElementById('quote-text').textContent = `"Success is the sum of small efforts repeated day in and day out."`;
    document.getElementById('quote-footer').textContent = '— Robert Collier';
  }
}

// --- Weather ---
async function renderWeather() {
  try {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=17.3850&longitude=78.4867&current_weather=true");
    const data = await response.json();
    document.getElementById('weather-icon').textContent = '☀️';
    document.getElementById('weather-temp').textContent = `${data.current_weather.temperature}°C`;
    document.getElementById('weather-desc').textContent = 'Partly Cloudy';
    document.getElementById('weather-humidity').textContent = '--%';
    document.getElementById('weather-wind').textContent = `${data.current_weather.windspeed} km/h`;
    document.getElementById('weather-footer').textContent = 'Perfect day for studying! ☀️';
  } catch {
    document.getElementById('weather-icon').textContent = '☁️';
    document.getElementById('weather-temp').textContent = '--°C';
    document.getElementById('weather-desc').textContent = 'Unable to fetch weather';
    document.getElementById('weather-humidity').textContent = '--%';
    document.getElementById('weather-wind').textContent = '-- km/h';
    document.getElementById('weather-footer').textContent = '';
  }
}

// --- Dynamic Analytics & Pet Happiness ---
function updatePetAndAnalytics() {
  chrome.storage.local.get(['focusTime', 'distractTime'], data => {
    // Productivity variables
    const focusedMinutes = Math.floor(data.focusTime || 0);
    const distractedMinutes = Math.floor(data.distractTime || 0);
    const totalMinutes = focusedMinutes + distractedMinutes;
    const focusPct = totalMinutes ? (focusedMinutes / totalMinutes) * 100 : 0;

    // Analytics
    document.getElementById('focus-time').textContent = focusedMinutes;
    document.getElementById('distract-time').textContent = distractedMinutes;
    document.getElementById('focus-score-value').textContent = `${focusPct.toFixed(0)}%`;
    document.getElementById('total-minutes').textContent = totalMinutes;
    document.getElementById('focus-bar').style.width = `${focusPct}%`;
    document.getElementById('distract-bar').style.width = `${100 - focusPct}%`;

    // Pet Happiness is a blend: 75% focus, 25% to-do completion
    const completed = todos.filter(t => t.completed).length;
    const todoFactor = todos.length ? ((completed / todos.length) * 25) : 0;
    let petHappiness = Math.round(focusPct * 0.75 + todoFactor);
    petHappiness = Math.max(10, Math.min(100, petHappiness));

    document.getElementById('pet-happiness-value').textContent = `${petHappiness}%`;
    document.getElementById('pet-happiness-inner').style.width = `${petHappiness}%`;
    document.getElementById('pet-emoji').textContent = petHappiness >= 70 ? '🐱✨' : '🐱';
    document.getElementById('pet-status').textContent =
      petHappiness >= 70
        ? "I'm so happy! Keep staying productive! 😺"
        : "Try focusing more or doing tasks to make me happier! 🐱";
  });
}

// Pet buttons
document.getElementById('btn-pet').onclick = function() {
  let val = parseInt(document.getElementById('pet-happiness-value').textContent, 10);
  val = Math.min(100, val + 10);
  document.getElementById('pet-happiness-value').textContent = `${val}%`;
  document.getElementById('pet-happiness-inner').style.width = `${val}%`;
};
document.getElementById('btn-feed').onclick = function() {
  let val = parseInt(document.getElementById('pet-happiness-value').textContent, 10);
  val = Math.min(100, val + 15);
  document.getElementById('pet-happiness-value').textContent = `${val}%`;
  document.getElementById('pet-happiness-inner').style.width = `${val}%`;
};

// On load and refresh every 5s for live stats
window.onload = () => {
  renderTodos();
  fetchQuote();
  renderWeather();
  updatePetAndAnalytics();
  setInterval(updatePetAndAnalytics, 5000);
};
