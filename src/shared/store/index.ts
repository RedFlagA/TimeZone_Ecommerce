import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import homeSlice from "./homeSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import rootSaga from "../sagas";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";


const rootReducer = combineReducers({
  home: homeSlice,
  auth: authSlice,
  product: productSlice
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'product'
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);


sagaMiddleware.run(rootSaga);
