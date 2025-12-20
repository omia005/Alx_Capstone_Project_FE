import React from 'react'
import './App.css'
import MovieSearchPage from './components/SearchPage'


function App(){
  return(
    <div className="p-6 max-w-screen-xl mx-auto w-full">
      <h1 className="text-blue-700 text-6xl font-bold">Movie Searching App</h1>
      <p>Search for your favorite movies!</p>
      <MovieSearchPage />
    </div>
  )
}

export default App
