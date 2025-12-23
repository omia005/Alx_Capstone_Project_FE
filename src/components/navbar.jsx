// Navbar.jsx
//Read the logged-in user from localStorage
//Show different buttons based on auth state
//Handle logout cleanly

import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onSearch, initialQuery }) {
  const [user, setUser] =useState(null);
  const navigate =useNavigate();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  },[]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };


  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-50 w-full rounded-xl mb-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
         <div className="flex justify-between items-center w-full sm:w-auto">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold">
                MovieApp
              </Link>

              {/* Search bar (only show when logged in) */}
              {user && (
                <div className="flex-1 mx-4">
                 <SearchBar onSearch={onSearch} initialQuery={initialQuery} />
                </div>
              )}

              {/* Auth buttons */}
              
                {user ? (
                 <>
                  
                  <button
                   onClick={handleLogout}
                   className="bg-blue px-4 py-2 rounded hover:bg-red-600 transition "
                  >
                    Logout
                  </button>
                 </>
                ) : (
                 <>
                   <Link
                    to="/login"
                    className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-100 transition"
                   >
                    Login
                   </Link>
                   <Link
                    to="/signup"
                    className="border border-white px-4 py-2 rounded hover:bg-blue-600 transition"
                   >
                    Signup
                   </Link>
                  </>
                )}
              
          </div>
        
       </div>
      </div>
    </nav>
  );
}