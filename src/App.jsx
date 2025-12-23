import MovieSearchPage from './components/SearchPage'
import MovieDetail from './components/MovieDetail.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import Navbar from './components/navbar.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import FavoritesPage from './components/Favourites.jsx';
import WatchlistPage from './components/Watchlist.jsx';




function App() {
  return (
    <>
      {/* Fixed background */}
      <div
        className="
          fixed
          inset-0
          bg-[url('/movie-background.jpg')]
          bg-cover
          bg-center
          -z-10
        "
      />

      

      {/* Scrollable content */}
      <div className="min-h-screen">
        <BrowserRouter>
              <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                      <MovieSearchPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/navbar" element={<Navbar/>}/>
                <Route path='/' element={<MovieSearchPage/>}/>
                <Route path="/movie/:imdbID" element={
                  <ProtectedRoute>
                    <MovieDetail />
                  </ProtectedRoute>
                  } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/favorites" element={
                  <ProtectedRoute>
                     <FavoritesPage />
                  </ProtectedRoute>
                }/>
        
                <Route path="/watchlist" element={
                  <ProtectedRoute>
                    <WatchlistPage />
                  </ProtectedRoute>
                } />
        
               </Routes>
            </BrowserRouter>
      </div>
    </>
  );
}


export default App
