import {useState} from 'react';
import SearchBar  from './SearchBar';
import {Link, useLocation} from 'react-router-dom';

export default function MovieSearchPage(){
  const location = useLocation();
  const [movies, setMovies] = useState(
    location.state?.movies || []
  );

  const [query, setQuery] = useState(
    location.state?.query || ""
  );

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;
     
    try{
      const response =await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=6c8e299c&s=${encodeURIComponent (searchQuery)}`);
      const data = await response.json();

      setMovies(data.Search ||[]);
      setQuery(searchQuery);
    }
    catch (error){
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  return(
    <div className="p-6 max-w-screen-xl mx-auto w-full">
      <SearchBar onSearch={handleSearch} initialQuery={query}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {movies.length > 0 ? (
          movies.map((movie) => (
          <Link
            key={movie.imdbID}
            to={`/movie/${movie.imdbID}`}
            state={{ movies, query }} // we are sending both movie and query as state
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition block"
          >
           <img
             src={
             movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
            className="w-full h-80 object-cover rounded-lg mb-3"
           />

           <h2 className="text-lg font-semibold mb-1 text-blue-700 text-center">{movie.Title}</h2>
           <p className="text-gray-600 text-center">{movie.Year}</p>
           <p className="text-sm text-gray-600 mt-2 text-center">{movie.Type}</p>
        
          </Link>
    
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