import MovieSearchPage from './components/SearchPage'
import MovieDetail from './components/MovieDetail.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Navbar from "./Navbar";


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MovieSearchPage/>}/>
        <Route path="/movie/:imdbID" element={<MovieDetail/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
