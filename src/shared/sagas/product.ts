import { call, put, takeEvery } from "redux-saga/effects";
import { callHttpClientMethodSagas } from "./callHttpClientMethodSagas";
import { HttpMethod } from "../../services/api/api.constant";
import { setProductDetail } from "../store/productSlice";

type IdProduct = {
  id: number
}
export function* getSingleProduct(action: IdProduct | any): any{
  try {
    const {id} = action.payload;
    const response = yield call(
      callHttpClientMethodSagas,
      `/products/${id}`,
      HttpMethod.Get,
      null,
    );
    if(response){
      yield put(setProductDetail(response));
    }
  } catch (error) {
  console.log("🚀 ~ file: product.ts:23 ~ function*getSingleProduct ~ error:", error)
  }
}

export default[
  takeEvery("@saga/getSingleProduct", getSingleProduct),
]
