import { isLoggedIn, logout } from "../data/api.js";

export function updateAuthUI() {
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");
  const addStoryLink = document.getElementById("add-story-link");
  const offlineLink = document.getElementById("offline-link");

  if (isLoggedIn()) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logoutLink.style.display = "block";
    addStoryLink.style.display = "block";
    offlineLink.style.display = "block";
  } else {
    loginLink.style.display = "block";
    registerLink.style.display = "block";
    logoutLink.style.display = "none";
    addStoryLink.style.display = "none";
    offlineLink.style.display = "block"; // Always show offline link
  }
}

export function setupLogout() {
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
      updateAuthUI();
      window.location.hash = "#/"; // Fixed the hash syntax
    });
  }
}
