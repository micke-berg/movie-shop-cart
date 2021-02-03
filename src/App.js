import React, { useState, useEffect } from 'react'
import Footer from "./Components/Footer/Footer";
import GridContainer from "./Components/GridContainer/GridContainer";
import Header from "./Components/Header/Header";
import Hero from './Components/Hero/Hero';
import Products from './Components/Products/Products';
import data from "./data.json";
import { Provider } from 'react-redux';
import store from "./store";

function App() {
  const movies = data.movies;

  const [random, setRandom] = useState(0);
  const [filtering, setFiltering] = useState(false);
  const [moviesResult, setMoviesResult] = useState(movies);
  const [genreTitle, setGenreTitle] = useState('');
  const [price, setPriceResult] = useState(0);
  const [sort, setSortResult] = useState('');
  const [cartItems, setCartItems] = useState(localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems")) : []);

  // Get random movie to display in Here
  useEffect(() => {
    if (movies.length > 0) {
      const randomMovieIndex = Math.floor(Math.random() * (movies.length - 1));
      const randomMovie = movies[randomMovieIndex];
      setRandom(randomMovie.id);
    }  
  }, []);

  const addToCart = (product) => {
    const updatedCart = cartItems;
    let alreadyAddedIndex = -1;
    if (updatedCart.length > 0) {
      updatedCart.map((cartItem, index) => {
        if (cartItem.movie.id === product.id) {
          alreadyAddedIndex = index;
          cartItem.count++;
        }
      });
    }
    if (alreadyAddedIndex === -1) {
      const newItem = {
        movie: product,
        quantity: 1,
      };
      updatedCart.push(newItem);
    } else {
      updatedCart[alreadyAddedIndex].quantity++;
    }
    setCartItems([...updatedCart]);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeFromCart = (cartItem) => {
    const updatedCart = cartItems;
    updatedCart.map((item, index) => {
      if (item === cartItem) {
        if (item.quantity > 1) {
          item.quantity--;
          
        } else {
          updatedCart.splice(index, 1);
        }
      }
    });
    setCartItems([...updatedCart]);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

    let totalQuantity = 0;
    cartItems.map((cartItem) => {
      totalQuantity = totalQuantity + cartItem.quantity
    });

    const createOrder = (order) => {
      alert('Create order for ' + order.name);
    }

  const sortMovies = (event) => { 
    const sort = event.target.value;
    setMoviesResult( moviesResult.slice().sort((a, b) => (
      sort === "lowest" ?
      ((a.price > b.price) ? 1 : -1) : 
      sort === "highest" ?
      ((a.price < b.price) ? 1 : -1) : 
      ((a.id > b.id) ? 1 : -1)
    )));
    setSortResult(event.target.value)
  };

  const filterMovies = (event) => {
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
  };
  
  return (
    <Provider store={store} >
      <>
        <Header 
          price={price}
          sort={sort}
          filterMovies={filterMovies}
          sortMovies={sortMovies}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          totalQuantity={totalQuantity}
          createOrder={createOrder}
          />
        <GridContainer>
          <Hero 
            backgroundImage={movies[random].image} 
            addToCart={addToCart}
            heroMovie={movies[random]}
            />
          <main className="main">
            <div className="content">
              <div className="main">
              <Products 
                movies={moviesResult} 
                filtering={filtering} 
                genreTitle={genreTitle}
                addToCart={addToCart}
                />
              </div>
            </div>
          </main>
          <Footer />
        </GridContainer>
      </>
    </Provider>
  );
}

export default App;
