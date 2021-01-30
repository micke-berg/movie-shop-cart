import React, { useState, useEffect } from 'react'

import Footer from "./Components/Footer/Footer";
import GridContainer from "./Components/GridContainer/GridContainer";
import Header from "./Components/Header/Header";
import Hero from './Components/Hero/Hero';
import Products from './Components/Products/Products';
import data from "./data.json";

function App() {
  const movies = data.movies;
  const [random, setRandom] = useState(0);

  useEffect(() => {
    if (movies.length > 0) {
      const randomMovieIndex = Math.floor(Math.random() * (movies.length - 1));
      const randomMovie = movies[randomMovieIndex];
      setRandom(randomMovie.id);
    }  
  }, []);
  
  
  return (
    <>
      <Header />
      <GridContainer>
        <Hero 
          title={movies[random].title} 
          backgroundImage={movies[random].image} 
          description={movies[random].description}
          genres={movies[random].movieGenre}
          releaseDate={movies[random].releaseDate}
          />
        <main className="main">
          <div className="content">
            <div className="main">
            <Products movies={movies}/>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <Footer />
      </GridContainer>
    </>
  );
}

export default App;
