import HomePage from "../pages/home/home-page.js";
import AddStoryPage from "../pages/about/add-story-page.js";
import RegisterPage from "../pages/auth/register-page.js";
import LoginPage from "../pages/auth/login-page.js";
import OfflineStoriesPage from "../pages/offline/offline-stories-page.js";
import NotFoundPage from "../pages/not-found-page.js";

const routes = {
  "/": HomePage,
  "/add-story": AddStoryPage,
  "/register": RegisterPage,
  "/login": LoginPage,
  "/offline": OfflineStoriesPage,
};

const router = async () => {
  const content = document.querySelector("#main-content");
  let path = window.location.hash.slice(1) || "/";
  if (path.includes("?")) path = path.split("?")[0];

  // Cleanup previous page
  const previousPage = window.currentPage;
  if (previousPage && previousPage.cleanup) {
    previousPage.cleanup();
  }

  const Page = routes[path] || NotFoundPage;
  const pageInstance = new Page();

  try {
    const newContent = await pageInstance.render();

    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        content.innerHTML = newContent;
        await pageInstance.afterRender();
      });
    } else {
      content.innerHTML = newContent;
      await pageInstance.afterRender();

      // Custom animation fallback
      content.style.opacity = "0";
      content.style.transform = "translateY(20px)";

      requestAnimationFrame(() => {
        content.style.transition =
          "opacity 0.3s ease-out, transform 0.3s ease-out";
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      });
    }

    // Store current page instance for cleanup
    window.currentPage = pageInstance;
  } catch (error) {
    console.error("Error rendering page:", error);
    const notFoundPage = new NotFoundPage();
    content.innerHTML = await notFoundPage.render();
    await notFoundPage.afterRender();
  }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

export default routes;
