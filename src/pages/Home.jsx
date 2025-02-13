import React from 'react'
import Hero from '../componants/Hero'
import MovieRow from '../componants/MovieRow'
import endpoints from '../services/MovieServices'

const Home = () => {
  return (
    <>
      <Hero />
      {/* <MovieRow title="upcoming" url={endpoints.upcoming}/> */}
      <MovieRow title="trending" url={endpoints.trending}/>
      <MovieRow title="topRated" url={endpoints.topRated}/>
      <MovieRow title="comedy" url={endpoints.comedy}/>
      <MovieRow title="popular" url={endpoints.popular}/>
    </>
  )
}

export default Home
