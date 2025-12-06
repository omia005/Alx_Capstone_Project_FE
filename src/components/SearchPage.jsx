import {useState} from 'react';
import SearchBar  from './SearchBar';

export default function SearchPage(){

  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    if (!query) return;

    try{
      const response =await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=6c8e299c&s=${encodeURIComponent (query)}`);
      const data = await response.json();

      setMovies(data.Search ||[]);
    }
    catch (error){
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };
  
  return(
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"} alt={movie.Title} className="w-full h-72 object-cover"/>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{movie.Title}</h2>
              <p className="text-gray-600">Year: {movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}