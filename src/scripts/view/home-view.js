import { showFormattedDate } from "../utils/index.js";
import { isLoggedIn } from "../data/api.js";

export const renderLoading = () => {
  const content = document.querySelector("#story-content");
  content.innerHTML = `
    <div class="loading">
      <i data-feather="loader"></i>
      <p>Loading stories...</p>
    </div>
  `;
  feather.replace();
};

export const renderStories = (stories) => {
  const userName = localStorage.getItem("userName") || "Your Story";
  const content = document.querySelector("#story-content");

  if (!isLoggedIn()) {
    content.innerHTML = `
      <div class="welcome-message">
        <h2 id="welcome-heading">Welcome to Dicoding Stories</h2>
        <p>Please <a href="#/login">login</a> to view and share stories.</p>
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="story-thumbnails" role="list">
      <div class="thumbnail" role="listitem">
        <a href="#/add-story" class="thumbnail-link">
          <div class="profile-pic add-story-thumbnail">
            <i data-feather="plus" class="add-icon"></i>
          </div>
          <span>Add Story</span>
        </a>
      </div>
      ${stories
        .slice(0, 5)
        .map(
          (story) => `
        <div class="thumbnail" role="listitem">
          <div class="profile-pic" style="background-image: url('${story.photoUrl}');"></div>
          <span>${story.name}</span>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="story-list" role="list">
      ${
        stories.length === 0
          ? `
        <div class="empty-stories">
          <i data-feather="image"></i>
          <h3>No stories yet</h3>
          <p>Be the first to share a story!</p>
          <a href="#/add-story" class="add-story-btn">
            <i data-feather="plus-circle"></i> Add Your First Story
          </a>
        </div>
      `
          : stories
              .map(
                (story) => `
        <article class="story-card" role="listitem">
          <div class="story-header">
            <div class="profile-pic" style="background-image: url('${
              story.photoUrl
            }');" aria-hidden="true"></div>
            <h2>${story.name}</h2>
          </div>
          <img src="${story.photoUrl}" alt="Story photo by ${
                  story.name
                }" class="story-image" loading="lazy" />
          <div class="content">
            <p class="description">
              <i data-feather="message-circle" aria-hidden="true"></i> 
              ${story.description}
            </p>
            <p class="date">
              <i data-feather="calendar" aria-hidden="true"></i> 
              ${showFormattedDate(story.createdAt)}
            </p>
            ${
              story.lat && story.lon
                ? `<div id="map-${story.id}" class="map" role="img" aria-label="Location map for ${story.name}'s story"></div>`
                : ""
            }
          </div>
        </article>
      `
              )
              .join("")
      }
    </div>
  `;

  stories.forEach((story) => {
    if (story.lat && story.lon) {
      setTimeout(() => {
        initializeStoryMap(story);
      }, 100);
    }
  });

  feather.replace();
};

export const renderError = (message) => {
  const content = document.querySelector("#story-content");
  content.innerHTML = `
    <div class="error-message">
      <h2>Error</h2>
      <p>${message}</p>
      <a href="#/" class="back-home">Back to Home</a>
    </div>
  `;
};

function initializeStoryMap(story) {
  try {
    const mapElement = document.getElementById(`map-${story.id}`);
    if (!mapElement) return;

    const map = L.map(`map-${story.id}`).setView([story.lat, story.lon], 13);

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
        "Street Map": osmLayer,
        Topographic: satelliteLayer,
      })
      .addTo(map);

    L.marker([story.lat, story.lon])
      .addTo(map)
      .bindPopup(`<b>${story.name}</b><br>${story.description}`)
      .openPopup();
  } catch (error) {
    console.error("Error initializing map:", error);
  }
}
