import React, { Fragment, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routers } from "./router/Router";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistor, store } from "./shared/store";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./utils/scrollToTop";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Fragment>
            <ScrollToTop>
              <Header />
              <Routers />
              <Footer />
            </ScrollToTop>
          </Fragment>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
