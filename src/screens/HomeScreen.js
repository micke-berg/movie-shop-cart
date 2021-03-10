import Header from "../Components/Header/Header";
import Hero from '../Components/Hero/Hero';
import Products from "../Components/Products/Products";
import Footer from "../Components/Footer/Footer";

const HomeScreen = (props) =>{
  return (
    <div>
      <Header />
      <Hero />
      <div className="home-wrapper">
          <Products></Products>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
