import React from 'react'
import './App.css'
import MovieSearchPage from './components/SearchPage'


function App(){
  return(
    <div className="App">
      <h1>Movie Searching App</h1>
      <p>Search for your favorite movies!</p>
      <MovieSearchPage />
    </div>
  )
}

export default App
