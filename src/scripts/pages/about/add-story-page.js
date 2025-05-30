import AddStoryPresenter from "../../presenter/add-story-presenter.js";
import { renderAddStoryForm } from "../../view/add-story-view.js";

export default class AddStoryPage {
  #presenter = null;

  async render() {
    return `
      <section class="story-section" aria-labelledby="add-story-heading">
        <h2 id="add-story-heading">Add a New Story</h2>
        <form id="add-story-form">
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" required aria-required="true"></textarea>
          </div>
          <div class="form-group">
            <label for="photo">Capture Photo</label>
            <video id="camera-stream" autoplay></video>
            <img id="photo-preview" style="display: none; width: 100%; border-radius: 8px;" alt="Captured photo preview">
            <button type="button" id="capture-photo">Capture Photo</button>
            <canvas id="photo-canvas" style="display: none;"></canvas>
          </div>
          <div class="form-group">
            <label for="add-story-map">Select Location on Map</label>
            <div id="add-story-map" class="map"></div>
            <input type="hidden" id="lat" name="lat" aria-describedby="map-description">
            <input type="hidden" id="lon" name="lon" aria-describedby="map-description">
            <p id="map-description" class="sr-only">Click on the map to select a location for your story.</p>
          </div>
          <button type="submit"><i data-feather="plus-circle"></i> Add Story</button>
        </form>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new AddStoryPresenter();
    await this.#presenter.initialize();
  }

  cleanup() {
    if (this.#presenter) {
      this.#presenter.cleanup();
    }
  }
}
