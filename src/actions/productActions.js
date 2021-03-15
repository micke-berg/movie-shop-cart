import { FETCH_PRODUCTS, FETCH_GENRES, FILTER_PRODUCTS_BY_GENRE, ORDER_PRODUCTS_BY_PRICE, FILTER_BY_SEARCH } from '../types';
import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
await axios.get("/movie")
  .then((res) => {
    console.log('fetchProducts:', res.data);
      dispatch({
        type: FETCH_PRODUCTS,
        payload: res.data.data,
      });
    }, (error) => {
    console.log(error);
  })
};

export const fetchGenres = () => async (dispatch) => {
  await axios.get("/genre")
  .then((res) => {
      console.log('fetchGenres:', res.data);
    dispatch({ 
      type: FETCH_GENRES, 
      payload: res.data.data,
    });
  }, (error) => {
    console.log(error);
  })
};

// Works!
export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  console.log('filteredProducts:', filteredProducts);

  if (sort === "") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  console.log('sortedProducts: ', sortedProducts);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};


// TODO get this to work
export const filterProducts = (products, genre) => (dispatch) => {
  console.log('FILTER_PRODUCTS_BY_GENRE: ', genre);
  console.log('FILTER_PRODUCTS_BY_GENRE: ', products);
  // // const genreList = genre.slice();
  // let genre_array = [];
  
  // // genreList.filter(({id}) => products.includes(id))
  // //   .map(({name})  => name);
  // //   console.log(genreList);

  // // genre.forEach(function(element) {
  // //   if (products.includes(element.id)) {
  // //     genre_array.push(element.name)
  // //   }
  // // });
  // alert(genre_array);

  // console.log(genre.filter(g => products.includes(g.id)).map(g => g.name))

  // filter and a map - shorthand
  dispatch({
    type: FILTER_PRODUCTS_BY_GENRE,
    payload: {
      genres: genre,
      items: "hej"
        // genre === ""
        //   ? products
        //   : products.filter((x) => x.movies.indexOf(genre) >= 0),
      // genreTitle: genre === ""
      // ? products
      // : products.filter((x) => x.genres.indexOf(genre) >= 0),
    },
  });
};

// Copy of original
// export const filterProducts = (products, genre) => (dispatch) => {
//   console.log('FILTER_PRODUCTS_BY_GENRE: ', genre);
//   console.log('FILTER_PRODUCTS_BY_GENRE: ', products.movieGenres);

//   dispatch({
//     type: FILTER_PRODUCTS_BY_GENRE,
//     payload: {
//       genres: genre,
//       items:
//         genre === ""
//           ? products
//           : products.filter((x) => x.movieGenres.indexOf(genre) >= 0),
//       // genreTitle: genre === ""
//       // ? products
//       // : products.filter((x) => x.genres.indexOf(genre) >= 0),
//     },
//   });
// };

// const filterGenre = (event) => {
//   console.log(event.target.value);
//   if (event.target.value === "") {
//     setShowProducts(productsResult);
//   } else {
//     const filterProducts = productsResult.filter((product) => {
//       let filterProducts = [];

//       productsResult.map((product) => {
//         product.movieGenre.map((pC) => {
//           if (pC.genreId === parseInt(event.target.value)) {
//             filterProducts.push(product);
//             console.log(filterProducts);
//           }
//         });
//       });
//       setShowProducts(filterProducts);
//     });
//   }
// };

export const filterSearch = (products, searchTerm) => (dispatch) => {
  // const searchTerm = "" 
  // console.log('FILTER_BY_SEARCH: ', searchTerm);

  // const endpoint = searchTerm
  // ? `${SEARCH_BASE_URL}${searchTerm}`
  // : `${API_URL}/products`;
  
  dispatch({
    type: FILTER_BY_SEARCH,
    payload: {
      searchResult: 'search'
      // searchTerm === ""
      //     ? products
      //     : products.filter((x) => x.genres.indexOf(genre) >= 0),
    },
  });
};


