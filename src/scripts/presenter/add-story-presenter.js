import { addStory } from "../data/api.js";
import { renderAddStoryForm } from "../view/add-story-view.js";
import {
  registerServiceWorker,
  subscribeToPushNotifications,
  sendPushSubscriptionToServer,
} from "../utils/notification.js";

export default class AddStoryPresenter {
  #videoStream = null;

  async initialize() {
    this.render();
    await this.registerNotifications();
  }

  async registerNotifications() {
    try {
      await registerServiceWorker();
      const subscription = await subscribeToPushNotifications();
      await sendPushSubscriptionToServer(subscription);
      console.log("Push notifications registered successfully");
    } catch (error) {
      console.error("Push notification registration failed:", error);
    }
  }

  render() {
    renderAddStoryForm(
      async (description, photo, lat, lon) => {
        try {
          if (!description || !photo) {
            alert("Please fill in all required fields and capture a photo.");
            return;
          }
          await addStory(description, photo, lat || null, lon || null);
          alert("Story added successfully!");
          return { success: true, redirect: "/" };
        } catch (error) {
          console.error("Failed to add story:", error);
          alert(`Failed to add story: ${error.message}`);
          return { success: false, error: error.message };
        }
      },
      (stream) => {
        this.#videoStream = stream;
      }
    );
  }

  cleanup() {
    if (this.#videoStream) {
      this.#videoStream.getTracks().forEach((track) => track.stop());
      this.#videoStream = null;
    }
  }
}
