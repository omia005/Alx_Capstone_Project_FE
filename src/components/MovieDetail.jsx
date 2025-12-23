import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails() {
  const [movie, setMovie] = useState();
  const { imdbID } = useParams(); // fetches the imdbID from the URL
  const navigate = useNavigate(); // to navigate back
  const location = useLocation();


  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=6c8e299c`);
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [imdbID]);

  if (!movie) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline font-medium"
      >
        ← Back to search
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
          className="w-full md:w-72 rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-600 mb-2">{movie.Year}</p>
          <p className="mb-4">{movie.Plot}</p>

          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Premiered on:</strong> {movie.Released}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          
        </div>
      </div>
    </div>
  );
}
