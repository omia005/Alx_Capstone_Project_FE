import { Link } from "react-router-dom";
import { getUserKey, getStoredList } from "../utils/userStorage";

export default function FavouritePage() {
  const user = localStorage.getItem("loggedInUser");
  const favorites = getStoredList(getUserKey("favorites", user));

  if (favorites.length === 0) {
    return (
      <p className="text-center text-3xl text-white mt-20">
        <strong>Your Favorites list is empty 🎬</strong>
      </p>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">
        ❤️ My Favourites
      </h1>

      <div className="space-y-4">
        {favorites.map((movie) => (
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
                <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mt-1">
                    Favourite
                </span>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
