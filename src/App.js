import Footer from "./Components/Footer/Footer";
import GridContainer from "./Components/GridContainer/GridContainer";
import Header from "./Components/Header/Header";

function App() {
  return (
    <GridContainer>
      <Header />
      <main className="main">
        Product List
      </main>
      <Footer />
    </GridContainer>
  );
}

export default App;
