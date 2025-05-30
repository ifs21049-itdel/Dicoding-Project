import CONFIG from "../config.js";

const ENDPOINTS = {
  STORIES: `${CONFIG.BASE_URL}/stories?location=1`,
  ADD_STORY: `${CONFIG.BASE_URL}/stories`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  NOTIFICATIONS_SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
};

export function isLoggedIn() {
  return !!localStorage.getItem("authToken");
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
}

export async function register(name, email, password) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function login(email, password) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function getData() {
  const token = localStorage.getItem("authToken");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const fetchResponse = await fetch(ENDPOINTS.STORIES, { headers });
  const data = await fetchResponse.json();
  if (data.error) throw new Error(data.message);
  return data.listStory;
}

export async function addStory(description, photo, lat, lon) {
  const token = localStorage.getItem("authToken");
  const formData = new FormData();
  formData.append("description", description);
  formData.append("photo", photo);
  if (lat && lon) {
    formData.append("lat", lat);
    formData.append("lon", lon);
  }
  const response = await fetch(ENDPOINTS.ADD_STORY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function subscribePush(subscription) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(ENDPOINTS.NOTIFICATIONS_SUBSCRIBE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscription),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function unsubscribePush(endpoint) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(ENDPOINTS.NOTIFICATIONS_SUBSCRIBE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.message);
  return data;
}
