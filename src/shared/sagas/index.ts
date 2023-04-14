import { all } from 'redux-saga/effects';
import home from './home';
import auth from './auth';
import product from './product';
const allSagas = [
  ...home,
  ...auth,
  ...product
]
export default function* rootSaga(){
  try {
    yield all(allSagas);
  } catch (error) {
    console.log("Error in Saga", error);
  }
}
