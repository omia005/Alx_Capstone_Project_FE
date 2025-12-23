export function getUserData(username) {
  const data = JSON.parse(localStorage.getItem("userData")) || {};
  return data[username] || { favorites: [], watchlist: [], reviews: {} };
}

export function saveUserData(username, userData) {
  const data = JSON.parse(localStorage.getItem("userData")) || {};
  data[username] = userData;
  localStorage.setItem("userData", JSON.stringify(data));
}
