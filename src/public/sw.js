importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate, NetworkFirst } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

// Cache the Application Shell (static assets)
workbox.core.clientsClaim();
workbox.core.skipWaiting();

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/styles.css", revision: "1" },
  { url: "/scripts/index.js", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css", revision: null },
  { url: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", revision: null },
  { url: "https://unpkg.com/feather-icons", revision: null },
]);

// Cache static assets (CSS, JS, images)
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache API responses
registerRoute(
  ({ url }) => url.origin === "https://story-api.dicoding.dev",
  new NetworkFirst({
    cacheName: "api-responses",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // 1 day
      }),
    ],
  })
);

// Handle push notifications
self.addEventListener("push", (event) => {
  const data = event.data.json();
  const { title, options } = data;
  event.waitUntil(self.registration.showNotification(title, options));
});
