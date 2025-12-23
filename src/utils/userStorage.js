export function getUserData(username) {
  const data = JSON.parse(localStorage.getItem("userData")) || {};
  return data[username] || { favorites: [], watchlist: [], reviews: {} };
}

export function saveUserData(username, userData) {
  const data = JSON.parse(localStorage.getItem("userData")) || {};
  data[username] = userData;
  localStorage.setItem("userData", JSON.stringify(data));
}

export const getUserKey = (type, username) =>
  `${type}_${username}`;

export const getStoredList = (key) =>
  JSON.parse(localStorage.getItem(key)) || [];

export const saveStoredList = (key, list) =>
  localStorage.setItem(key, JSON.stringify(list));