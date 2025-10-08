const productiveSites = ["stackoverflow.com", "github.com", "w3schools.com"];
const distractingSites = ["facebook.com", "youtube.com", "reddit.com"];

let totalFocusTime = 0;
let totalDistractTime = 0;
let currentTabId = null;
let lastSwitchTime = Date.now();

function updateTime() {
  const now = Date.now();
  const elapsed = (now - lastSwitchTime) / 1000;
  lastSwitchTime = now;

  if (currentTabId === null) return;

  chrome.tabs.get(currentTabId, (tab) => {
    if (!tab || !tab.url) return;

    const url = new URL(tab.url);
    const hostname = url.hostname.replace("www.", "");

    if (productiveSites.some(site => hostname.includes(site))) {
      totalFocusTime += elapsed;
    } else if (distractingSites.some(site => hostname.includes(site))) {
      totalDistractTime += elapsed;
    }
    saveData();
  });
}

function saveData() {
  chrome.storage.local.set({
    focusTime: totalFocusTime,
    distractTime: totalDistractTime,
    petHappy: totalFocusTime >= totalDistractTime // Happy only if focused time ≥ distracted
  });
}

function resetData() {
  totalFocusTime = 0;
  totalDistractTime = 0;
  saveData();
}

chrome.tabs.onActivated.addListener(activeInfo => {
  currentTabId = activeInfo.tabId;
  lastSwitchTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active) {
    currentTabId = tabId;
    lastSwitchTime = Date.now();
  }
});

chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    updateTime();
    currentTabId = null;
  } else {
    chrome.tabs.query({ active: true, windowId }, (tabs) => {
      if (tabs.length > 0) {
        currentTabId = tabs[0].id;
        lastSwitchTime = Date.now();
      }
    });
  }
});

// Periodically update time every 5 seconds
setInterval(updateTime, 5000);

chrome.runtime.onInstalled.addListener(() => {
  resetData();
});
