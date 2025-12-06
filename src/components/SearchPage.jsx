import { useState } from "react";
import SearchBar from "./SearchBar";

export default function MovieSearchPage() {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    if (!query) return;

    const res = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=6c8e299c&s=${query}`
    );

    const data = await res.json();
    setMovies(data.Search || []);
  };

  return (
    <div className="p-6">
      
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-2">{movie.Title}</h2>
              <p className="text-gray-600">{movie.Year}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No movies yet. Try searching!
          </p>
        )}
      </div>
    </div>
  );
}
