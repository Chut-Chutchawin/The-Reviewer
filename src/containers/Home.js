import React from 'react'
import NavBar from '../components/NavBar'
import Trending from '../components/Trending'
import PopularMovies from '../components/PopularMovies'
import TopRatedMovies from '../components/TopRatedMovies'
import UpcomingMovies from '../components/UpcomingMovies'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <NavBar />
      <Trending />
      <PopularMovies />
      <TopRatedMovies />
      <UpcomingMovies />
      <Footer />
    </div>
  )
}
