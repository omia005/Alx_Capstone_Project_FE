// Navbar.jsx
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar({ onSearch, initialQuery }) {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-50 w-full rounded-xl mb-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <Link to="/" className="text-2xl font-bold">
            MovieHub
          </Link>

          <div className="hidden sm:flex space-x-4 ml-10">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </div>
        </div>

        {/* Add search bar inside navbar */}
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
          <SearchBar onSearch={onSearch} initialQuery={initialQuery} />
        </div>
      </div>
    </nav>
  );
}