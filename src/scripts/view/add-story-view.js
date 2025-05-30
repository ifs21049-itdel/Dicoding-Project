export const renderAddStoryForm = (onSubmit, onStreamInitialized) => {
  const content = document.querySelector("#main-content");
  content.innerHTML = `
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

  const map = L.map("add-story-map").setView([0, 0], 2);
  const osmLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  const satelliteLayer = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data: © <a href="https://opentopomap.org">OpenTopoMap</a>',
    }
  );

  L.control
    .layers({
      OpenStreetMap: osmLayer,
      Satellite: satelliteLayer,
    })
    .addTo(map);

  let marker;
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
    document.getElementById("lat").value = lat;
    document.getElementById("lon").value = lng;
  });

  const video = document.getElementById("camera-stream");
  const canvas = document.getElementById("photo-canvas");
  const preview = document.getElementById("photo-preview");
  const captureButton = document.getElementById("capture-photo");

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      onStreamInitialized(stream);
    })
    .catch((err) => console.error("Camera access failed:", err));

  captureButton.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    preview.src = canvas.toDataURL("image/jpeg");
    preview.style.display = "block";
    video.srcObject.getTracks().forEach((track) => track.stop());
    video.style.display = "none";
    captureButton.style.display = "none";
  });

  document
    .getElementById("add-story-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const description = document.getElementById("description").value;
      const lat = document.getElementById("lat").value;
      const lon = document.getElementById("lon").value;

      canvas.toBlob(async (blob) => {
        const result = await onSubmit(description, blob, lat, lon);
        if (result && result.success && result.redirect) {
          window.location.hash = result.redirect;
        }
      }, "image/jpeg");
    });

  feather.replace();
};
