import MovieSearchPage from './components/SearchPage'
import MovieDetail from './components/MovieDetail.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import Navbar from './components/navbar.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';


function App(){
  return(
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
        <Route path="/movie/:imdbID" element={<MovieDetail/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
