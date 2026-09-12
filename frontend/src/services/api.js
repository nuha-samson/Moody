const API_URL = 'https://moody-1-uyac.onrender.com/api'
const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message || "Something went wrong. Please try again."
    );

    error.status = response.status;
    throw error;
  }

  return data;
};

export const api = {
  // AUTH

  signup: (userData) =>
    request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    request("/auth/logout", {
      method: "POST",
    }),

  getMe: () =>
    request("/auth/me"),

  // MOODS

  getMoods: () =>
    request("/moods"),

  getMood: (id) =>
    request(`/moods/${id}`),

  createMood: (moodData) =>
    request("/moods", {
      method: "POST",
      body: JSON.stringify(moodData),
    }),

  updateMood: (id, moodData) =>
    request(`/moods/${id}`, {
      method: "PUT",
      body: JSON.stringify(moodData),
    }),

  deleteMood: (id) =>
    request(`/moods/${id}`, {
      method: "DELETE",
    }),

  deleteAllMoods: () =>
    request("/moods", {
      method: "DELETE",
    }),
};