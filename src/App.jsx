import MovieSearchPage from './components/SearchPage'
import MovieDetail from './components/MovieDetail.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MovieSearchPage/>}/>
        <Route path="/movie/:imdbID" element={<MovieDetail/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
