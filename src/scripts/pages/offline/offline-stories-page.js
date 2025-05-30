import {
  getStories,
  deleteStory,
  clearStories,
} from "../../utils/indexedDB.js";
import { renderStories } from "../../view/home-view.js";

export default class OfflineStoriesPage {
  async render() {
    return `
      <section class="story-section" aria-labelledby="offline-stories-heading">
        <h2 id="offline-stories-heading">Offline Stories</h2>
        <button id="clear-stories" class="clear-btn"><i data-feather="trash-2"></i> Clear All Stories</button>
        <div id="story-content"></div>
      </section>
    `;
  }

  async afterRender() {
    try {
      const stories = await getStories();
      renderStories(stories);

      // Add delete functionality to each story
      document.querySelectorAll(".story-card").forEach((card, index) => {
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i data-feather="trash"></i> Delete';
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", async () => {
          await deleteStory(stories[index].id);
          this.afterRender(); // Refresh the list
        });
        card.appendChild(deleteBtn);
      });

      // Add clear all stories button
      document
        .getElementById("clear-stories")
        .addEventListener("click", async () => {
          await clearStories();
          this.afterRender(); // Refresh the list
        });

      feather.replace();
    } catch (error) {
      console.error("Failed to load offline stories:", error);
      document.querySelector("#story-content").innerHTML = `
        <div class="error-message">
          <h2>Error</h2>
          <p>Failed to load offline stories. Please try again later.</p>
        </div>
      `;
    }
  }
}
