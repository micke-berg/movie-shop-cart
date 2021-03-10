import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import GridContainer from "./Components/GridContainer/GridContainer";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import store from "./store";
// import data from "./data.json";

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <>
          <GridContainer>
            <main className="main">
              <Route path="/admin" component={AdminScreen} />
              <Route path="/" component={HomeScreen} exact />
            </main>
          </GridContainer>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
