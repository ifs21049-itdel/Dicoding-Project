import { getData } from "../data/api.js";
import { saveStories, getStories } from "../utils/indexedDB.js";
import {
  renderStories,
  renderLoading,
  renderError,
} from "../view/home-view.js";

export default class HomePresenter {
  constructor() {
    this.loadStories();
  }

  async loadStories() {
    try {
      renderLoading();
      let stories = [];

      // Try fetching from API if online
      if (navigator.onLine) {
        try {
          stories = await getData();
          // Cache stories in IndexedDB
          await saveStories(stories);
        } catch (apiError) {
          console.warn(
            "API fetch failed, attempting to load from IndexedDB:",
            apiError
          );
        }
      }

      // If offline or API failed, load from IndexedDB
      if (!stories.length) {
        stories = await getStories();
      }

      renderStories(stories);
    } catch (error) {
      if (
        error.message.includes("authentication") ||
        error.message.includes("Unauthorized")
      ) {
        renderStories([]);
      } else {
        console.error("Failed to load stories:", error);
        renderError("Failed to load stories. Please try again later.");
      }
    }
  }
}
