/* eslint-disable import/no-anonymous-default-export */
import { call, put, takeEvery } from "redux-saga/effects";
import { callHttpClientMethodSagas } from "./callHttpClientMethodSagas";
import { HttpMethod } from "../../services/api/api.constant";
import { setNewArrivals } from "../store/homeSlice";

type PageLimit = {
  page: number;
};
export function* getArrivals(action: PageLimit | any): any {
  try {
    const { page } = action.payload;
    const response = yield call(
      callHttpClientMethodSagas,
      `/products?limit=${page}`,
      HttpMethod.Get,
      null
    );
    if (response) {
      yield put(setNewArrivals(response?.products));
    }
  } catch (error) {
    console.log("🚀 ~ file: home.ts:31 ~ function*getArrivals ~ error:", error);
  }
}

export default [takeEvery("@saga/getArrivals", getArrivals)];
