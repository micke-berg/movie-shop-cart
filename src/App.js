import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Footer from "./Components/Footer/Footer";
import GridContainer from "./Components/GridContainer/GridContainer";
import Header from "./Components/Header/Header";
import Hero from './Components/Hero/Hero';
import Products from './Components/Products/Products';
import data from "./data.json";

function App() {
  const movies = data.movies;

  const [random, setRandom] = useState(0);
  const [count, setCount] = useState(0);
  const [filtering, setFiltering] = useState(false);
  const [moviesResult, setMoviesResult] = useState(movies);
  const [genreTitle, setGenreTitle] = useState('');
  const [price, setPriceResult] = useState(0);
  const [sort, setSortResult] = useState('');

  useEffect(() => {
    if (movies.length > 0) {
      const randomMovieIndex = Math.floor(Math.random() * (movies.length - 1));
      const randomMovie = movies[randomMovieIndex];
      setRandom(randomMovie.id);
    }  
  }, []);

  const sortMovies = (event) => { 
    const sort = event.target.value;

    console.log(event.target.value);

    setMoviesResult( moviesResult.slice().sort((a, b) => (
      sort === "lowest" ?
      ((a.price > b.price) ? 1 : -1) : 
      sort === "highest" ?
      ((a.price < b.price) ? 1 : -1) : 
      ((a.id > b.id) ? 1 : -1)
    )));
    setSortResult(event.target.value)
  } 

  const filterMovies = (event) => {
    console.log('mov', event.target.value);
    setGenreTitle(event.target.value);

    if(event.target.value === '') {
      setPriceResult(event.target.value)
      setMoviesResult(movies)
      setFiltering(false);
    } else {
      setFiltering(true);
      setPriceResult(event.target.value);
      setMoviesResult( movies.filter(movie => movie.movieGenre.indexOf(event.target.value) >= 0));
    }
  }  

  console.log(price);
  console.log(moviesResult)
  
  return (
    <>
      <Header 
        count={count} 
        price={price}
        sort={sort}
        filterMovies={filterMovies}
        sortMovies={sortMovies}
        />
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
            <Products movies={moviesResult} filtering={filtering} genreTitle={genreTitle}/>
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
