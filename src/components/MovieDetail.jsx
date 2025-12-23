import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserData, saveUserData, getUserKey, getStoredList, saveStoredList } from "../utils/userStorage";

export default function MovieDetail() {
  const { imdbID } = useParams();
  const user = localStorage.getItem("loggedInUser");

  const [movie, setMovie] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inWatchlist, setIsWatchlisted] = useState(false);

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?apikey=6c8e299c&i=${imdbID}&plot=full`
    )
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [imdbID]);

  useEffect(() => {
    if (!user) return;

    const userData = getUserData(user);
    setReviews(userData.reviews[imdbID] || []);
    setIsFavorite(userData.favorites.includes(imdbID));
    setIsWatchlisted(userData.watchlist.includes(imdbID));
  }, [user, imdbID]);

 // Check stored lists
  useEffect(() => {
    if (!user || !movie) return;

    const favKey = getUserKey("favorites", user);
    const watchKey = getUserKey("watchlist", user);

    setIsFavorite(
      getStoredList(favKey).some((m) => m.imdbID === imdbID)
    );

    setIsWatchlisted(
      getStoredList(watchKey).some((m) => m.imdbID === imdbID)
    );
  }, [imdbID, user, movie]);

  const toggleFavorite = () => {
    if (!user || !movie) return;

    const key = getUserKey("favorites", user);
    let list = getStoredList(key);

    list = isFavorite
      ? list.filter((m) => m.imdbID !== imdbID)
      : [...list, movie];

    saveStoredList(key, list);
    setIsFavorite(!isFavorite);
  };
  
  const toggleWatchlist = () => {
    if (!user || !movie) return;

    const key = getUserKey("watchlist", user);
    let list = getStoredList(key);

    list = inWatchlist
      ? list.filter((m) => m.imdbID !== imdbID)
      : [...list, movie];
    saveStoredList(key, list);
    setIsWatchlisted(!inWatchlist);
  };
  

  if (!movie) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  const submitReview = () => {
    if (!reviewText.trim()) return;

    const userData = getUserData(user);
    const movieReviews = userData.reviews[imdbID] || [];

    const newReview = {
      text: reviewText,
      date: new Date().toLocaleDateString()
    };

    userData.reviews[imdbID] = [...movieReviews, newReview];
    saveUserData(user, userData);

    setReviews(userData.reviews[imdbID]);
    setReviewText("");
  };

  if (!movie) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {/* Movie details */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-md">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-64 rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-500 mb-4">{movie.Year} • {movie.Genre} • {movie.Runtime}</p>
          <p className="mb-4"><strong>Director:</strong> {movie.Director}</p>
          <p className="mb-4"><strong>Language:</strong> {movie.Language}</p>
          <p className="mb-4"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="text-gray-600 mb-2">{movie.Plot}</p>
          <p className="text-sm">⭐ {movie.imdbRating}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={toggleFavorite}
              className="bg-yellow-500 px-4 py-2 rounded"
            >
              {isFavorite ? "Remove Favorite" : "Add to Favorites"}
            </button>

            <button
              onClick={toggleWatchlist}
              className="bg-green-600 px-4 py-2 rounded text-white"
            >
              {inWatchlist ? "Remove Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Reviews section BELOW movie details */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>

        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded mb-3"
          >
            <p>{review.text}</p>
            <span className="text-sm text-gray-500">
              {review.date}
            </span>
          </div>
        ))}

        {/* Add review */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="w-full border p-3 rounded mt-4"
        />

        <button
          onClick={submitReview}
          className="mt-3 bg-blue-700 text-white px-6 py-2 rounded"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
