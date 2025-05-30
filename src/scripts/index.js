import "../styles/styles.css";
import App from "./pages/app.js";
import { isLoggedIn } from "./data/api.js";
import { updateAuthUI, setupLogout } from "./utils/auth-ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
  });

  // Initialize app
  await app.renderPage();

  // Initial navigation update
  updateAuthUI();
  setupLogout();

  // Handle route changes
  window.addEventListener("hashchange", async () => {
    await app.renderPage();
    updateAuthUI();
  });

  // Register service worker
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered successfully");
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

  // Make feather icons available globally
  window.feather = feather;
  feather.replace();
});
