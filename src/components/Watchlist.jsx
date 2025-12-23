import { Link } from "react-router-dom";
import { getUserKey, getStoredList } from "../utils/userStorage";

export default function WatchlistPage() {
  const user = localStorage.getItem("loggedInUser");
  const watchlist = getStoredList(getUserKey("watchlist", user));

  if (watchlist.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20">
        Your watchlist is empty 🎬
      </p>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Watchlist
      </h1>

      <div className="space-y-4">
        {watchlist.map((movie) => (
          <Link
            key={movie.imdbID}
            to={`/movie/${movie.imdbID}`}
            className="block"
          >
            <div className="flex gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-24 h-36 object-cover rounded-lg"
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {movie.Title}
                </h3>
                <p className="text-sm text-gray-600">{movie.Year}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Type: {movie.Type}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
