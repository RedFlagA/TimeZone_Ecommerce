import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routers } from "./router/Router";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Provider } from "react-redux";
import { persistor, store } from "./shared/store";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Fragment>
            <Header />
            <Routers />
            <Footer />
          </Fragment>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
