// common.js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxpa8m8bubLG4nwln9lU5-5TFy8Q1ViKuqzbZAd8oj6E7UEFFrXG8FVjHAepz09fEaclw/exec";

/**
 * Universal API POST helper
 * payload = { action: "someAction", ...params }
 */
async function postData(action, data = {}) {
  try {
    const formData = new FormData();
    formData.append("action", action);
    for (const key in data) formData.append(key, data[key]);

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (err) {
    console.error("❌ API fetch failed:", err);
    alert("Server connection failed. Please check deployment URL or permissions.");
    throw err;
  }
}

// In common.js
function setupLogout() {
  const btn = document.getElementById("logoutBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "index.html";
    }
  });
}



